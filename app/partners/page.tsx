import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Slashes, Sprig } from "@/components/Decor";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { btn, heading, zen } from "@/components/ui";
import { coachingLicense, partner, vaSchool } from "@/lib/site";

// Money formatting: Intl gives correct "$1,234" output without hand-rolled string maths.
const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// Family Coaching add-on maths, derived from the terms in lib/site.ts (single source of truth).
const L = coachingLicense;
const testingPerStudent = L.testCount * L.testFee; // $600 over the whole program (tests are taken when ready, not yearly)
const yotaePerStudent = testingPerStudent * L.yotaeShare; // $300
const schoolPerStudent = testingPerStudent - yotaePerStudent; // $300
const EXAMPLE_STUDENTS = 20;
import { PartnerForm } from "./PartnerForm";

/*
 * Partner page for EXISTING MARTIAL ARTS SCHOOLS (2026-11-12).
 * Pitch: host "Yotae Leaders" in your idle daytime hours. You teach martial arts as you always do,
 * Yotae adds behavior lessons, and students do academics online through The VA School.
 *
 * Style: the sharp/martial system, since the audience is martial arts school owners.
 * Copy rule: claims about The VA School come ONLY from docs/notes/vaschool-notes.md
 * (app.vaschool.org). Anything unverified stays a [PLACEHOLDER] in lib/site.ts.
 */

export const metadata: Metadata = {
  title: "For martial arts schools",
  description:
    "Fill your idle daytime hours. Host Yotae Leaders: your martial arts instruction, our behavior lessons, and online academics through The VA School.",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/partners", label: "For Schools", current: true },
];

// Colour key for the sample-day timeline.
const kindStyle: Record<string, { bar: string; label: string }> = {
  academic: { bar: "bg-ink", label: "Academics" },
  martial: { bar: "bg-red", label: "Martial arts" },
  behavior: { bar: "bg-zen-clay", label: "Behavior lesson" },
  core: { bar: "bg-line", label: "Routine" },
};

export default function PartnersPage() {
  return (
    <>
      <SiteHeader links={nav} showCta={false} />

      <main id="main" className="overflow-x-clip">
        {/* HERO */}
        <section className="relative flex flex-col gap-7 bg-ink px-[6%] pt-20 pb-24 text-white">
          <Eyebrow className="text-white">For martial arts schools · {partner.programName}</Eyebrow>
          <h1 className={`${heading.h1} max-w-[1100px] text-[clamp(52px,7.6vw,116px)]`}>
            Empty mats by day.
            <span className="block text-red">Future leaders on them.</span>
          </h1>
          <p className="max-w-[640px] text-xl text-mist">
            Host {partner.programName} during your school&apos;s idle daytime hours. You teach martial
            arts the way you always have, Yotae adds behavior lessons, and students complete
            advanced academics online through {vaSchool.name}.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#inquire" className={`${btn.primaryOnDark} ${btn.size.lg}`}>
              Become a partner school
            </Link>
            <Link href="#day" className={`${btn.outlineLight} ${btn.size.lg}`}>
              See a sample day
            </Link>
          </div>
          <Slashes size="lg" className="absolute right-[6%] bottom-24 hidden lg:flex" />
        </section>

        {/* DAY vs EVENING split: shows exactly which hours we fill */}
        <section className="grid lg:grid-cols-2" aria-label="Daytime and evening at your school">
          <div className="flex flex-col gap-5 border-b-4 border-ink bg-white px-[6%] py-16 lg:border-r-4 lg:border-b-0 lg:pl-[8%]">
            <p className="font-condensed text-lg font-bold tracking-[0.14em] text-red uppercase">
              Daytime · new
            </p>
            <h2 className={heading.section}>{partner.programName}</h2>
            <ul className="flex flex-col gap-3 text-lg">
              {[
                `Academics online through ${vaSchool.name}`,
                "Martial arts, taught by your instructors",
                "Behavior lessons: self-regulation, character, leadership",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-5 flex-none -skew-x-[30deg] bg-red" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 bg-paper px-[6%] py-16 lg:pr-[8%]">
            <p className="font-condensed text-lg font-bold tracking-[0.14em] text-muted uppercase">
              Evening · unchanged
            </p>
            <h2 className={heading.section}>Your classes</h2>
            <ul className="flex flex-col gap-3 text-lg">
              {[
                "Your regular schedule and curriculum",
                "Your style, your rank system, your culture",
                "Plus daytime families who already know your school",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 inline-block h-1.5 w-5 flex-none -skew-x-[30deg] bg-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FEE SPLIT: the core business promise, stated plainly */}
        <section aria-label="Who keeps which fees" className="grid border-y-4 border-ink md:grid-cols-2">
          <div className="flex flex-col gap-2 bg-red px-[6%] py-12 text-white md:pl-[8%]">
            <p className="font-condensed text-lg font-bold tracking-[0.14em] uppercase">Martial arts fees</p>
            <p className="font-condensed text-7xl leading-none font-extrabold uppercase md:text-8xl">100% yours</p>
            <p className="text-lg text-white/90">
              You set your price for your art. Yotae takes no cut.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-ink px-[6%] py-12 text-white md:pr-[8%]">
            <p className="font-condensed text-lg font-bold tracking-[0.14em] uppercase">Academic fees</p>
            <p className="font-condensed text-5xl leading-none font-extrabold uppercase md:text-6xl">Paid to The VA School</p>
            <p className="text-lg text-mist">
              Families pay for academics through{" "}
              <a href={vaSchool.url} target="_blank" rel="noopener noreferrer" className="text-white underline">
                app.vaschool.org
              </a>
              . Nothing for you to collect or manage.
            </p>
          </div>
        </section>

        {/* WHO DOES WHAT */}
        <section className="flex flex-col gap-12 px-[6%] py-24">
          <div className="flex flex-col gap-4">
            <Eyebrow>How it works</Eyebrow>
            <h2 className={heading.section}>Three partners. One day.</h2>
          </div>
          <div className="grid border-4 border-ink lg:grid-cols-3">
            {partner.roles.map((r, i) => {
              const panel = ["bg-white text-ink", "bg-red text-white", "bg-ink text-white"][i];
              return (
                <article
                  key={r.who}
                  className={`flex flex-col gap-5 p-9 ${panel} ${i > 0 ? "border-t-4 border-ink lg:border-t-0 lg:border-l-4" : ""}`}
                >
                  <span aria-hidden="true" className="font-condensed text-5xl leading-none font-extrabold opacity-30">
                    0{i + 1}
                  </span>
                  <h3 className={heading.card}>{r.who}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {r.gives.map((g) => (
                      <li key={g} className="border-t border-current/25 pt-2.5">
                        {g}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="text-muted">
            Learn about {vaSchool.name}:{" "}
            <a href={vaSchool.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline">
              app.vaschool.org
            </a>{" "}
            (&ldquo;{vaSchool.tagline}&rdquo;)
          </p>
        </section>

        {/* SAMPLE DAY TIMELINE */}
        <section id="day" className="scroll-mt-6 bg-ink px-[6%] py-24 text-white">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Eyebrow className="text-white">A sample day</Eyebrow>
              <h2 className={heading.section}>Mats busy by 9am.</h2>
            </div>
            {/* Colour key */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-condensed text-sm font-bold tracking-[0.12em] uppercase">
              {Object.values(kindStyle).map((k) => (
                <li key={k.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className={`inline-block size-3 ${k.bar}`} />
                  {k.label}
                </li>
              ))}
            </ul>
          </div>
          <ol className="flex flex-col">
            {partner.sampleDay.map((s) => {
              const k = kindStyle[s.kind];
              return (
                <li
                  key={s.time + s.block}
                  className="grid grid-cols-[84px_8px_1fr] items-center gap-5 border-t-2 border-white/15 py-4 md:grid-cols-[120px_10px_1fr]"
                >
                  <span className="font-condensed text-2xl font-extrabold">{s.time}</span>
                  {/* the ink-coloured academics bar needs an outline to show on black */}
                  <span aria-hidden="true" className={`h-full min-h-10 ${k.bar} ${s.kind === "academic" ? "outline-2 outline-white/60" : ""}`} />
                  <span className="text-lg">
                    {s.block}
                    <span className="sr-only"> ({k.label})</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-mist">Sample only. Times adapt to each partner school.</p>
        </section>

        {/* BENEFITS */}
        <section className="flex flex-col gap-12 px-[6%] py-24">
          <div className="flex flex-col gap-4">
            <Eyebrow>Why partner</Eyebrow>
            <h2 className={heading.section}>
              Good for your school. <span className="text-red">Better for your town.</span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {partner.benefits.map((b, i) => (
              <article key={b.title} className="flex flex-col gap-3 border-4 border-ink p-8">
                <span aria-hidden="true" className="font-condensed text-lg font-bold text-red">
                  0{i + 1}
                </span>
                <h3 className={heading.card}>{b.title}</h3>
                <p className="text-muted">{b.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* OPTIONAL ADD-ON: Yotae Family Coaching license.
            Styled like the home page's coaching "bridge": soft (yoga) on the left, sharp on the right. */}
        <section id="family-coaching" className="grid scroll-mt-6 border-y-4 border-ink lg:grid-cols-2">
          <div className="relative flex flex-col gap-6 bg-zen-cream px-[6%] py-20 text-zen-ink lg:pl-[8%]">
            <p className={zen.eyebrow}>Optional add-on</p>
            <h2 className={zen.section}>
              Add Yotae <span className="text-zen-olive italic">Family Coaching</span>
            </h2>
            <p className="max-w-[520px] text-lg text-zen-muted">
              Want to offer families more than classes? Run the Yotae Family Coaching program at
              your school. We provide the program; you teach it. Set your own tuition for it and
              keep 100% of it.
            </p>
            <ul className="flex flex-col gap-3">
              {L.includes.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-[22px] border border-zen-line bg-zen-paper px-5 py-4 font-serif text-lg"
                >
                  <span aria-hidden="true" className="size-5 flex-none rounded-full border-[3px] border-zen-moss" />
                  {i}
                </li>
              ))}
            </ul>
            <Sprig className="absolute right-8 bottom-8 hidden h-[70px] w-10 md:block" />
          </div>

          <div className="flex flex-col gap-8 bg-ink px-[6%] py-20 text-white lg:pr-[8%]">
            <Eyebrow className="text-white">The terms</Eyebrow>
            <dl className="grid gap-px bg-white/20 sm:grid-cols-3">
              {[
                [usd(L.annualFee), "Annual teaching fee"],
                [`${L.testCount} × ${usd(L.testFee)}`, "Tests per student, taken when ready"],
                [`${L.yotaeShare * 100}%`, "Of program testing fees to Yotae"],
              ].map(([v, k]) => (
                <div key={k} className="flex flex-col-reverse gap-1 bg-ink p-5">
                  <dt className="font-condensed text-sm font-bold tracking-[0.12em] text-mist uppercase">{k}</dt>
                  <dd className="font-condensed text-4xl font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Worked example: a real table, so screen readers get proper row/column headers */}
            <div className="flex flex-col gap-3">
              <h3 className={heading.card}>The maths, all 4 tests</h3>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Family Coaching testing fees split, per student across all {L.testCount} tests</caption>
                <thead>
                  <tr className="border-b-2 border-white/40 font-condensed text-sm tracking-[0.12em] text-mist uppercase">
                    <th scope="col" className="py-2 pr-3 font-bold">Testing fees</th>
                    <th scope="col" className="py-2 pr-3 font-bold">Per student</th>
                    <th scope="col" className="py-2 font-bold">{EXAMPLE_STUDENTS} students</th>
                  </tr>
                </thead>
                <tbody className="font-condensed text-xl font-bold">
                  <tr className="border-b border-white/15">
                    <th scope="row" className="py-3 pr-3 font-bold">Total collected</th>
                    <td className="py-3 pr-3">{usd(testingPerStudent)}</td>
                    <td className="py-3">{usd(testingPerStudent * EXAMPLE_STUDENTS)}</td>
                  </tr>
                  <tr className="border-b border-white/15 text-red-bright">
                    <th scope="row" className="py-3 pr-3 font-bold">Your school keeps</th>
                    <td className="py-3 pr-3">{usd(schoolPerStudent)}</td>
                    <td className="py-3">{usd(schoolPerStudent * EXAMPLE_STUDENTS)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-3 font-bold">Yotae</th>
                    <td className="py-3 pr-3">{usd(yotaePerStudent)}</td>
                    <td className="py-3">{usd(yotaePerStudent * EXAMPLE_STUDENTS)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-mist">
                Students test whenever they&apos;re ready, so timing varies. Plus the{" "}
                {usd(L.annualFee)} annual teaching fee. The split applies to Family Coaching tests
                only. Your program tuition, martial arts fees and martial arts testing stay 100% yours.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="grid gap-12 bg-paper px-[6%] py-24 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={heading.section}>School owner questions.</h2>
          </div>
          <div className="flex flex-col border-b-4 border-ink">
            {partner.faqs.map((f) => (
              <details key={f.q} className="group border-t-4 border-ink py-6" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-condensed text-2xl font-bold uppercase">{f.q}</h3>
                  <span aria-hidden="true" className="font-condensed text-4xl leading-none font-extrabold text-red transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-lg text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* INQUIRY */}
        <section id="inquire" className="grid scroll-mt-6 px-[6%] py-24 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-6 bg-red px-8 py-14 text-white md:px-11">
            <Eyebrow className="text-white" bar="bg-ink">
              Partner with us
            </Eyebrow>
            <h2 className={heading.section}>Let&apos;s fill your daytime.</h2>
            <p className="text-lg text-white/90">
              Tell us about your school. We&apos;ll set up a call to walk through the program and your
              daytime schedule. You keep 100% of your martial arts fees. No commitment.
            </p>
            <Slashes size="lg" color="bg-ink" className="mt-auto pt-6" />
          </div>
          <div className="border-4 border-ink bg-white px-6 py-14 md:px-12 lg:border-l-0">
            <PartnerForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
