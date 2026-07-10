# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public-facing site for **MeraArea**, a hyperlocal business directory (`meraarea.in`). It has no database of its own — every page fetches data from the admin app's public read API (`ottera-ma`, sibling project at `../ottera-ma`) via `NEXT_PUBLIC_API_BASE_URL`. See `../ottera-ma/CLAUDE.md` for the API/data model.

## Commands

```bash
npm run dev     # Turbopack dev server, http://localhost:3000
npm run build
npm run lint
```

No test suite. Requires `NEXT_PUBLIC_API_BASE_URL` (the admin API host) and `NEXT_PUBLIC_SITE_URL` in `.env.local`.

## Architecture

- **Next.js 16** App Router with Turbopack, React 19, Tailwind CSS 4, shadcn/Radix UI (`src/components/ui/`).
- **All data access is a thin HTTP client, not Prisma.** `src/lib/api.ts` (`apiGet`) fetches from `NEXT_PUBLIC_API_BASE_URL`, treating a 404 response as `null` (not an error) — every caller must handle the null case as "not found," not throw. `src/lib/data.ts` wraps each admin API endpoint (`/api/home`, `/api/areas`, `/api/categories`, `/api/businesses/...`, `/api/search`, etc.) in a typed function; add new endpoints there rather than calling `apiGet` directly from pages.
- **Ambiguous-slug routing**: the URL structure can't tell areas, categories, and businesses apart from the path shape alone, so resolution is done by trying each in sequence at request time:
  - `/[areaOrCategorySlug]` → `resolveAreaOrCategory()` (`src/lib/resolve.ts`) tries area first, then category, then 404s.
  - `/[areaOrCategorySlug]/[businessOrCategorySlug]` → `resolveCategoryOrBusinessInArea()` tries "category within this area" first, then "business within this area", then 404s.
  - When adding a new top-level resource type, this resolution chain is the place to extend, and ordering matters (whichever check runs first wins on a slug collision).
- `src/lib/types.ts` mirrors the shapes returned by the admin API (kept manually in sync — there's no shared/generated types package between the two apps).
- `src/components/public/` holds the directory/marketing UI (area & category cards, business cards/lists, search box, breadcrumbs, filter bar, etc.); `src/components/shared/` and `src/components/ui/` are cross-cutting.
- `sitemap.ts` and `robots.ts` in `src/app/` are generated from the same API data (areas/categories/businesses), so a change to what's published in the admin panel affects the sitemap automatically — no separate config to update.
