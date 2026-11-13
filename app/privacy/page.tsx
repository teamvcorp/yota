import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { heading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

/*
 * PLACEHOLDER privacy notice. It describes only what this code actually does.
 * Have it reviewed for your jurisdiction before launch, and update it when you add an email
 * provider, analytics or payments.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader
        links={[
          { href: "/", label: "Home" },
          { href: "/programs", label: "Programs" },
        ]}
      />
      <main id="main" className="mx-auto flex max-w-3xl flex-col gap-6 px-[6%] py-16">
        <h1 className={`${heading.h1} text-6xl md:text-8xl`}>Privacy</h1>
        <p>
          We only collect what you type into our forms: your name, email, optional phone number,
          and your session preferences for a free intro, just your email for the 7-day
          challenge, or your school and contact details if you ask about becoming a partner school.
        </p>
        <p>
          We use these details only to arrange your session, send the challenge or follow up on a
          partner inquiry. We don&apos;t
          sell or share them, and this site has no advertising or tracking cookies.
        </p>
        <p>
          To see or delete your details, email {site.contact.email}.
        </p>
        <p>
          Form submissions are delivered by email through our provider, Resend, and challenge
          sign-ups are stored there as a mailing-list contact. You can unsubscribe at any time.
        </p>
        <p className="text-muted">[REVIEW BEFORE LAUNCH: add your data retention period.]</p>
      </main>
      <SiteFooter />
    </>
  );
}
