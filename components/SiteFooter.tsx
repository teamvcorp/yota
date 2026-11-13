import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { address, city, phone, email } = site.contact;
  const link =
    "py-3 font-condensed font-bold tracking-[0.06em] uppercase text-white no-underline hover:text-red-bright";
  return (
    <footer className="mt-auto border-t-[6px] border-red bg-ink px-[6%] py-12 text-[15px] text-mist">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <Image
          src="/yota-logo.png"
          alt="Yotae"
          width={96}
          height={96}
          // invert turns the black logo white; screen drops its (now black) background
          className="size-24 object-contain mix-blend-screen invert"
        />
        <address className="flex flex-col gap-1 not-italic">
          <span>
            {address}, {city}
          </span>
          <span>
            {phone} · {email}
          </span>
        </address>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6">
          <Link href="/programs" className={link}>
            Programs
          </Link>
          <Link href="/book" className={link}>
            Book free intro
          </Link>
          <Link href="/#challenge" className={link}>
            Free challenge
          </Link>
          <Link href="/privacy" className={link}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
