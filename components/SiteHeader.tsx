import Image from "next/image";
import Link from "next/link";
import { btn } from "./ui";

export type NavLink = { href: string; label: string; current?: boolean };

/*
 * Each page passes its own nav links. `current` sets aria-current="page", which screen readers
 * announce, and it also drives the red underline.
 */
export function SiteHeader({ links, showCta = true }: { links: NavLink[]; showCta?: boolean }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-ink bg-white px-[6%] py-2">
      <Link href="/" className="flex items-center" aria-label="Yotae home">
        <Image
          src="/yota-logo.png"
          alt=""
          width={84}
          height={84}
          priority
          // multiply drops the logo's white background
          className="size-16 object-contain mix-blend-multiply md:size-[76px]"
        />
      </Link>
      <nav
        aria-label="Main"
        className="flex flex-wrap items-center gap-x-7 gap-y-1 font-condensed text-lg font-bold tracking-[0.06em] uppercase"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.current ? "page" : undefined}
            className="border-b-[3px] border-transparent py-2 no-underline hover:border-red aria-[current=page]:border-red"
          >
            {l.label}
          </Link>
        ))}
        {showCta && (
          <Link href="/book" className={`${btn.primary} ${btn.size.md}`}>
            Book free intro
          </Link>
        )}
      </nav>
    </header>
  );
}
