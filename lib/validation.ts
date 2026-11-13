/*
 * Server-side input validation. It has no dependencies, so it's small and easy to audit.
 *
 * Lesson: browser checks (`required`, `type="email"`) are only for convenience. Anyone can
 * send a POST straight to a Server Action and skip the browser, so the server must
 * re-check EVERYTHING. These helpers trim the input, enforce lengths, and only accept
 * values from known allow-lists.
 */

// Rejects ASCII control characters (except tab/newline), which have no place in form text.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

// Deliberately simple: one "@", no spaces, a dot in the domain. Perfect email regexes don't
// exist; the real test is whether a confirmation email arrives.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+().\-\s]{0,30}$/;

export type FieldErrors = Partial<Record<string, string>>;

/** Read a single text field safely (FormData can contain File objects too). */
export function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function checkText(
  value: string,
  { label, min = 0, max }: { label: string; min?: number; max: number },
): string | undefined {
  if (value.length < min) return min === 1 ? `Please enter ${label}.` : `${label} is too short.`;
  if (value.length > max) return `Please keep ${label} under ${max} characters.`;
  if (CONTROL_CHARS.test(value)) return `${label} contains characters we can't accept.`;
  return undefined;
}

export function checkEmail(value: string): string | undefined {
  if (!value) return "Please enter your email.";
  if (value.length > 254 || !EMAIL.test(value)) return "Please enter a valid email address.";
  return undefined;
}

export function checkPhone(value: string): string | undefined {
  return PHONE.test(value) ? undefined : "Please use digits, spaces, + ( ) - only.";
}

/** Single choice that must be one of `allowed`. */
export function oneOf<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

/** Multiple choices (checkboxes): keeps only allowed values and removes duplicates. */
export function manyOf<T extends string>(
  formData: FormData,
  key: string,
  allowed: readonly T[],
): T[] {
  const picked = formData
    .getAll(key)
    .filter((v): v is string => typeof v === "string")
    .filter((v): v is T => (allowed as readonly string[]).includes(v));
  return [...new Set(picked)];
}
