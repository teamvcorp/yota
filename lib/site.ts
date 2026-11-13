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
