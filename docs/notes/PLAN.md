# Yotae site — build plan

Source: canvas mockups `Main.dc.html`, `Programs.dc.html`, `SignUp.dc.html` (shared 2026-11-11).
Brand: **Yotae**, Yoga + Taekwondo + family life coaching, coach Master Robert Vonderbecke.

## Routes
| Route       | Mockup            | Notes                                              |
|-------------|-------------------|----------------------------------------------------|
| `/`         | Main.dc.html      | Hero, Method, How it works, Programs preview, About, Testimonial, Free challenge |
| `/programs` | Programs.dc.html  | 4 programs, 3 pricing tiers, FAQ                   |
| `/book`     | SignUp.dc.html    | 3-step free intro form (client component + Server Action) |
| `/privacy`  | (linked from form)| Placeholder privacy policy                         |

## File map
- `lib/site.ts`: **all editable content** (contact info, programs, prices, FAQ). Fill in the `[BRACKETS]` here.
- `lib/validation.ts`: dependency-free input validation (server side).
- `lib/rate-limit.ts`: in-memory per-IP limiter (swap for Upstash/Redis when on serverless).
- `lib/notify.ts`: where form submissions are delivered. **Currently a stub**, see TODO.
- `app/actions.ts`: Server Actions `requestIntro`, `joinChallenge`.
- `components/`: `SiteHeader`, `SiteFooter`, `Logo`, `Sprig`, `Stones`, `Eyebrow`, `ChallengeForm`, `PhotoPlaceholder`.
- `app/book/BookingForm.tsx`: client multi-step form.

## Partner schools program: `/partners` (added 2026-11-12)
Existing martial arts schools host **Yotae Leaders** in idle daytime hours. The school teaches martial arts its own way,
Yotae adds behavior lessons, and kids do academics online at **app.vaschool.org** (The VA School; facts in `vaschool-notes.md`).
- Content: `partner`, `vaSchool` and `partnerOptions` in lib/site.ts. Form: `app/partners/PartnerForm.tsx` calls the
  `requestPartnership` action, which calls `deliver({kind:"partner"})` and sends a Resend email (reply-to the school owner).
  Rate limit is 3 per 10 min.
- Linked from home nav ("For Schools"), a home teaser band above the challenge, and the footer.
- **Fee model (from the owner, 2026-11-12):** families pay ALL academic fees to The VA School via app.vaschool.org. The partner
  school keeps 100% of its own martial arts fees, and Yotae takes nothing from them. Shown in the fee strip, benefit 01, the
  "Who pays what?" FAQ, the school role panel and the inquiry intro.
- **Optional Family Coaching add-on (owner's terms, 2026-11-12):** Yotae provides the program. The school pays a **$500 annual
  teaching fee**. Each student takes **4 tests at $150 per student, WHEN READY (not yearly)**, and Yotae gets **50% of Family
  Coaching testing fees only**, so per student $600 across all 4 tests splits $300/$300. The numbers live in `coachingLicense`
  (lib/site.ts, field `testCount`) and the page computes the example from them. Section `#family-coaching` on /partners (half zen,
  half sharp). The form has a "coaching" checkbox, which puts "(+ Family Coaching)" in the email subject.
  CONFIRMED 2026-11-13: the school sets its own tuition for the coaching program and keeps 100% of it (shown on the page and in the FAQ).
- Placeholders the owner must fill in: on-site supervision during academics, accreditation status (NEVER claim accredited
  until confirmed), partner regions, sample-day times.

## Design v3: SPLIT (APPROVED by the user 2026-11-12, the current direction)
The user's verdict on v2: "good for taekwondo, not yoga". So the home page is now literally split:
yoga = v1 soft style (`zen-*` tokens, `font-serif` Fraunces, `zen` styles in components/ui.ts, `Sprig`/`Stones`),
taekwondo = v2 sharp style. Mixed zones: the "Stronger together / ON AND OFF THE MAT" band (serif + condensed in one
headline) and the Coaching card (rounded left, square right, straddling the seam).
Only `/` is split. Programs, Book and Privacy are still pure v2, and the shared home sections below the method are v2.
Content for the halves: `disciplines` in lib/site.ts. Backups: `../yota-design-v1-backup.tgz`, `../yota-design-v2-backup.tgz`.

### Gotchas learned
- Stopping a background `npx next start` task can leave the child `node` process holding the port.
  Start with `node node_modules/next/dist/bin/next start -p PORT` instead, and check `netstat -ano | grep :PORT`.
- Very tall CDP screenshots at deviceScaleFactor 2 can tile or repeat content. Use `SCALE=1`.
- Git Bash rewrites `/` CLI args into Windows paths. Prefix with `MSYS_NO_PATHCONV=1`.

## Design v2: "sharp contrast" (2026-11-12)
The user found v1 "too feng shui". v2 follows the logo: black and white, hard edges, one red accent.
- Tokens: ink #0B0B0B · white · paper #F3F3F0 · line #D4D4D0 · muted #555 · mist #BDBDBD (text on black)
  · red #C8102E · red-bright #FF4D5E (small red text on black; plain red on black is only ~3.5:1, so large text only).
- Type: Barlow Condensed 800 uppercase for headlines, Barlow for body. Fraunces was removed.
- Motifs (`components/Decor.tsx`): `Slashes` (skewed bars, like the logo's "E"), `Eyebrow` (red bar + label),
  `Ticker` (red word band), `cut` / `cut-lg` utilities (clipped corner, in globals.css), hard offset blocks behind photos.
- Rhythm: sections alternate black / white / red with no gradients and no rounded corners (circles only in the Method icons).
- Check phone layouts with `docs/notes/tools/phone-shots.mjs` (Chrome DevTools protocol, 390px viewport).
  Plain `chrome --headless --window-size=390` is WRONG: the layout stays ~500px wide and the image gets cropped.

## Design v1 (retired): earthy "garden gate"
Backup: `../yota-design-v1-backup.tgz`. cream #F4EFE6 · forest #2F3A2C · clay #A4502F, Fraunces serif, sprigs, stones, arches.

## Security decisions
- Server Actions validate every field server-side; the client checks are only for convenience.
- Honeypot field + per-IP rate limit on both forms.
- Action returns only `{ ok, message, errors }`, never echoes raw input.
- Security headers in `next.config.ts`: CSP (no nonces, so pages stay static), HSTS, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, frame-ancestors 'none'. `poweredByHeader: false`.
- No third-party scripts. Fonts are self-hosted, so no requests go to Google at runtime.

## Open decisions (owner: site owner)
1. ~~Email delivery~~ DONE 2026-11-11: **Resend** (`lib/notify.ts`, see `resend-notes.md`). Still to do:
   verify the domain in Resend, set the env vars from `.env.example`, and build the 7-day challenge Automation in Resend.
2. Real content: prices, ages, schedule, bio, testimonial, address and phone, in `lib/site.ts`.
3. Photos: replace `PhotoPlaceholder` with `next/image` once photos exist (put them in `public/images/`).
4. Accent colour: mockup offers #A4502F (default), #55633F, #7A5C14, #C8102E. Change `--color-clay` in globals.css.
