import Image from "next/image";
import Link from "next/link";
import { ChallengeForm } from "@/components/ChallengeForm";
import { Eyebrow, PhotoPlaceholder, Slashes, Sprig, Stones } from "@/components/Decor";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { btn, heading, zen } from "@/components/ui";
import { coachBio, coachStats, disciplines, programs, site, testimonial } from "@/lib/site";

/*
 * Home page: SPLIT DESIGN experiment (2026-11-12).
 *
 * The idea: Yotae literally has two halves.
 *   LEFT  / yoga      → soft "zen" style: cream, Fraunces serif, arches, leaves, rounded pills
 *   RIGHT / taekwondo → sharp style: black + red, condensed caps, cut corners, slashes
 * Where they meet (the band and the coaching card), the two styles mix.
 * Sections after that (steps, programs, coach, challenge) use the sharp style for now.
 *
 * Layout lesson: `grid lg:grid-cols-2` stacks the halves on phones (yoga first) and puts them
 * side by side from 1024px up. The logo medallion sits in normal flow between them on
 * phones, and is absolutely centred on the seam on desktop (`lg:absolute`).
 */

const nav = [
  { href: "/#method", label: "The Method" },
  { href: "/programs", label: "Programs" },
  { href: "/#about", label: "Master Robert" },
  { href: "/#challenge", label: "Free Challenge" },
  { href: "/partners", label: "For Schools" },
];

const steps = [
  {
    title: "Book a free intro",
    body: "Meet Master Robert, try a short session together and talk through what your family wants to change.",
  },
  {
    title: "Get your family plan",
    body: "A program matched to your ages, schedule and goals, with clear milestones for everyone.",
  },
  {
    title: "Train and grow together",
    body: "Weekly sessions, coaching check-ins and progress you can see at home, not only in class.",
  },
];

const { yoga, taekwondo, coaching } = disciplines;

export default function Home() {
  return (
    <>
      <SiteHeader links={nav} />

      <main id="main" className="overflow-x-clip">
        {/* The page's single h1, for screen readers and search engines. The two halves below
            carry the visual headlines as h2s. */}
        <h1 className="sr-only">Yotae: yoga and taekwondo family life coaching</h1>

        {/* ============================ SPLIT HERO ============================ */}
        <section className="relative grid lg:grid-cols-2">
          {/* ---- YOGA HALF (soft) ---- */}
          <div className="relative flex flex-col gap-6 overflow-hidden bg-zen-cream px-[6%] pt-16 pb-20 text-zen-ink lg:pr-20 lg:pl-[8%]">
            <p className={zen.eyebrow}>{yoga.label}</p>
            <h2 className={`${zen.h1} text-[clamp(48px,5.6vw,84px)]`}>
              {yoga.headline[0]}
              <span className="block text-zen-olive italic">{yoga.headline[1]}</span>
            </h2>
            <p className="max-w-[460px] text-lg text-zen-muted">{yoga.body}</p>
            <div>
              <Link href="/programs" className={`${zen.btn} ${zen.size.lg}`}>
                Explore yoga
              </Link>
            </div>
            {/* Arch-shaped "garden gate" photo frame */}
            <div className="relative mt-4 w-[78%] max-w-[380px] self-center rounded-t-full rounded-b-[30px] border-[1.5px] border-zen-moss p-2.5">
              <PhotoPlaceholder
                label="a parent and child in a calm yoga pose in a garden, dappled light"
                className="h-[300px] rounded-t-full rounded-b-[22px] bg-[#D9CDB8] text-[#3D352B] md:h-[360px]"
              />
              <Sprig size="lg" className="absolute -right-8 -bottom-2 h-[300px] w-[76px]" />
              <Sprig size="lg" flip color="#7D8F63" className="absolute -bottom-2 -left-7 h-48 w-12" />
            </div>
            <p className="font-serif text-lg text-zen-olive italic">{yoga.tagline}</p>
          </div>

          {/* ---- SEAM MEDALLION ---- */}
          <div className="relative z-10 -my-14 flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:my-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <div
              className="flex size-28 items-center justify-center rounded-full border-4 border-ink bg-white shadow-[0_0_0_8px_var(--color-red)] md:size-36"
              title="Yoga + Taekwondo"
            >
              <Image
                src="/yota-logo.png"
                alt=""
                width={96}
                height={96}
                className="size-20 object-contain mix-blend-multiply md:size-24"
              />
            </div>
          </div>

          {/* ---- TAEKWONDO HALF (sharp) ---- */}
          <div className="relative flex flex-col gap-6 overflow-hidden bg-ink px-[6%] pt-20 pb-20 text-white lg:pt-16 lg:pr-[8%] lg:pl-20">
            <Eyebrow className="text-white">{taekwondo.label}</Eyebrow>
            <h2 className={`${heading.h1} text-[clamp(56px,6.6vw,104px)]`}>
              {taekwondo.headline[0]}
              <span className="block text-red">{taekwondo.headline[1]}</span>
            </h2>
            <p className="max-w-[460px] text-lg text-mist">{taekwondo.body}</p>
            <div>
              <Link href="/programs" className={`${btn.primaryOnDark} ${btn.size.lg}`}>
                Explore taekwondo
              </Link>
            </div>
            {/* Cut-corner photo with a hard red offset block */}
            <div className="relative mt-4 w-[78%] max-w-[380px] self-center">
              <div aria-hidden="true" className="cut-lg absolute inset-0 translate-x-3.5 translate-y-3.5 bg-red" />
              <PhotoPlaceholder
                label="a parent and child mid-kick in a dojo, high-contrast black-and-white"
                className="cut-lg relative h-[300px] bg-[#2a2a2a] text-mist md:h-[360px]"
              />
              <Slashes size="lg" color="bg-white" className="absolute -bottom-6 -left-8" />
            </div>
            <p className="font-condensed text-lg font-bold tracking-[0.12em] text-red-bright uppercase">
              {taekwondo.tagline}
            </p>
          </div>
        </section>

        {/* ===================== WHERE THEY MEET (blended band) ===================== */}
        <section className="flex flex-col items-center gap-7 border-y-4 border-ink bg-white px-[6%] py-20 text-center">
          <div className="flex items-end gap-6" aria-hidden="true">
            <Stones />
            <span className="font-condensed text-5xl leading-none font-extrabold text-red">+</span>
            <Slashes />
          </div>
          {/* Both type voices in one headline: the visual thesis of the split design. */}
          <h2 className="max-w-[1000px] leading-[0.95]">
            <span className="block font-serif text-[clamp(44px,6vw,84px)] font-medium text-zen-ink italic">
              Stronger together.
            </span>
            <span className="block font-condensed text-[clamp(48px,7vw,104px)] font-extrabold uppercase">
              On and off <span className="text-red">the mat.</span>
            </span>
          </h2>
          <p className="max-w-[620px] text-lg text-muted">{site.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className={`${btn.primary} ${btn.size.lg}`}>
              Book a free intro session
            </Link>
            <Link href="/programs" className={`${zen.btnOutline} ${zen.size.lg}`}>
              See programs
            </Link>
          </div>
        </section>

        {/* ====================== THE METHOD: two halves + bridge ====================== */}
        <section id="method" className="scroll-mt-6">
          <div className="grid lg:grid-cols-2">
            {/* Yoga panel */}
            <div className="relative flex flex-col gap-6 bg-zen-sand px-[6%] pt-20 pb-36 text-zen-ink lg:pl-[8%]">
              <p className={zen.eyebrow}>The soft side</p>
              <h2 className={zen.section}>Yoga for calm</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {yoga.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-[22px] border border-zen-line bg-zen-paper px-5 py-4 font-serif text-xl"
                  >
                    <span aria-hidden="true" className="size-5 flex-none rounded-full border-[3px] border-zen-moss" />
                    {p}
                  </li>
                ))}
              </ul>
              <Sprig className="absolute right-8 bottom-28 hidden h-[70px] w-10 md:block" />
            </div>

            {/* Taekwondo panel */}
            <div className="relative flex flex-col gap-6 bg-red px-[6%] pt-20 pb-36 text-white lg:pr-[8%]">
              <Eyebrow className="text-white" bar="bg-ink">
                The strong side
              </Eyebrow>
              <h2 className={heading.section}>Taekwondo for confidence</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {taekwondo.points.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-2 border-white px-5 py-4 font-condensed text-xl font-bold uppercase"
                  >
                    <span aria-hidden="true" className="font-extrabold text-ink">
                      0{i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coaching bridge: half-soft, half-sharp card straddling the seam.
              Rounded on the yoga (left) side, square on the taekwondo (right) side. */}
          <div className="relative z-10 -mt-24 px-[6%] pb-24">
            <article className="mx-auto flex max-w-[900px] flex-col items-center gap-4 rounded-l-[40px] border-4 border-ink bg-white px-8 py-10 text-center shadow-[12px_12px_0_0_var(--color-ink)] md:px-14">
              <div aria-hidden="true" className="relative size-14">
                <div className="absolute top-0 left-0 size-9 rounded-full border-[4px] border-zen-moss" />
                <div className="absolute right-0 bottom-0 size-9 bg-red [clip-path:polygon(0_0,100%_0,100%_70%,70%_100%,0_100%)]" />
              </div>
              <h2 className="leading-none">
                {/* pr-3: the italic's slant visually swallows a normal space */}
                <span className="pr-3 font-serif text-4xl font-medium italic md:text-5xl">Coaching</span>{" "}
                <span className="font-condensed text-4xl font-extrabold uppercase md:text-5xl">
                  connects <span className="text-red">them.</span>
                </span>
              </h2>
              <p className="max-w-[600px] text-lg text-muted">{coaching.body}</p>
            </article>
          </div>
        </section>

        {/* ===================== SHARED SECTIONS (sharp style) ===================== */}

        {/* HOW IT WORKS */}
        <section className="bg-ink px-[6%] py-24 text-white">
          <div className="mb-14 flex flex-col gap-4">
            <Eyebrow className="text-white">How it works</Eyebrow>
            <h2 className={heading.section}>Three steps in.</h2>
          </div>
          <ol className="grid gap-12 md:grid-cols-3 md:gap-0">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`flex flex-col gap-4 md:px-8 ${i > 0 ? "md:border-l-2 md:border-white/25" : "md:pl-0"}`}
              >
                <span
                  aria-hidden="true"
                  className="font-condensed text-[120px] leading-[0.8] font-extrabold text-transparent [-webkit-text-stroke:2px_var(--color-red-bright)]"
                >
                  {i + 1}
                </span>
                <h3 className={heading.card}>{s.title}</h3>
                <p className="text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PROGRAMS PREVIEW */}
        <section className="flex flex-col gap-10 px-[6%] py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-4">
              <Eyebrow>Programs</Eyebrow>
              <h2 className={heading.section}>Find your path.</h2>
            </div>
            <Link href="/programs" className={`${btn.outline} ${btn.size.md}`}>
              Compare all programs →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <Link
                key={p.slug}
                href={`/programs#${p.slug}`}
                className={`group flex min-h-[220px] flex-col justify-between gap-6 border-4 border-ink p-7 no-underline transition-colors ${
                  i === 0
                    ? "bg-ink text-white hover:bg-red"
                    : "bg-white text-ink hover:bg-ink hover:text-white"
                }`}
              >
                <span className="font-condensed text-lg font-bold opacity-60">0{i + 1}</span>
                <span className="flex flex-col gap-2">
                  <span className={heading.card}>{p.name}</span>
                  <span className="opacity-80">{p.teaser}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-condensed text-3xl font-extrabold transition-transform group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="flex scroll-mt-6 flex-wrap items-center gap-16 bg-red px-[6%] py-24 text-white"
        >
          <div className="relative min-w-0 flex-[0_1_400px]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 bg-ink" />
            <PhotoPlaceholder
              label={`${site.coach}, in uniform, arms folded`}
              className="relative aspect-[4/5] bg-[#2a2a2a] text-mist"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
            <Eyebrow className="text-white" bar="bg-ink">
              Meet your coach
            </Eyebrow>
            <h2 className={heading.section}>{site.coach}</h2>
            <p className="max-w-[560px] text-lg text-white/90">{coachBio}</p>
            <dl className="grid grid-cols-1 border-t-2 border-white/40 sm:grid-cols-3">
              {coachStats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1 border-b-2 border-white/40 py-4 sm:border-b-0 sm:pr-4">
                  <dt className="font-condensed text-sm font-bold tracking-[0.14em] uppercase">
                    {s.label}
                  </dt>
                  <dd className="font-condensed text-3xl font-extrabold uppercase">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="px-[6%] py-28">
          <figure className="mx-auto flex max-w-[960px] flex-col gap-6">
            <span aria-hidden="true" className="font-condensed text-[160px] leading-[0.6] font-extrabold text-red">
              &ldquo;
            </span>
            <blockquote className="font-condensed text-4xl leading-[1.1] font-bold uppercase md:text-5xl">
              {testimonial.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3 font-condensed text-lg font-bold tracking-[0.1em] text-muted uppercase">
              <span aria-hidden="true" className="inline-block h-[3px] w-8 bg-ink" />
              {testimonial.author}
            </figcaption>
          </figure>
        </section>

        {/* PARTNER SCHOOLS TEASER → /partners */}
        <section className="px-[6%] pb-16">
          <div className="flex flex-wrap items-center justify-between gap-8 border-4 border-ink p-8 md:p-12">
            <div className="flex max-w-[680px] flex-col gap-3">
              <Eyebrow>Own a martial arts school?</Eyebrow>
              <h2 className="font-condensed text-4xl leading-[0.95] font-extrabold uppercase md:text-5xl">
                Empty mats by day? <span className="text-red">Let&apos;s fill them.</span>
              </h2>
              <p className="text-lg text-muted">
                Host Yotae Leaders in your idle daytime hours: your martial arts teaching, our
                behavior lessons, and online academics through The VA School.
              </p>
            </div>
            <Link href="/partners" className={`${btn.primary} ${btn.size.lg}`}>
              Partner with Yotae →
            </Link>
          </div>
        </section>

        {/* FREE CHALLENGE */}
        <section id="challenge" className="scroll-mt-6 px-[6%] pb-24">
          <div className="cut-lg flex flex-wrap items-center gap-10 bg-ink px-[6%] py-14 text-white">
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
              <Eyebrow className="text-white">Free · 7 days · 10 minutes a day</Eyebrow>
              <h2 className="font-condensed text-5xl leading-[0.92] font-extrabold uppercase md:text-6xl">
                The family <span className="text-red">challenge.</span>
              </h2>
              <p className="text-lg text-mist">
                Breath and movement, sent to your inbox. Not ready to book? Start here.
              </p>
            </div>
            <ChallengeForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
