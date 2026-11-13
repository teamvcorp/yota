"use client";

/*
 * Email sign-up for the free 7-day challenge.
 * useActionState wires the form to the `joinChallenge` Server Action and gives us:
 *   state:   what the action returned last ({ ok, message, errors })
 *   action:  pass this to <form action>
 *   pending: true while the request is in flight (disables the button)
 * The form also works before JavaScript loads (progressive enhancement).
 */

import { startTransition, useActionState } from "react";
import { joinChallenge, type FormState } from "@/app/actions";
import { btn } from "./ui";

const initial: FormState = { ok: false, message: "" };

export function ChallengeForm() {
  const [state, action, pending] = useActionState(joinChallenge, initial);

  if (state.ok) {
    return (
      <p role="status" className="flex-[1_1_340px] border-l-[6px] border-red pl-4 font-condensed text-2xl font-bold uppercase">
        {state.message}
      </p>
    );
  }

  return (
    <form
      // Without JS the browser posts to `action`. With JS, onSubmit takes over so React's
      // automatic form reset doesn't clear the email after an error.
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      className="m-0 flex min-w-0 flex-[1_1_340px] flex-wrap items-end gap-3">
      <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1.5">
        <label htmlFor="challenge-email" className="font-condensed text-base font-bold tracking-[0.1em] uppercase">
          Email address
        </label>
        <input
          id="challenge-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby="challenge-msg"
          className="h-[54px] border-2 border-white bg-white px-4 text-[17px] text-ink focus:border-red aria-[invalid=true]:border-red"
        />
      </div>
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button type="submit" disabled={pending} className={`${btn.primaryOnDark} h-[54px] px-7 text-lg`}>
        {pending ? "Sending…" : "Send me day one"}
      </button>
      <p id="challenge-msg" aria-live="polite" className="w-full text-[15px] font-semibold empty:hidden">
        {state.message}
      </p>
    </form>
  );
}
