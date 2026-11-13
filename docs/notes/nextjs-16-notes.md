# Next.js 16.4 notes (project-specific)

Read from `node_modules/next/dist/docs/01-app/` on 2026-11-11. Check here before re-reading the docs.

## Project config facts
- `cacheComponents: true` and `partialPrefetching: true` are on in `next.config.ts`.
  Pages are static by default. Reading `headers()`/`cookies()` during *render* makes a route dynamic,
  but reading them inside a **Server Action** is fine.
- Tailwind v4 is loaded through the `@tailwindcss/turbopack` loader. Configure it with `@theme` in CSS (there is no tailwind.config.js).
- `LayoutProps<"/">` / `PageProps<"/route">` are global typed helpers (generated).

## Forms + Server Actions (02-guides/forms.md, server-actions.md)
- `'use server'` file exports async functions. Use them in `<form action={fn}>` or with `useActionState(fn, initial)`.
- With `useActionState`, the action signature is `(prevState, formData)` and it returns `[state, formAction, pending]`.
- Built-in protections: Origin/Host CSRF check, 1MB body limit, encrypted action IDs.
  Still **validate input, rate-limit, and shape return values** yourself.
- Multi-instance self-hosting: set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.

## Fonts (01-getting-started/13-fonts.md)
- `next/font/google` self-hosts at build time, so the browser never contacts Google. Prefer variable fonts.
  Non-variable fonts need `weight`. Expose them with `variable: '--font-x'` and map them in `@theme inline`.

## CSP (02-guides/content-security-policy.md)
- Without nonces: set the header in `next.config` `headers()`. You need `'unsafe-inline'` for scripts and styles,
  plus `'unsafe-eval'` in dev only. Nonces force dynamic rendering, so we skip them for this mostly static site.

## Rate limiting
- Docs point to `02-guides/backend-for-frontend.md#rate-limiting`. An in-memory Map works for a single server only.
