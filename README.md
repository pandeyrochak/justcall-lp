# JustCall Landing Page — Next.js Frontend

A pixel-perfect landing page for JustCall built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript. Designed to consume content from a WordPress headless CMS (ACF fields via REST API) with a graceful fallback to mock data.

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
| `NEXT_PUBLIC_WP_API_URL` | WordPress REST API base URL (e.g. `https://your-wp.com/wp-json/wp/v2`) | Empty — uses mock data |

When `NEXT_PUBLIC_WP_API_URL` is **empty or unset**, the app automatically serves content from the mock data layer (`src/lib/mock/landing.ts`), enabling fully independent frontend development.

### Running

```bash
npm run dev      # Development server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
```

## Architecture Decisions

### Next.js App Router with ISR

The landing page uses Incremental Static Regeneration (`revalidate: 3600`) for optimal performance. Content is statically generated at build time and refreshed in the background every hour. When WordPress is connected, on-demand revalidation can be triggered via `revalidatePath('/')` from a WP webhook.

### Service Layer Pattern (`src/services/`)

Data fetching is separated from UI components via a dedicated service layer:

- `wp-client.ts` — Generic WordPress REST API fetch wrapper with typed error handling.
- `landing-page.ts` — Landing page–specific service that fetches ACF page data from WP and maps it to our TypeScript interfaces. Falls back to mock data when the WP URL is not configured.

This separation keeps components pure (they receive data as props) and allows the CMS integration to be swapped without touching any UI code.

### Mock Data Fallback

A `USE_MOCK_DATA` flag (derived from whether `NEXT_PUBLIC_WP_API_URL` is set) controls the data source. Mock data in `src/lib/mock/landing.ts` mirrors the exact TypeScript interfaces that the WP mapper produces, so the transition is seamless.

### Tailwind CSS v4 — CSS-first Tokens

Instead of a `tailwind.config.js` file, all design tokens (colors, shadows) are registered directly in `globals.css` via the `@theme inline` directive. This aligns with Tailwind v4's CSS-first approach and keeps the design system co-located with the styles.

### CVA for Component Variants

Button variants (primary, outline) and sizes are defined with `class-variance-authority` for type-safe, composable styling. Combined with `clsx` + `tailwind-merge` in the `cn()` utility.

### Loading, Error, and Empty States

- **Loading**: React `Suspense` boundary wraps all CMS-driven sections with skeleton fallbacks that match the page layout.
- **Error**: Route-level `error.tsx` provides a client-side error boundary with a retry button. The service layer catches API failures and falls back to mock data to prevent full-page errors.
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
    mock/       — Development mock data
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
| **ISR over SSR** | Near-instant TTFB, reduced server load, CDN-cacheable | Content can be stale up to 1 hour (acceptable for a marketing page) |
| **Mock data layer** | Frontend can be developed and deployed independently of WordPress | Extra abstraction code; mock data must be kept in sync with WP field changes |
| **Skeleton loading per section** | Better perceived performance; layout doesn't shift | More skeleton components to maintain |
| **Static hero image export** | Simpler maintenance; exact Figma fidelity | Less flexible if marketing wants to change the hero composition via CMS |
| **`DM Sans` as Google Sans substitute** | Freely available via Google Fonts; very similar metrics | Not an exact match to the proprietary Google Sans typeface |
