# VoidX3D Portfolio Modernization TODO

## Identity, content, and SEO

- [ ] Use **VoidX3D** as the primary visible brand while retaining Sincere Bhattarai as the author identity where appropriate.
- [ ] Update the canonical site, Vercel URL, GitHub Pages URL, social links, metadata, JSON-LD, robots, sitemap, and Open Graph previews.
- [ ] Update the resume link and documentation without inventing new credentials, education, or employment claims.

## Desktop shell and UI

- [ ] Preserve the Ubuntu-style desktop concept while improving spacing, typography, responsive layout, focus states, reduced-motion behavior, and keyboard shortcuts.
- [ ] Remove direct mutation of React state and shared app configuration.
- [ ] Add a Help & Shortcuts app and a clearer VoidX3D portfolio dashboard.

## App reliability and new apps

- [ ] Make Spotify launch reliably with an in-app status/fallback experience and a direct official Spotify link.
- [ ] Replace the broken VS Code/GitHub1s embed with a local code-browser experience and direct repository links.
- [ ] Add a Firefox app with a bundled Mozilla icon and safe navigation behavior.
- [ ] Add useful Ubuntu-style apps such as Files, Notes, System Monitor, and Help where they are self-contained.
- [ ] Verify every app in `apps.config.js` has a valid icon, screen, title, external-link behavior, and open/close/minimize support.

## Privacy, consent, and legal pages

- [ ] Add a cookie/analytics consent banner with Accept, Reject, and Settings behavior.
- [ ] Ensure optional analytics and telemetry do not initialize before consent.
- [ ] Add visible Privacy Policy, Terms of Use, and Cookie Policy content with data categories, purpose, retention, rights, and contact information.
- [ ] Add a privacy settings control that can reopen consent choices.

## Supabase data layer

- [ ] Select or create a dedicated Supabase project for the portfolio; do not use the unrelated existing AniKai project.
- [ ] Add migrations for consent events, anonymous sessions, page/app events, contact submissions, and portfolio content metadata.
- [ ] Add RLS and least-privilege access policies; keep contact submissions private.
- [ ] Add typed client/event utilities and safe no-op behavior when deployment variables are absent.
- [ ] Log only consented, necessary, privacy-minimized data.

## Deployment and documentation

- [ ] Verify the Vercel project deploys `VoidX3D/Portfolio` from `main` at `https://voidx3d.vercel.app`.
- [ ] Verify GitHub Pages publishes the actual app from `main` to `gh-pages`, not the Markdown documentation.
- [ ] Remove duplicate or stale deployment configuration.
- [ ] Update README, app-authoring documentation, environment variable examples, and maintainer notes.
- [ ] Run build, static export, route/metadata checks, and app registry validation before delivery.
