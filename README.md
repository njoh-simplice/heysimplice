# heysimplice

Personal portfolio for **Njoh Simplice Junior** — freelance software developer and
WordPress/SEO specialist, Yaoundé, Cameroon. Live at **[heysimplice.com](https://heysimplice.com)**
(Cloudflare Workers, deploys from `main`; domain and contact email live in
`src/constants/site.ts`).

Single-page marketing site plus a few routed pages: Home (hero, about, process,
featured projects, work experience), Projects, Blog, Contact, Legal Mentions, and
a 404.

## Stack

| Concern    | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Build tool | Vite 8                                                             |
| UI         | React 19 + React Router 7 (`createBrowserRouter`)                  |
| Language   | TypeScript                                                        |
| Styling    | Tailwind CSS v4 — config-less; tokens in `src/index.css` `@theme` |
| Icons      | `lucide-react` (UI) + `react-icons` (brand marks)                 |
| Linter     | Oxlint                                                            |
| Tests      | none                                                              |

## Commands

```bash
npm run dev      # dev server with HMR
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run preview  # serve the production build
```

Run `npm run lint` and `npm run build` before every commit.

## Structure

```
src/
├── assets/            # bundled fonts + images
├── components/
│   ├── layout/        # Header, Footer, RootLayout, CookieConsent
│   └── ui/            # Button, HighlightText, SocialLinks, AnimatedLogo, TimelineMarker
├── constants/         # nav.ts, socials.ts (shared by header + footer)
├── data/              # projectsData/projects.ts (project list, edited by hand)
├── features/
│   ├── home/          # one component per homepage section
│   └── projects/      # ProjectCard (shared by home teaser + Projects page)
├── hooks/             # useCookieConsent, usePageMeta
├── libs/              # analytics.ts (GA4 loader, consent-gated)
├── pages/             # route-level components
├── router.tsx
└── index.css          # Tailwind import + @theme design tokens
```

## Notes

- **Design tokens** live in `src/index.css` (`--color-brand-*`, `--font-*`,
  `--radius-*`). Use the token utilities (`bg-brand-lime`, `font-display`, …),
  not raw hex or default Tailwind palette colors.
- **Content** — project entries in `src/data/projectsData/projects.ts` and page
  copy are maintained by hand.
- **Analytics** — GA4 is loaded only after the visitor accepts the cookie
  banner (`src/libs/analytics.ts` + `src/hooks/useCookieConsent.ts`). The GA4
  Measurement ID is not a secret; any future form-backend keys must stay
  server-side.
- **Contact form** has no backend yet — `handleSubmit` is a mock.
