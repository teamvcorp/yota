/*
 * Decorative pieces for design v2 ("sharp contrast").
 * The motif is the logo's angled cuts: slanted bars, hard edges and offset blocks.
 * Purely visual elements carry aria-hidden so screen readers skip them.
 */

/** Three stacked slanted bars, long to short, like the strokes in the logo's "E". */
export function Slashes({
  className = "",
  color = "bg-red",
  size = "md",
}: {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  const s = {
    sm: { w: ["w-10", "w-7", "w-4"], h: "h-1.5", gap: "gap-1" },
    md: { w: ["w-16", "w-11", "w-6"], h: "h-2.5", gap: "gap-1.5" },
    lg: { w: ["w-32", "w-22", "w-12"], h: "h-5", gap: "gap-3" },
  }[size];
  return (
    <div aria-hidden="true" className={`flex flex-col ${s.gap} ${className}`}>
      {s.w.map((w) => (
        <div key={w} className={`${w} ${s.h} -skew-x-[30deg] ${color}`} />
      ))}
    </div>
  );
}

/** Small uppercase label with a red bar in front. */
export function Eyebrow({
  children,
  className = "text-ink",
  bar = "bg-red",
}: {
  children: React.ReactNode;
  className?: string;
  bar?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-condensed text-base font-bold uppercase tracking-[0.18em] ${className}`}
    >
      <span aria-hidden="true" className={`inline-block h-[3px] w-8 ${bar}`} />
      {children}
    </p>
  );
}

/** Full-width red ticker band of repeated words. Decorative, so it's hidden from screen readers. */
export function Ticker({ words }: { words: string[] }) {
  const run = Array.from({ length: 4 }, () => words).flat();
  return (
    <div aria-hidden="true" className="overflow-hidden bg-red py-3 text-white select-none">
      <div className="flex w-max items-center gap-6 font-condensed text-2xl font-extrabold tracking-[0.04em] whitespace-nowrap uppercase md:text-3xl">
        {run.map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            {w}
            <span className="inline-block h-3 w-6 -skew-x-[30deg] bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Stand-in for a photo until real images exist. Swap it for next/image later. */
export function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center px-[12%] text-center text-base ${className}`}
    >
      [PHOTO: {label}]
    </div>
  );
}

/* ============================================================================================
 * YOGA ("zen") decor: restored from design v1 for the yoga half of the split design.
 * Soft, organic counterparts to the slashes above.
 * ========================================================================================== */

// Leaf positions [x, y, rotation] for each sprig size.
const LEAVES = {
  lg: [
    [27, 212, -30], [30, 184, -150], [33, 156, -30], [31, 126, -150],
    [27, 96, -30], [25, 68, -150], [27, 40, -30], [30, 12, -90],
  ],
  sm: [
    [19, 54, -35], [20, 42, -145], [21, 30, -35], [20, 20, -145], [20, 11, -90],
  ],
} as const;

/** A leafy stem. `flip` mirrors it horizontally. */
export function Sprig({
  size = "sm",
  color = "#5F7049",
  flip,
  className,
}: {
  size?: "lg" | "sm";
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  const lg = size === "lg";
  const leaf = lg ? "M0 0C6-9 18-9 24 0C18 9 6 9 0 0Z" : "M0 0C4-6 12-6 16 0C12 6 4 6 0 0Z";
  return (
    <svg
      viewBox={lg ? "0 0 60 240" : "0 0 40 70"}
      aria-hidden="true"
      className={`${flip ? "-scale-x-100" : ""} ${className ?? ""}`}
    >
      <path
        d={lg ? "M30 240C20 200 40 170 30 130S20 70 30 10" : "M20 70C16 50 24 35 20 10"}
        fill="none"
        stroke={color}
        strokeWidth={lg ? 2.5 : 2}
        strokeLinecap="round"
      />
      <g fill={color}>
        {LEAVES[size].map(([x, y, r]) => (
          <path key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`} d={leaf} />
        ))}
      </g>
    </svg>
  );
}

/** Three stacked organic "balance stones", small on top. */
export function Stones({
  colors = ["var(--color-zen-clay)", "#6E6558", "var(--color-zen-ink)"],
}: {
  colors?: [string, string, string];
}) {
  const stones = [
    { w: "w-[52px]", r: "58% 42% 55% 45% / 60% 55% 45% 40%" },
    { w: "w-[84px]", r: "45% 55% 48% 52% / 55% 60% 40% 45%" },
    { w: "w-[120px]", r: "52% 48% 44% 56% / 60% 52% 48% 40%" },
  ];
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-1.5">
      {stones.map((s, i) => (
        <div key={i} className={`${s.w} h-4`} style={{ borderRadius: s.r, background: colors[i] }} />
      ))}
    </div>
  );
}
