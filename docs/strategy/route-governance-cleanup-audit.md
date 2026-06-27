# Route Governance Cleanup Audit

Date: 2026-06-27
Scope: App route directory, project navigation schema, route-level noise, production robots policy, and redirect configuration for a portfolio transitioning into a public-facing Systems Design Practice.
Status: Recommendation only. No routes, assets, interactions, redirects, or navigation logic were changed.

## Executive Summary

The portfolio has a strong public architecture centered on the Independent Systems Design Practice, the Environmental Systems Design OS, frameworks, concepts, experimental builds, and professional validation. The structural noise comes from a small set of execution-level utilities, sandbox/component previews, hidden mockup collateral, and nested case-study loops.

This audit separates routes and modules into three governance actions:

- **[KEEP & ENHANCE]**: canonically useful public surfaces or navigation infrastructure.
- **[DEPRECATE / REDIRECT]**: isolated utilities, sandbox routes, and production-facing execution artifacts.
- **[CONSOLIDATE TO CANONICAL]**: duplicated or nested routes that split one story across multiple pages.

Important implementation constraint: this repo uses `output: 'export'` in `next.config.js` and is deployed from the static `out` directory through Vercel. Next.js runtime redirects are not the safest implementation target. Redirects should be configured in `vercel.json`, and crawler policy should be handled through `public/robots.txt`.

## Governance Table

| Original Route / Module | Governance Action | Narrative Risk Remediation | Next Action Script |
|---|---|---|---|
| `/` | [KEEP & ENHANCE] | Public front door remains essential, but identity should point harder toward Systems Design Practice. | Keep route. Enhance metadata and homepage routing toward `/projects/research-practice/`. |
| `app/layout.tsx` metadata | [KEEP & ENHANCE] | Current “Digital Designer & Developer” metadata dilutes practice positioning. | Update title/description later to “Dan Meier — Systems Design Practice.” |
| `data/projects.ts` | [KEEP & ENHANCE] | Canonical project registry already protects navigation coherence. | Extend later with governance fields: `canonicalHref`, `visibility`, `osCategory`, `redirectFrom`. |
| `utils/projectNavigation.ts` | [KEEP & ENHANCE] | Main project menu is clean and data-driven. | Keep as source for public project navigation. |
| `components/ProjectPracticeNavDropdown.tsx` | [KEEP & ENHANCE] | Supports the two-track practice structure. | Keep. Do not redirect anything listed in `PROJECTS` without removing from registry first. |
| `components/HomepageSideNav.tsx` | [KEEP & ENHANCE] | Homepage section nav is not route noise. | Keep. |
| `components/StaticFooter.tsx` | [KEEP & ENHANCE] | Footer currently bypasses the full Practice OS spine. | Enhance later with Research Practice and Environmental Systems Design OS links. |
| `/projects/research-practice/` | [KEEP & ENHANCE] | Canonical public front door for the practice. | Keep as primary portfolio/practice entry. |
| `/projects/environmental-systems-design-os/` | [KEEP & ENHANCE] | Canonical research infrastructure / OS page. | Keep. |
| `/projects/architecture-of-confidence/` | [KEEP & ENHANCE] | Canonical flagship framework. | Keep. |
| `/projects/wayfinding-matrix/` | [KEEP & ENHANCE] | Canonical applied concept. | Keep. |
| `/projects/intention-engine/` | [KEEP & ENHANCE] | Canonical applied concept. | Keep. |
| `/projects/adaptive-ranch-experience-companion/` | [KEEP & ENHANCE] | Canonical outdoor hospitality / stewardship concept. | Keep. |
| `/projects/responsive-ecologies/` | [KEEP & ENHANCE] | Canonical flagship synthesis. | Keep. |
| `/projects/field-notes/` | [KEEP & ENHANCE] | Canonical field-study / research-product surface. | Keep, but narratively reclassify from pure build to field-study layer. |
| `/projects/travel-and-ai/` | [KEEP & ENHANCE] | Canonical HADE parent. | Keep as canonical for HADE ecosystem. |
| `/projects/travel-and-ai/system-orchestrator/` | [CONSOLIDATE TO CANONICAL] | Standalone orchestration view risks becoming a nested product loop outside the canonical HADE story. | Redirect to `/projects/travel-and-ai/` unless it is promoted into visible HADE navigation. |
| `/projects/travel-and-ai/projects/[projectId]/` | [KEEP & ENHANCE] | These subroutes are currently linked inside HADE and power active interaction/navigation. | Do not redirect now. Later consolidate only after HADE internal links are refactored. |
| `components/ProjectNavigation.tsx` | [KEEP & ENHANCE] | Internal HADE navigation currently depends on subroutes. | Keep. Any consolidation must update this component first. |
| `/projects/digital-executor/` | [KEEP & ENHANCE] | Canonical recovery automation concept. | Keep. |
| `/projects/previous/` | [KEEP & ENHANCE] | Canonical professional validation hub. | Keep. |
| `/projects/purdue/` | [KEEP & ENHANCE] | Canonical professional validation page. | Keep. |
| `/projects/previous/*` client pages | [KEEP & ENHANCE] | These validate execution under real constraints. | Keep. |
| `/projects/timbertech/details/` | [CONSOLIDATE TO CANONICAL] | Splits one TimberTech case study into a nested visual-detail loop. | Redirect to `/projects/previous/timbertech/`. |
| `components/ViewMoreWorkSection.tsx` | [KEEP & ENHANCE] | Related-work navigation has canonical-link risk for Purdue. | Later use project `href` instead of constructing `/projects/previous/${id}`. |
| `/mockups/trust-verification-report/` | [CONSOLIDATE TO CANONICAL] | Mockup route is collateral, not a canonical public page; currently opened by `TrustPulseUI`. | First replace `TrustPulseUI` pop-up target or embed report in HADE/Trust page; then redirect to `/projects/travel-and-ai/projects/trust-framework-ai-travel/`. |
| `components/TrustPulseUI.tsx` | [CONSOLIDATE TO CANONICAL] | Opens `/mockups/trust-verification-report`, creating a hidden collateral loop. | Update `window.open` destination before enabling redirect. |
| `/sandbox/systems-module/` | [DEPRECATE / REDIRECT] | Isolated component playground; execution-level artifact. | Redirect to `/projects/previous/`. |
| `/favicon-generator/` | [DEPRECATE / REDIRECT] | Isolated utility route; not part of practice narrative. | Redirect to `/projects/research-practice/`. |
| `public/*favicon*.html`, `public/generate-favicons.html`, `public/dm-favicon-generator.html` | [DEPRECATE / REDIRECT] | Public static utility files create production index noise. | Redirect HTML generator files to `/projects/research-practice/`; keep actual favicon image assets. |
| `app/favicon-generator/page.tsx` | [DEPRECATE / REDIRECT] | Execution-level generator UI. | Leave file in repo if useful, but block/redirect in production. |
| `app/sandbox/systems-module/page.tsx` | [DEPRECATE / REDIRECT] | Component preview route. | Leave file in repo if useful, but block/redirect in production. |

## Production Robots.txt Lines

Add these lines to `public/robots.txt` when ready. This file does not currently exist in the repo.

```txt
User-agent: *
Disallow: /favicon-generator/
Disallow: /sandbox/
Disallow: /mockups/
Disallow: /projects/timbertech/details/
Disallow: /projects/travel-and-ai/system-orchestrator/
Disallow: /favicon-converter.html
Disallow: /favicon-generator.html
Disallow: /favicon-generator-simple.html
Disallow: /favicon-png-generator.html
Disallow: /favicon-preview.html
Disallow: /favicon-preview-comparison.html
Disallow: /favicon.html
Disallow: /generate-favicons.html
Disallow: /square-favicon-generator.html
Disallow: /dm-favicon-generator.html
```

## Vercel Redirect Configuration

Because this site uses static export, prefer Vercel redirects in `vercel.json` instead of Next.js runtime redirect blocks.

The current `vercel.json` already contains `headers`. When implementing, add a top-level `redirects` array alongside `headers`.

```json
{
  "redirects": [
    {
      "source": "/favicon-generator",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/sandbox/systems-module",
      "destination": "/projects/previous/",
      "permanent": true
    },
    {
      "source": "/projects/timbertech/details",
      "destination": "/projects/previous/timbertech/",
      "permanent": true
    },
    {
      "source": "/projects/travel-and-ai/system-orchestrator",
      "destination": "/projects/travel-and-ai/",
      "permanent": true
    },
    {
      "source": "/favicon-converter.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon-generator.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon-generator-simple.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon-png-generator.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon-preview.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon-preview-comparison.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/favicon.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/generate-favicons.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/square-favicon-generator.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    },
    {
      "source": "/dm-favicon-generator.html",
      "destination": "/projects/research-practice/",
      "permanent": true
    }
  ]
}
```

## Deferred Redirect After Dependency Update

Do not enable this redirect until `components/TrustPulseUI.tsx` stops opening `/mockups/trust-verification-report`.

```json
{
  "source": "/mockups/trust-verification-report",
  "destination": "/projects/travel-and-ai/projects/trust-framework-ai-travel/",
  "permanent": true
}
```

## Implementation Notes

- Do not delete any route files or public assets as part of the first cleanup pass.
- Do not redirect `/projects/travel-and-ai/projects/*` yet. Those routes are generated by `generateStaticParams()` and are actively referenced inside HADE navigation.
- Do not redirect anything registered in `data/projects.ts` unless the registry and navigation schema are updated first.
- Use `robots.txt` for crawler suppression and `vercel.json` for production redirects.
- Actual favicon image assets should remain public. Only favicon generator HTML files are structural noise.

## Safe Implementation Order

1. Create `public/robots.txt` with the disallow lines above.
2. Add the safe redirects to `vercel.json`.
3. Build and test static export.
4. Test canonical routes:
   - `/projects/research-practice/`
   - `/projects/environmental-systems-design-os/`
   - `/projects/travel-and-ai/`
   - `/projects/previous/timbertech/`
   - `/projects/previous/`
5. Update `TrustPulseUI` to stop targeting `/mockups/trust-verification-report`.
6. Only then add the deferred mockup redirect.
