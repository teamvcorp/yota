import "server-only";
import { createHash } from "node:crypto";
import { Resend } from "resend";

/*
 * Delivers form submissions using Resend (https://resend.com). Notes: docs/notes/resend-notes.md
 *
 * Environment variables (put them in .env.local and in your host's settings; see .env.example):
 *   RESEND_API_KEY     secret API key. SERVER ONLY, so never prefix it with NEXT_PUBLIC_.
 *   RESEND_FROM        sender on your VERIFIED domain, e.g. "Yotae <hello@yotae.com>"
 *   CONTACT_TO         the coach's inbox that receives the notifications
 *   RESEND_SEGMENT_ID  (optional) Resend segment the 7-day-challenge subscribers are added to
 *
 * Security choices:
 *   - Emails are PLAIN TEXT, so visitor input can never inject HTML or links into the coach's inbox.
 *   - The visitor's address goes in `replyTo` only. We never send FROM a visitor-supplied address
 *     (that would be spoofing, and unverified senders get rejected anyway).
 *   - An idempotency key (a hash of the submission) makes Resend drop exact duplicates for
 *     24h, so a double-click or a network retry doesn't send two emails.
 *   - Logs record only the error NAME, never personal data.
 *
 * Without RESEND_API_KEY:
 *   - development: submissions print to the terminal, so you can test the forms with no account.
 *   - production: returns false, and the visitor sees a "contact us directly" message.
 */

export type IntroRequest = {
  name: string;
  email: string;
  phone: string;
  partySize: string;
  goals: string[];
  times: string[];
  mode: string;
  notes: string;
};

export type ChallengeSignup = { email: string };

export type PartnerInquiry = {
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  styles: string;
  studentCount: string;
  daytime: string[];
  coaching: boolean; // interested in the Family Coaching add-on
  message: string;
};

type Submission =
  | { kind: "intro"; data: IntroRequest }
  | { kind: "challenge"; data: ChallengeSignup }
  | { kind: "partner"; data: PartnerInquiry };

type Config = { resend: Resend; from: string; to: string; segmentId?: string };

function config(): Config | null {
  const { RESEND_API_KEY, RESEND_FROM, CONTACT_TO, RESEND_SEGMENT_ID } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !CONTACT_TO) return null;
  return {
    resend: new Resend(RESEND_API_KEY),
    from: RESEND_FROM,
    to: CONTACT_TO,
    segmentId: RESEND_SEGMENT_ID || undefined,
  };
}

/** Same submission produces the same key, which lets Resend de-duplicate it. Max 256 chars. */
function idempotencyKey(submission: Submission): string {
  const hash = createHash("sha256").update(JSON.stringify(submission)).digest("hex");
  return `${submission.kind}/${hash}`;
}

/** Collapse whitespace and newlines so visitor text is safe inside a one-line subject. */
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

export async function deliver(submission: Submission): Promise<boolean> {
  const cfg = config();

  if (!cfg) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[yotae] (no Resend config) new ${submission.kind} submission`, submission.data);
      return true;
    }
    console.error("[yotae] Resend is not configured; set RESEND_API_KEY, RESEND_FROM, CONTACT_TO");
    return false;
  }

  try {
    const key = idempotencyKey(submission);
    // `switch` on the discriminant: TypeScript narrows `submission.data` to the right type in each case.
    switch (submission.kind) {
      case "intro":
        return await sendIntro(cfg, submission.data, key);
      case "challenge":
        return await addChallengeSignup(cfg, submission.data, key);
      case "partner":
        return await sendPartner(cfg, submission.data, key);
    }
  } catch (err) {
    // The SDK returns errors rather than throwing, but network failures can still throw.
    console.error("[yotae] delivery threw:", err instanceof Error ? err.name : "unknown");
    return false;
  }
}

// ---------------------------------------------------------------------------------------------

async function sendIntro(cfg: Config, d: IntroRequest, key: string): Promise<boolean> {
  const body = [
    "New free intro request from the website.",
    "",
    `Name:        ${d.name}`,
    `Email:       ${d.email}`,
    `Phone:       ${d.phone || "(not given)"}`,
    `Who:         ${d.partySize}`,
    `Goals:       ${d.goals.join(", ") || "(none picked)"}`,
    `Times:       ${d.times.join(", ")}`,
    `Meet:        ${d.mode}`,
    "",
    "Notes:",
    d.notes || "(none)",
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

  const { error } = await cfg.resend.emails.send(
    {
      from: cfg.from,
      to: cfg.to,
      replyTo: d.email,
      subject: `Free intro request: ${oneLine(d.name)}`,
      text: body,
    },
    { idempotencyKey: key },
  );

  if (error) {
    console.error("[yotae] intro email failed:", error.name);
    return false;
  }
  return true;
}

/*
 * Challenge sign-up does two independent things:
 *   1. Save the address as a Resend contact (optionally in a segment), so you can send the
 *      7-day challenge as a Broadcast or Automation from the Resend dashboard.
 *   2. Email the coach a short heads-up.
 * We report success if EITHER worked, so one hiccup doesn't lose the sign-up.
 */
async function addChallengeSignup(cfg: Config, d: ChallengeSignup, key: string): Promise<boolean> {
  const contact = await cfg.resend.contacts.create({
    email: d.email,
    unsubscribed: false,
    ...(cfg.segmentId ? { segments: [{ id: cfg.segmentId }] } : {}),
  });
  // A contact that already exists isn't a real failure; they're on the list.
  const contactOk = !contact.error || /exist/i.test(contact.error.message);
  if (contact.error && !contactOk) console.error("[yotae] contact create failed:", contact.error.name);

  const notice = await cfg.resend.emails.send(
    {
      from: cfg.from,
      to: cfg.to,
      subject: "New 7-day challenge sign-up",
      text: `${d.email} signed up for the free 7-day family challenge on the website.`,
    },
    { idempotencyKey: key },
  );
  if (notice.error) console.error("[yotae] challenge notice failed:", notice.error.name);

  return contactOk || !notice.error;
}

// ---------------------------------------------------------------------------------------------

/** Partner-school inquiry: plain-text email to the coach, with reply-to set to the school owner. */
async function sendPartner(cfg: Config, d: PartnerInquiry, key: string): Promise<boolean> {
  const body = [
    "New PARTNER SCHOOL inquiry (Yotae Leaders) from the website.",
    "",
    `School:      ${d.schoolName}`,
    `Contact:     ${d.contactName}`,
    `Email:       ${d.email}`,
    `Phone:       ${d.phone || "(not given)"}`,
    `Location:    ${d.location}`,
    `Styles:      ${d.styles || "(not given)"}`,
    `Students:    ${d.studentCount}`,
    `Daytime:     ${d.daytime.join(", ") || "(none picked)"}`,
    `Family Coaching add-on: ${d.coaching ? "YES, interested" : "no"}`,
    "",
    "Message:",
    d.message || "(none)",
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

  const { error } = await cfg.resend.emails.send(
    {
      from: cfg.from,
      to: cfg.to,
      replyTo: d.email,
      subject: `Partner school inquiry${d.coaching ? " (+ Family Coaching)" : ""}: ${oneLine(d.schoolName)}`,
      text: body,
    },
    { idempotencyKey: key },
  );

  if (error) {
    console.error("[yotae] partner email failed:", error.name);
    return false;
  }
  return true;
}
