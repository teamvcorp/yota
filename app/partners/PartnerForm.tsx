"use client";

/*
 * Partner school inquiry form. It follows the same pattern as the booking form (see app/book/BookingForm.tsx):
 * useActionState plus an onSubmit/startTransition submit, so React 19 doesn't clear the fields if
 * the server returns validation errors. The server re-validates everything (app/actions.ts).
 */

import { startTransition, useActionState } from "react";
import { requestPartnership, type FormState } from "@/app/actions";
import { btn, input } from "@/components/ui";
import { partnerOptions } from "@/lib/site";

const initial: FormState = { ok: false, message: "" };
const labelCls = "font-condensed text-base font-bold tracking-[0.1em] uppercase";

export function PartnerForm() {
  const [state, action, pending] = useActionState(requestPartnership, initial);
  const err = (f: string) => state.errors?.[f];

  if (state.ok) {
    return (
      <div role="status" className="flex flex-col gap-4 border-l-[6px] border-red pl-6">
        <p className="font-condensed text-5xl leading-none font-extrabold uppercase">Request received.</p>
        <p className="text-lg text-muted">{state.message}</p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  // Small helper so every text field gets a label, an error message and aria wiring.
  const field = (
    name: string,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={`p-${name}`} className={labelCls}>
        {label}
      </label>
      <input
        id={`p-${name}`}
        name={name}
        className={input}
        aria-invalid={err(name) ? true : undefined}
        aria-describedby={err(name) ? `p-${name}-err` : undefined}
        {...props}
      />
      {err(name) && (
        <p id={`p-${name}-err`} className="text-[15px] font-semibold text-red">
          {err(name)}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Honeypot (see app/actions.ts) */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        {field("schoolName", "School name", { required: true, maxLength: 120, autoComplete: "organization" })}
        {field("contactName", "Your name", { required: true, maxLength: 100, autoComplete: "name" })}
        {field("email", "Email", { type: "email", required: true, maxLength: 254, autoComplete: "email" })}
        {field("phone", "Phone (optional)", { type: "tel", maxLength: 30, autoComplete: "tel", pattern: "[0-9+\\(\\)\\.\\-\\s]*" })}
        {field("location", "City and state", { required: true, maxLength: 120, autoComplete: "address-level2" })}
        {field("styles", "Styles you teach (optional)", { maxLength: 200, placeholder: "e.g. Taekwondo, BJJ, Karate" })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="p-studentCount" className={labelCls}>
          Current students
        </label>
        <select id="p-studentCount" name="studentCount" required className={input} defaultValue={partnerOptions.studentCounts[0]}>
          {partnerOptions.studentCounts.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${labelCls} mb-2.5`}>When is your space free? Pick any.</legend>
        <div className="flex flex-wrap gap-2.5">
          {partnerOptions.daytime.map((o) => (
            <label
              key={o}
              className="inline-flex min-h-12 cursor-pointer items-center border-2 border-ink px-5 font-condensed text-lg font-bold tracking-[0.04em] uppercase transition-colors select-none hover:bg-paper has-checked:bg-ink has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-red"
            >
              <input type="checkbox" name="daytime" value={o} className="sr-only" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Optional add-on interest (see the Family Coaching section on the page) */}
      <label className="flex cursor-pointer items-start gap-3 border-2 border-ink p-4 has-checked:border-red has-checked:bg-paper">
        <input type="checkbox" name="coaching" value="yes" className="mt-1 size-5 flex-none accent-red" />
        <span>
          <span className="block font-condensed text-lg font-bold uppercase">
            Also interested in Yotae Family Coaching
          </span>
          <span className="text-muted">$500 annual teaching fee + 50% of program testing fees.</span>
        </span>
      </label>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="p-message" className={labelCls}>
          Anything else? (optional)
        </label>
        <textarea id="p-message" name="message" rows={4} maxLength={2000} className={`${input} h-auto resize-y py-3`} />
        {err("message") && <p className="text-[15px] font-semibold text-red">{err("message")}</p>}
      </div>

      {state.message && (
        <p role="alert" className="font-semibold text-red">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={`${btn.primary} ${btn.size.lg} self-start`}>
        {pending ? "Sending…" : "Request a partner call"}
      </button>
    </form>
  );
}
