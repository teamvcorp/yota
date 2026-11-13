import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Slashes } from "@/components/Decor";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { btn, heading } from "@/components/ui";
import { faqs, plans, programs } from "@/lib/site";

// Per-page metadata; the root layout's title template turns this into "Programs and pricing | Yotae".
export const metadata: Metadata = {
  title: "Programs and pricing",
  description:
    "Family coaching, parent and child, kids and teens, and one-on-one programs that balance yoga, taekwondo and coaching.",
};

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs", current: true },
  { href: "/programs#pricing", label: "Pricing" },
  { href: "/programs#faq", label: "FAQ" },
];

const label = "font-condensed text-sm font-bold uppercase tracking-[0.16em] text-red";

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader links={nav} />

      <main id="main" className="overflow-x-clip">
        {/* PAGE HEADER */}
        <section className="relative flex flex-col gap-6 px-[6%] pt-16 pb-16">
          <Eyebrow>Programs</Eyebrow>
          <h1 className={`${heading.h1} max-w-[1000px] text-[clamp(56px,8vw,120px)]`}>
            A path for <span className="text-red">every family.</span>
          </h1>
          <p className="max-w-[620px] text-xl text-muted">
            No experience needed. Every program balances yoga, taekwondo and coaching; what
            changes is who is on the mat.
          </p>
          <Slashes size="lg" className="absolute top-16 right-[6%] hidden lg:flex" />
        </section>

        {/* PROGRAM LIST: hard-ruled rows */}
        <section aria-label="Programs" className="px-[6%] pb-24">
          {programs.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-6 gap-6 border-t-4 border-ink py-10 last:border-b-4 lg:grid-cols-[120px_1fr_2fr] lg:items-start"
            >
              <span aria-hidden="true" className="font-condensed text-7xl leading-[0.8] font-extrabold text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-condensed text-4xl leading-none font-extrabold uppercase md:text-5xl">
                {p.name}
              </h2>
              <dl className="grid gap-6 sm:grid-cols-3">
                {[
                  ["Who it's for", p.whoFor],
                  ["Format", p.format],
                  ["You leave with", p.outcome],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className={label}>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </section>

        {/* PRICING: black */}
        <section id="pricing" className="flex scroll-mt-6 flex-col gap-12 bg-ink px-[6%] py-24 text-white">
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-white">Pricing</Eyebrow>
            <h2 className={heading.section}>Membership.</h2>
          </div>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => {
              const featured = plan.featured;
              return (
                <article
                  key={plan.name}
                  className={`flex flex-col gap-5 p-9 ${
                    featured ? "cut-lg bg-red" : "border-2 border-white/40"
                  }`}
                >
                  {plan.badge && (
                    <p className="self-start bg-ink px-3 py-1 font-condensed text-sm font-bold tracking-[0.14em] text-white uppercase">
                      {plan.badge}
                    </p>
                  )}
                  <h3 className={heading.card}>{plan.name}</h3>
                  <p className="border-y-2 border-white/30 py-4">
                    <span className="block font-condensed text-5xl leading-none font-extrabold">
                      {plan.price}
                    </span>
                    <span className={featured ? "text-white/90" : "text-mist"}>{plan.per}</span>
                  </p>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className={`mt-2.5 inline-block h-1.5 w-4 flex-none -skew-x-[30deg] ${featured ? "bg-ink" : "bg-red"}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className={`mt-auto px-5 py-3.5 text-lg ${featured ? btn.light : btn.outlineLight}`}
                  >
                    Start with a free intro
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* FAQ: native <details> works without JavaScript and is keyboard accessible */}
        <section id="faq" className="grid scroll-mt-6 gap-12 px-[6%] py-24 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={heading.section}>Common questions.</h2>
          </div>
          <div className="flex flex-col border-b-4 border-ink">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t-4 border-ink py-6" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-condensed text-2xl font-bold uppercase">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="font-condensed text-4xl leading-none font-extrabold text-red transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 text-lg text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
