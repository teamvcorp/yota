# Resend notes (SDK `resend` 6.38.0, installed 2026-11-11)

Sources: https://resend.com/docs/send-with-nextjs, https://resend.com/docs/api-reference/contacts/create-contact,
and the installed types at `node_modules/resend/dist/index.d.mts` (the source of truth for our version).

## Basics
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY); // server only
const { data, error } = await resend.emails.send(
  { from, to, subject, text /* or html / react / template */, replyTo, cc, bcc, tags, scheduledAt },
  { idempotencyKey: "kind/unique-id" },  // 2ND ARG in this SDK version (some docs show it in the payload)
);
// success: { data: { id }, error: null }   failure: { data: null, error: { name, message } }
```
- The SDK **returns** errors and doesn't throw them, so always check `error`. Network failures can still throw, so wrap the call in try/catch too.
- `to` takes up to 50 addresses. `replyTo` is camelCase.
- Idempotency keys must be unique per request, last 24h, and be ≤256 chars. Pattern: `<event>/<id>`.
- Rate limit: 10 req/s per team, then HTTP 429 (`rate_limit_exceeded`).
- `from` must be on a verified domain. `onboarding@resend.dev` only works for testing, and only to your own account email.
- Test recipients: `delivered@resend.dev`, `bounced@resend.dev`, `complained@resend.dev`.

## Contacts
```ts
await resend.contacts.create({ email, firstName, lastName, unsubscribed: false,
  properties: { k: "v" }, segments: [{ id }], topics: [{ id, subscription: "opt_in" }] });
```
- "Segments" replace the old audiences (`audienceId` survives only as a legacy overload).
- The docs don't say what happens when a contact already exists. Our code treats an error message matching /exist/ as OK.
- Needs a **Full access** API key. Sending-only keys can only send email.

## How Yotae uses it (lib/notify.ts)
- Intro request: plain-text email to `CONTACT_TO` with `replyTo` set to the visitor.
- Challenge: create a contact (optionally in `RESEND_SEGMENT_ID`) and send a notice to the coach. Success if either works.
- The 7-day challenge emails themselves: set them up as a Resend Automation or Broadcast in the dashboard (not built in code yet).
