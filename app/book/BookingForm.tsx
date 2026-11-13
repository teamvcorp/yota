"use client";

/*
 * 3-step free-intro form (mockup: SignUp.dc.html).
 *
 * How it works:
 * - ONE <form> holds both steps. The step not in view is `hidden`, but its inputs still
 *   submit, so the server gets everything in a single request.
 * - The "pill" choices are real checkboxes/radios styled with Tailwind's `has-checked:`
 *   variant, so they work with the keyboard and screen readers and need no React state.
 * - We submit through startTransition (not <form action>) because React 19 resets a form
 *   after an action runs. That would wipe the fields if the server returned a validation error.
 * - The server re-validates everything (app/actions.ts). These browser checks are just for convenience.
 */

import { startTransition, useActionState, useRef, useState } from "react";
import Link from "next/link";
import { requestIntro, type FormState } from "@/app/actions";
import { btn, input } from "@/components/ui";
import { bookingOptions, site } from "@/lib/site";

const initial: FormState = { ok: false, message: "" };
const STEP_1_FIELDS = ["name", "email", "phone", "partySize"];
const STEP_LABELS = ["About you", "Pick a time", "Confirmed"];

/** Wrapper: changing `key` remounts the form, which is the cleanest way to "Start over". */
export function BookingForm() {
  const [attempt, setAttempt] = useState(0);
  return <BookingFormInner key={attempt} onRestart={() => setAttempt((n) => n + 1)} />;
}

function BookingFormInner({ onRestart }: { onRestart: () => void }) {
  const [state, action, pending] = useActionState(requestIntro, initial);
  const [step, setStep] = useState<1 | 2>(1);
  const step1Ref = useRef<HTMLFieldSetElement>(null);

  // If the server flags a step-1 field, jump back to step 1. We react to a NEW state object
  // during render (React's recommended pattern, instead of setState inside useEffect).
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (Object.keys(state.errors ?? {}).some((k) => STEP_1_FIELDS.includes(k))) setStep(1);
  }

  const current = state.ok ? 3 : step;
  const err = (field: string) => state.errors?.[field];

  function goNext() {
    // Native browser validation for just the step-1 fields.
    const fields = step1Ref.current?.querySelectorAll<HTMLInputElement>("input, select") ?? [];
    for (const f of fields) if (!f.reportValidity()) return;
    setStep(2);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Progress bar */}
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-2 flex-1 -skew-x-[30deg] transition-colors ${current >= n ? "bg-red" : "bg-line"}`}
            />
          ))}
        </div>
        <p
          aria-live="polite"
          className="font-condensed text-[17px] font-bold tracking-[0.12em] text-muted uppercase"
        >
          Step {current} of 3 · {STEP_LABELS[current - 1]}
        </p>
      </div>

      {state.ok ? (
        <Success onRestart={onRestart} />
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* Honeypot (see app/actions.ts) */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          {/* STEP 1 */}
          <fieldset ref={step1Ref} hidden={step !== 1} className="flex flex-col gap-6">
            <legend className="mb-6 font-condensed text-4xl leading-none font-extrabold uppercase md:text-5xl">
              Tell us about your family
            </legend>
            <div className="flex flex-wrap gap-5">
              <Field id="su-name" label="Your name" error={err("name")}>
                <input id="su-name" name="name" type="text" autoComplete="name" required maxLength={100} className={input} aria-invalid={!!err("name") || undefined} aria-describedby={err("name") ? "su-name-err" : undefined} />
              </Field>
              <Field id="su-email" label="Email" error={err("email")}>
                <input id="su-email" name="email" type="email" autoComplete="email" required maxLength={254} className={input} aria-invalid={!!err("email") || undefined} aria-describedby={err("email") ? "su-email-err" : undefined} />
              </Field>
            </div>
            <div className="flex flex-wrap gap-5">
              <Field id="su-phone" label="Phone (optional)" error={err("phone")}>
                <input id="su-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} pattern="[0-9+\(\)\.\-\s]*" className={input} aria-invalid={!!err("phone") || undefined} aria-describedby={err("phone") ? "su-phone-err" : undefined} />
              </Field>
              <Field id="su-size" label="Who is coming?" error={err("partySize")}>
                <select id="su-size" name="partySize" required className={input} defaultValue={bookingOptions.partySizes[0]}>
                  {bookingOptions.partySizes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
            <PillGroup legend="What would you like to work on? Pick any." name="goals" type="checkbox" options={bookingOptions.goals} />
            <button type="button" onClick={goNext} className={`${btn.primary} ${btn.size.lg} self-start`}>
              Next: pick a time
            </button>
          </fieldset>

          {/* STEP 2 */}
          <fieldset hidden={step !== 2} className="flex flex-col gap-6">
            <legend className="mb-6 font-condensed text-4xl leading-none font-extrabold uppercase md:text-5xl">
              When suits your family?
            </legend>
            <PillGroup legend="Preferred times. Pick any." name="times" type="checkbox" options={bookingOptions.times} error={err("times")} />
            <PillGroup legend="How would you like to meet?" name="mode" type="radio" options={bookingOptions.modes} defaultValue="In person" error={err("mode")} />
            <Field id="su-notes" label="Anything we should know? (optional)" error={err("notes")} full>
              <textarea id="su-notes" name="notes" rows={3} maxLength={1000} className={`${input} h-auto resize-y py-3`} />
            </Field>

            {state.message && !state.ok && (
              <p role="alert" className="font-semibold text-red">
                {state.message}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setStep(1)} className={`${btn.outline} ${btn.size.lg}`}>
                Back
              </button>
              <button type="submit" disabled={pending} className={`${btn.primary} ${btn.size.lg}`}>
                {pending ? "Sending…" : "Request my free intro"}
              </button>
            </div>
            <p className="text-[15px] text-muted">
              We only use your details to arrange your session.{" "}
              <Link href="/privacy" className="underline">
                Privacy policy
              </Link>
            </p>
          </fieldset>
        </form>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------

function Field({
  id,
  label,
  error,
  full,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${full ? "w-full" : "flex-[1_1_240px]"}`}>
      <label htmlFor={id} className="font-condensed text-base font-bold tracking-[0.1em] uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-[15px] font-semibold text-red">
          {error}
        </p>
      )}
    </div>
  );
}

/** A group of pill-shaped checkboxes or radios. */
function PillGroup({
  legend,
  name,
  type,
  options,
  defaultValue,
  error,
}: {
  legend: string;
  name: string;
  type: "checkbox" | "radio";
  options: readonly string[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 font-condensed text-base font-bold tracking-[0.1em] uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label
            key={o}
            className="inline-flex min-h-12 cursor-pointer items-center border-2 border-ink px-5 font-condensed text-lg font-bold tracking-[0.04em] uppercase hover:bg-paper transition-colors select-none has-checked:bg-ink has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-red"
          >
            <input
              type={type}
              name={name}
              value={o}
              defaultChecked={o === defaultValue}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
      {error && <p className="text-[15px] font-semibold text-red">{error}</p>}
    </fieldset>
  );
}

function Success({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col gap-5" role="status">
      <div aria-hidden="true" className="h-3 w-24 -skew-x-[30deg] bg-red" />
      <h2 className="font-condensed text-6xl leading-none font-extrabold uppercase md:text-7xl">You&apos;re in.</h2>
      <p className="text-[19px]">
        Master Robert will email you within {site.responseTime} to confirm a day and time.
      </p>
      <p className="text-muted">
        While you wait, start the free 7-day family challenge: ten minutes a day of breath and
        movement.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/#challenge" className={`${btn.dark} ${btn.size.lg}`}>
          Start the challenge
        </Link>
        <button type="button" onClick={onRestart} className={`${btn.outline} ${btn.size.lg}`}>
          Start over
        </button>
      </div>
    </div>
  );
}
