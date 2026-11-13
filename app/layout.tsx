import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * next/font downloads these at BUILD time and serves them from our own domain,
 * so visitors' browsers never contact Google (better privacy, and fits our CSP).
 */
/*
 * Split design: two type voices.
 *   Taekwondo / shared: Barlow Condensed, heavy and uppercase (echoes the logo's blocky letters).
 *   Yoga: Fraunces, a soft variable serif.
 *   Body text everywhere: Barlow.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"], // optical-size axis gives large headlines finer detail
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Barlow is not variable, so list the weights
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Yoga + Taekwondo family coaching`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    images: ["/yota-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Skip link: keyboard users can jump past the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
