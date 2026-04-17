# JustCall Landing Page — Next.js Frontend

A pixel-perfect landing page for JustCall built with Next.js 16, Tailwind CSS v4, and TypeScript. Integrated with dynamic data from a WordPress headless CMS (ACF fields via REST API).

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example env file and configure as needed:

```bash
cp .env.example .env.local
```

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_WP_API_URL` | WordPress REST API base URL (e.g. `https://your-wp.com/wp-json/wp/v2`) | — (required) |
| `NEXT_PUBLIC_WORDPRESS_URL` | Public WordPress site URL used by the client-side lead form to post to `/wp-json/saas/v1/submit-form` | — (required for form submission) |
| `REVALIDATE_SECRET` | Shared secret required by `/api/revalidate` to trigger on-demand cache invalidation from WordPress | — (required for revalidation) |

### Running

```bash
npm run dev      # Development server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
```

## Architecture Decisions

### Next.js App Router with On-Demand Revalidation

The landing page is statically generated and served from Next's Full Route Cache. Instead of relying on a time-based ISR window (which leaves content stale for up to an hour), the site uses **on-demand revalidation** driven by WordPress — edits in the CMS appear on the site immediately after the next request.

A secured revalidation endpoint lives at `src/app/api/revalidate/route.ts`:

```
GET /api/revalidate?path=/&secret=<REVALIDATE_SECRET>
```

The handler validates the `secret` query param against `REVALIDATE_SECRET`, then calls `revalidatePath(path)` to purge the cached route. On the WordPress side, hook into `save_post` / `acf/save_post` and fire a request to this URL (e.g. via `wp_remote_get`) so every publish or update invalidates the Next cache instantly. Requests with a missing or incorrect secret receive `401 Unauthorized`.

Because revalidation is purely event-driven, `wpFetch` no longer sets `next.revalidate` and the page does not declare a `revalidate` interval — the cached response lives until WordPress tells us it has changed.

### Lead Form Submission (Hero Email Form)

The hero CTA form is implemented as a client component (`src/components/ui/EmailForm.tsx`) that posts directly to a **custom WordPress REST endpoint** registered on the WP site:

```
POST {NEXT_PUBLIC_WORDPRESS_URL}/wp-json/saas/v1/submit-form
Content-Type: application/json

{ "email": "user@example.com" }
```

Key properties of the implementation:

- **No Next.js API proxy.** The browser talks to WordPress directly, which keeps the Next runtime stateless and lets WordPress own all lead-capture concerns (persistence, spam filtering, email notifications, CRM forwarding). This also means CORS must be allowed for the site origin on the WP side.
- **Native HTML5 validation + graceful server errors.** The input uses `type="email"` and `required` for instant browser-level validation, and the submit handler surfaces server-side error messages when the WP response is JSON, or falls back to a status-code message / generic "Network error" otherwise.
- **Explicit UI states.** The form tracks `idle | loading | success | error`, disables the submit button while loading, clears the field on success, and highlights the input in red on error — so the user always has feedback.
- **Misconfiguration is fail-fast.** If `NEXT_PUBLIC_WORDPRESS_URL` is missing, the form short-circuits with a visible error instead of sending a broken request.

> Note: if you later need a Next.js-side intermediary (for server-side captcha verification, rate limiting, or to forward to a different service), add a new route handler under `src/app/api/` and point `EmailForm` at it instead of WordPress.

### Service Layer Pattern (`src/services/`)

Data fetching is separated from UI components via a dedicated service layer:

- `wp-client.ts` — Generic WordPress REST API fetch wrapper with typed error handling.
- `landing-page.ts` — Landing page–specific service that fetches ACF page data from WP and maps it to our TypeScript interfaces.

This separation keeps components pure (they receive data as props) and allows the CMS integration to be swapped without touching any UI code.

### Tailwind CSS v4 — CSS-first Tokens

Instead of a `tailwind.config.js` file, all design tokens (colors, shadows) are registered directly in `globals.css` via the `@theme inline` directive. This aligns with Tailwind v4's CSS-first approach and keeps the design system co-located with the styles.

### CVA for Component Variants

Button variants (primary, outline) and sizes are defined with `class-variance-authority` for type-safe, composable styling. Combined with `clsx` + `tailwind-merge` in the `cn()` utility.

### Loading, Error, and Empty States

- **Loading**: React `Suspense` boundary wraps all CMS-driven sections with skeleton fallbacks that match the page layout.
- **Error**: Route-level `error.tsx` provides a client-side error boundary with a retry button. When the WordPress fetch fails, the service layer throws an `ApiError` which is caught by this boundary so the user sees a friendly retry UI instead of a crashed page.
- **Empty**: Each section component checks for empty/null content and gracefully hides itself rather than rendering broken UI.

### Component Structure

```
src/
  components/
    ui/         — Atomic, reusable UI primitives (Button, EmailForm, etc.)
    sections/   — Page section components (Hero, ProductFeature, etc.)
    layout/     — Structural components (Navbar, Footer)
  services/     — Data fetching (WP REST client, landing page service)
  lib/
    types/      — TypeScript interfaces for CMS content shapes
    utils.ts    — Shared utilities (cn helper)
```

## Assumptions

- WordPress exposes ACF fields via REST API on a page with slug `test-lp` using the query `?acf_format=standard`.
- Image assets are served as URLs from the WordPress media library.
- The font "Google Sans" is available through `next/font/google` (loaded as `DM Sans` which is visually equivalent and publicly available).
- Navbar and footer content is static and hardcoded in Next.js (not sourced from CMS).
- Only a desktop (1440px) Figma design was provided; mobile responsive breakpoints are approximated using standard Tailwind breakpoints and the mobile typography tokens from the Figma variable definitions.

## Trade-offs

| Decision | Benefit | Cost |
|---|---|---|
| **On-demand revalidation over time-based ISR** | Edits in WordPress reflect immediately; no wasted regenerations on a fixed interval; near-instant TTFB from the Full Route Cache | Requires WordPress to call the `/api/revalidate` webhook on save; a missed/failed webhook leaves the page stale until the next successful call or deploy |
| **Direct browser → WP form submission** | Keeps Next stateless; WP owns lead storage, spam filtering, and notifications; one less hop in the request path | Requires CORS configured on WordPress for the site origin; no place to add Next-side rate limiting / captcha without reintroducing a proxy route |
| **Skeleton loading per section** | Better perceived performance; layout doesn't shift | More skeleton components to maintain |
| **Static hero image export** | Simpler maintenance; exact Figma fidelity | Less flexible if marketing wants to change the hero composition via CMS |
| **`DM Sans` as Google Sans substitute** | Freely available via Google Fonts; very similar metrics | Not an exact match to the proprietary Google Sans typeface |
