import type { Metadata } from "next";
import { Eyebrow, Slashes } from "@/components/Decor";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { heading } from "@/components/ui";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a free intro session",
  description: "No cost and no commitment. Come as you are and see if Yotae fits your family.",
};

const expect = [
  { title: "Meet Master Robert", body: "Tell him what your family wants to work on." },
  { title: "Try a short session", body: "Breath work, basic movement and a first taekwondo stance." },
  { title: "Get a recommendation", body: "Leave with the program that suits you best." },
];

export default function BookPage() {
  return (
    <>
      <SiteHeader
        showCta={false}
        links={[
          { href: "/", label: "Home" },
          { href: "/programs", label: "Programs" },
        ]}
      />

      {/* Two hard-edged panels: black "what to expect", white form with a heavy border */}
      <main id="main" className="grid gap-0 px-[6%] py-12 lg:grid-cols-[2fr_3fr]">
        <aside className="flex flex-col gap-7 bg-ink px-8 py-14 text-white md:px-11">
          <Eyebrow className="text-white">Free intro session</Eyebrow>
          <h1 className={`${heading.h1} text-[clamp(48px,5.4vw,80px)]`}>
            Your family&apos;s <span className="text-red">first step.</span>
          </h1>
          <p className="text-lg text-mist">
            No cost and no commitment. Come as you are and see if Yotae fits.
          </p>
          <ol className="mt-2 flex flex-col">
            {expect.map((e, i) => (
              <li key={e.title} className="flex items-start gap-5 border-t-2 border-white/20 py-5">
                <span
                  aria-hidden="true"
                  className="font-condensed text-4xl leading-none font-extrabold text-red-bright"
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="font-condensed text-xl font-bold uppercase">{e.title}</p>
                  <p className="text-mist">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Slashes size="lg" className="mt-auto pt-6" />
        </aside>

        <section
          aria-label="Free intro request form"
          className="border-4 border-ink bg-white px-6 py-14 md:px-12 lg:border-l-0"
        >
          <BookingForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
