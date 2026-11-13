/*
 * SINGLE SOURCE OF TRUTH for site content.
 * Anything in [SQUARE BRACKETS] is a placeholder from the mockups; replace it with real details.
 * Pages read from here, so you never have to edit JSX just to change copy or prices.
 *
 * This file contains only plain data (no secrets), so client components may import it too.
 */

export const site = {
  name: "Yotae",
  // Set NEXT_PUBLIC_SITE_URL in .env.local / hosting settings once you have a domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Yotae balances the calm of yoga with the confidence of taekwondo, then turns both into coaching your whole family can use every day.",
  coach: "Master Robert Vonderbecke",
  contact: {
    address: "[YOUR ADDRESS]",
    city: "[YOUR CITY]",
    phone: "[PHONE]",
    email: "[EMAIL]",
  },
  responseTime: "[RESPONSE TIME]",
} as const;

export const coachStats = [
  { value: "[RANK / DAN]", label: "Taekwondo" },
  { value: "[CERTIFICATION]", label: "Yoga" },
  { value: "[YEARS]", label: "Teaching families" },
] as const;

export const coachBio =
  "[YOUR STORY: two or three sentences on why you brought yoga and taekwondo together, and what you have seen it do for families.]";

export const testimonial = {
  quote: "[FAMILY TESTIMONIAL: a real quote from a family you coach goes here.]",
  author: "[FAMILY NAME], [YOUR CITY]",
} as const;

export type Program = {
  slug: string;
  name: string;
  teaser: string; // short line used on the home page cards
  whoFor: string;
  format: string;
  outcome: string;
};

export const programs: Program[] = [
  {
    slug: "family-coaching",
    name: "Family coaching",
    teaser: "The whole household, one shared plan.",
    whoFor: "The whole household training and setting goals together.",
    format: "[SESSIONS PER WEEK] · [LENGTH] · [IN PERSON / ONLINE]",
    outcome: "A shared family plan, calmer routines and a common language.",
  },
  {
    slug: "parent-and-child",
    name: "Parent and child",
    teaser: "Train as a pair and build trust.",
    whoFor: "One parent and one child, ages [AGE RANGE].",
    format: "[SESSIONS PER WEEK] · [LENGTH] · [IN PERSON / ONLINE]",
    outcome: "Trust, teamwork and time together that is not a screen.",
  },
  {
    slug: "kids-and-teens",
    name: "Kids and teens",
    teaser: "Focus, respect and self-belief.",
    whoFor: "Young people ages [AGE RANGE], grouped by age.",
    format: "[SESSIONS PER WEEK] · [LENGTH] · [IN PERSON / ONLINE]",
    outcome: "Focus, respect and self-belief that show up at school and at home.",
  },
  {
    slug: "one-on-one",
    name: "One-on-one",
    teaser: "Private coaching at your pace.",
    whoFor: "Any family member who wants private life coaching.",
    format: "[SESSIONS PER WEEK] · [LENGTH] · [IN PERSON / ONLINE]",
    outcome: "A personal plan and a coach who holds you to it.",
  },
];

export type Plan = {
  name: string;
  price: string;
  per: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    name: "Drop-in",
    price: "[YOUR PRICE]",
    per: "per class",
    features: ["Any open class", "No commitment"],
  },
  {
    name: "Family plan",
    price: "[YOUR PRICE]",
    per: "per month, whole household",
    features: [
      "[NUMBER] classes per week",
      "Monthly family coaching check-in",
      "Progress tracking for each member",
    ],
    featured: true,
    badge: "Best for families",
  },
  {
    name: "Coaching package",
    price: "[YOUR PRICE]",
    per: "per month",
    features: [
      "Everything in the Family plan",
      "Private one-on-one sessions",
      "Direct access to Master Robert",
    ],
  },
];

export const faqs = [
  {
    q: "Do we need any experience?",
    a: "No. Every program starts from where your family is today.",
  },
  { q: "What ages can join?", a: "[YOUR AGE RANGE AND ANY LIMITS]" },
  {
    q: "What should we wear?",
    a: "Comfortable clothes you can move in. [UNIFORM DETAILS IF ANY]",
  },
  { q: "Is it in person or online?", a: "[IN PERSON AT YOUR LOCATION / ONLINE / BOTH]" },
] as const;

/*
 * Booking form choices. The SERVER validates submissions against these exact lists
 * (an allow-list), so a visitor can't post arbitrary values.
 */
export const bookingOptions = {
  partySizes: ["Just me", "Me and one child", "Family of 3", "Family of 4 or more"],
  goals: [
    "Calmer home",
    "Confidence",
    "Focus and discipline",
    "Fitness",
    "Time together",
    "Respect",
  ],
  times: ["Weekday mornings", "Weekday evenings", "Saturdays", "Sundays"],
  modes: ["In person", "Online"],
} as const;

/*
 * The two halves of the split home page. Yoga copy is rendered in the soft "zen" style and
 * taekwondo copy in the sharp style. Edit freely.
 */
export const disciplines = {
  yoga: {
    label: "Yoga · for calm",
    headline: ["Breathe in.", "Find your calm."],
    body: "Breath, focus and flexibility. The tools a family reaches for when the day gets loud.",
    tagline: "Step through the gate. Leave the noise outside.",
    points: ["Breath work", "Focus", "Flexibility", "Stillness"],
  },
  taekwondo: {
    label: "Taekwondo · for confidence",
    headline: ["Stand tall.", "Strike true."],
    body: "Discipline, respect and resilience, earned one step and one belt at a time.",
    tagline: "Every belt is earned.",
    points: ["Discipline", "Respect", "Resilience", "Belt by belt"],
  },
  coaching: {
    body: "Shared goals, honest conversations and habits that carry from the mat into home life. Coaching is where the calm and the confidence meet.",
  },
} as const;

/* ============================================================================================
 * PARTNER SCHOOLS program (/partners): existing martial arts schools host "Yotae Leaders"
 * during their idle daytime hours. Facts about The VA School must come from
 * docs/notes/vaschool-notes.md (verified). Never claim accreditation until it's confirmed.
 * ========================================================================================== */

export const vaSchool = {
  name: "The VA School",
  fullName: "The VA School (Von Der Becke Academy)",
  // Partner-school students use the ONLINE program at app.vaschool.org.
  // (homeschool-plus.com is only for The VA School's own locations, so don't use its claims here.)
  url: "https://app.vaschool.org",
  // Verified on app.vaschool.org (2026-11-12); see docs/notes/vaschool-notes.md
  tagline: "A school built on mastery, not grades.",
} as const;

export const partner = {
  programName: "Yotae Leaders",
  roles: [
    {
      who: "Your school",
      gives: [
        "Your mat space during idle daytime hours",
        "Your instructors, teaching your style, your way",
        "A home base in your community",
        "Your own martial arts fees, 100% kept",
      ],
    },
    {
      who: "Yotae",
      gives: [
        "Program structure and daily rhythm",
        "Behavior lessons woven into martial arts time",
        "Family coaching and enrollment support",
      ],
    },
    {
      who: "The VA School",
      gives: [
        "Online K–12 academics: progress one demonstrated skill at a time",
        "A family dashboard: attendance, skills mastered and belt promotions, live on any phone",
        "Character & Leadership and ABA Self-Regulation as core disciplines",
      ],
    },
  ],
  // SAMPLE ONLY. Adjust to each partner school's hours.
  sampleDay: [
    { time: "[8:30]", block: "Arrival and check-in", kind: "core" },
    { time: "[9:00]", block: "Academics: math and ELA", kind: "academic" },
    { time: "[10:30]", block: "Martial arts, taught by your instructors", kind: "martial" },
    { time: "[11:30]", block: "Lunch", kind: "core" },
    { time: "[12:15]", block: "Academics: science and social studies", kind: "academic" },
    { time: "[1:30]", block: "Behavior lesson and leadership", kind: "behavior" },
    { time: "[2:15]", block: "Martial arts: forms, sparring, rank prep", kind: "martial" },
    { time: "[3:00]", block: "Dismissal. Your evening classes start as usual", kind: "core" },
  ],
  benefits: [
    {
      title: "Fill idle daytime hours",
      body: "Your mats sit empty while kids are at school. Fill them with daytime students and keep 100% of the martial arts fees you charge. We take no cut.",
    },
    {
      title: "Become a community anchor",
      body: "Your school becomes the place that raises focused, respectful young leaders, and parents and neighbours notice.",
    },
    {
      title: "Grow your evening roster",
      body: "Daytime students and their families already know your school, your instructors and your culture.",
    },
    {
      title: "Keep your style",
      body: "You teach martial arts the way you always have. We add the behavior lessons and the academics around it.",
    },
  ],
  faqs: [
    {
      q: "Do we have to change how we teach?",
      a: "No. Your instructors teach your art and curriculum. Yotae adds short behavior lessons on self-regulation, character and leadership.",
    },
    {
      q: "Who handles the academics?",
      a: "Students are enrolled in The VA School's online, mastery-based K–12 program at app.vaschool.org. [ON-SITE SUPERVISION: who is in the room during academic blocks]",
    },
    {
      q: "Who pays what?",
      a: "Families pay the academic fees to The VA School through app.vaschool.org. Your martial arts fees are yours: you set your own price and keep 100% of it. Yotae takes nothing from what you charge for your art.",
    },
    {
      q: "Can we also run Yotae Family Coaching?",
      a: "Yes, as an optional add-on. We provide the program for a $500 annual teaching fee. Each student takes 4 tests at $150, whenever they're ready, and Yotae receives 50% of those Family Coaching testing fees only. You set your own tuition for the program and keep 100% of it, and we take nothing from your other programs.",
    },
    {
      q: "Is The VA School accredited?",
      a: "[ACCREDITATION STATUS: update once confirmed. Do not claim accreditation before then.]",
    },
    {
      q: "Where is this available?",
      a: "The VA School's online program serves families in every state. Where state-specific standards aren't built out yet, students start on nationally aligned standards. [PARTNER REGIONS]",
    },
  ],
} as const;

/*
 * OPTIONAL ADD-ON for partner schools: license the Yotae Family Coaching program.
 * Terms from the owner (2026-11-12). Numbers live here so the page maths can never drift from them.
 *   - Yotae provides the program
 *   - School pays an annual teaching fee
 *   - Yotae receives a share of TESTING fees for this program only
 *   - Tests are NOT on a yearly schedule: each student takes them when ready (owner, 2026-11-13)
 *   - The school sets and keeps 100% of any tuition it charges for the program (owner, 2026-11-13)
 */
export const coachingLicense = {
  annualFee: 500, // USD per year, paid by the school
  testCount: 4, // tests per student across the whole program, taken when ready
  testFee: 150, // USD per test, per student
  yotaeShare: 0.5, // Yotae gets 50% of Family Coaching testing fees only
  includes: [
    "The full Yotae Family Coaching program and curriculum",
    "Teaching materials and instructor guidance",
    "A 4-level testing path. Families test when they're ready",
  ],
} as const;

/** Partner inquiry form choices (server-side allow-lists). */
export const partnerOptions = {
  studentCounts: ["Under 50", "50–150", "150–300", "300+"],
  daytime: ["Weekday mornings", "Weekday early afternoons", "Full school day"],
} as const;
