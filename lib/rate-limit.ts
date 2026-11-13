import "server-only";

/*
 * Basic sliding-window rate limiter, kept in memory.
 *
 * LIMITATION: memory isn't shared between server instances, and on serverless hosts
 * (e.g. Vercel) each cold start begins empty. That's fine for stopping casual spam on a small
 * site. For stronger protection, swap this for a shared store such as Upstash Redis
 * (@upstash/ratelimit) and keep the same `rateLimit()` signature.
 */

const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000; // cap memory use so a flood of unique IPs can't exhaust RAM

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false; // blocked
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    // Map keeps insertion order, so the first key is the oldest. Drop it.
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return true; // allowed
}
