"use server";

/*
 * Server Actions: these functions run ONLY on the server. The browser receives an encrypted
 * reference it can POST to, never this code.
 *
 * Every action follows the same safety checklist:
 *   1. Honeypot: a hidden field real people never fill in. Bots usually do.
 *   2. Rate limit per IP address.
 *   3. Validate every field (see lib/validation.ts).
 *   4. Return only a small, safe result object. Never echo raw input or internal errors.
 */

import { headers } from "next/headers";
import { bookingOptions, site } from "@/lib/site";
import { deliver } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";
import {
  checkEmail,
  checkPhone,
  checkText,
  manyOf,
  oneOf,
  text,
  type FieldErrors,
} from "@/lib/validation";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: FieldErrors;
};

const TOO_MANY: FormState = {
  ok: false,
  message: "Too many attempts. Please wait a few minutes and try again.",
};

const DELIVERY_FAILED: FormState = {
  ok: false,
  message: `Sorry, we couldn't send that just now. Please contact us directly at ${site.contact.email}.`,
};

async function clientIp(): Promise<string> {
  // The hosting platform's proxy sets x-forwarded-for; the first entry is the visitor.
  // Only trust this behind a proxy you control (Vercel and most hosts do this correctly).
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Pretend success for bots, so they get no signal to adapt. */
function isBot(formData: FormData) {
  return text(formData, "company") !== "";
}

// ---------------------------------------------------------------------------------------------

export async function requestIntro(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { ok: true, message: "Thanks!" };

  if (!rateLimit(`intro:${await clientIp()}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return TOO_MANY;
  }

  const name = text(formData, "name");
  const email = text(formData, "email").toLowerCase();
  const phone = text(formData, "phone");
  const notes = text(formData, "notes");
  const partySize = oneOf(text(formData, "partySize"), bookingOptions.partySizes);
  const mode = oneOf(text(formData, "mode"), bookingOptions.modes);
  const goals = manyOf(formData, "goals", bookingOptions.goals);
  const times = manyOf(formData, "times", bookingOptions.times);

  const errors: FieldErrors = {
    name: checkText(name, { label: "your name", min: 1, max: 100 }),
    email: checkEmail(email),
    phone: checkPhone(phone),
    partySize: partySize ? undefined : "Please choose who is coming.",
    times: times.length ? undefined : "Please pick at least one time that suits you.",
    mode: mode ? undefined : "Please choose how you'd like to meet.",
    notes: checkText(notes, { label: "your note", max: 1000 }),
  };

  // Strip out the undefined entries so we only send real errors back.
  const realErrors = Object.fromEntries(Object.entries(errors).filter(([, v]) => v));
  if (Object.keys(realErrors).length > 0 || !partySize || !mode) {
    return { ok: false, message: "Please check the highlighted fields.", errors: realErrors };
  }

  const sent = await deliver({
    kind: "intro",
    data: { name, email, phone, partySize, goals, times, mode, notes },
  });
  if (!sent) return DELIVERY_FAILED;

  return { ok: true, message: "You're in." };
}

// ---------------------------------------------------------------------------------------------

export async function joinChallenge(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { ok: true, message: "You're signed up! Day one will arrive in your inbox soon." };

  if (!rateLimit(`challenge:${await clientIp()}`, { limit: 5, windowMs: 10 * 60_000 })) {
    return TOO_MANY;
  }

  const email = text(formData, "email").toLowerCase();
  const emailError = checkEmail(email);
  if (emailError) return { ok: false, message: emailError, errors: { email: emailError } };

  const sent = await deliver({ kind: "challenge", data: { email } });
  if (!sent) return DELIVERY_FAILED;

  return { ok: true, message: "You're signed up! Day one will arrive in your inbox soon." };
}
