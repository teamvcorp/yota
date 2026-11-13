/*
 * Shared Tailwind class strings (design v2, sharp contrast).
 * Changing a style here updates it everywhere. They're plain strings, not components, so they
 * work on <Link>, <a> and <button> alike.
 */

const base =
  "inline-flex items-center justify-center gap-2 font-condensed font-bold uppercase tracking-[0.06em] transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export const btn = {
  // Filled red with the logo's cut corner. Hover inverts to black.
  primary: `${base} cut bg-red text-white hover:bg-ink hover:text-white`,
  // Use on a black or red background: hover goes white.
  primaryOnDark: `${base} cut bg-red text-white hover:bg-white hover:text-ink`,
  // Outline buttons, for white and dark backgrounds respectively.
  outline: `${base} border-2 border-ink text-ink hover:bg-ink hover:text-white`,
  outlineLight: `${base} border-2 border-white text-white hover:bg-white hover:text-ink`,
  dark: `${base} cut bg-ink text-white hover:bg-red hover:text-white`,
  light: `${base} cut bg-white text-ink hover:bg-ink hover:text-white`,
  size: {
    md: "px-5 py-2.5 text-base",
    lg: "min-h-14 px-8 text-lg",
  },
};

export const heading = {
  h1: "font-condensed font-extrabold uppercase leading-[0.9] tracking-[-0.01em]",
  section:
    "font-condensed text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.01em] md:text-7xl",
  card: "font-condensed text-3xl font-bold uppercase leading-none",
};

export const input =
  "h-[52px] w-full border-2 border-ink bg-white px-4 text-[17px] text-ink focus:border-red aria-[invalid=true]:border-red";

/*
 * YOGA ("zen") styles for the yoga half of the split design: rounded pills, warm colours and a serif.
 * Compare with `btn` and `heading` above (sharp, taekwondo).
 */
const zenBase =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors";

export const zen = {
  btn: `${zenBase} bg-zen-clay text-white hover:bg-zen-forest hover:text-white`,
  btnOutline: `${zenBase} border-[1.5px] border-zen-ink text-zen-ink hover:bg-zen-ink hover:text-zen-cream`,
  size: { md: "px-6 py-3", lg: "min-h-14 px-8 text-lg" },
  h1: "font-serif font-medium leading-[1.02] tracking-[-0.01em]",
  section: "font-serif text-4xl font-medium leading-[1.08] md:text-[52px]",
  eyebrow: "font-condensed text-base font-bold uppercase tracking-[0.16em] text-zen-clay",
};
