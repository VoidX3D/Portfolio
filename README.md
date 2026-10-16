# VoidX3D Portfolio

An interactive Ubuntu-style portfolio for **VoidX3D / Sincere Bhattarai**, built with Next.js, React, Tailwind CSS, and a privacy-minded Supabase data layer. The desktop shell includes movable windows, app shortcuts, a local code workspace, Brave-style browser preview, Spotify fallback, portfolio content, and privacy/legal pages.

## Live deployments

- Production Vercel: https://voidx3d.vercel.app
- GitHub Pages: https://voidx3d.github.io/Portfolio/
- Repository: https://github.com/VoidX3D/Portfolio

Vercel is connected to `VoidX3D/Portfolio` and deploys from `main`. GitHub Actions exports the same app and publishes the static bundle to `gh-pages`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check:

```bash
npm run build
```

The project uses the Pages Router and supports GitHub Pages base-path configuration through `next.config.js` when running in GitHub Actions.

## Environment variables

Copy `.env.example` to `.env.local`. The Supabase URL and publishable key are safe browser configuration values, but service-role keys must never be committed or exposed to the client.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_TRACKING_ID=
NEXT_PUBLIC_SERVICE_ID=
NEXT_PUBLIC_TEMPLATE_ID=
NEXT_PUBLIC_USER_ID=
```

Optional analytics and Vercel insights are consent-gated. Without a Supabase configuration, telemetry safely no-ops. Contact email delivery continues to use the existing EmailJS integration when configured.

## Supabase data layer

The dedicated project is named **VoidX3D Portfolio**. Its migration lives at `supabase/migrations/20261016000000_create_portfolio_data_layer.sql` and defines anonymous sessions, consent events, analytics events, private contact submissions, and published portfolio project content. RLS prevents public reads of telemetry and contact data; browser clients can only insert validated consent and analytics events.

The app does not intentionally store raw IP addresses or sensitive analytics payloads. Optional analytics begin only after the visitor accepts them. Visitors can review or change choices at `/privacy#settings`.

## App authoring

Apps are registered in `apps.config.js`. Each app should provide a screen renderer, a valid icon under `public/themes/Yaru/apps`, an accessible title, and a graceful external fallback when it depends on another service. Use `components/apps/help.js` as a reference for self-contained app UI.

Legal routes are available at `/privacy`, `/cookies`, and `/terms`. Public profile facts used in the content pass are documented in `docs/public-profile-research.md`.

## Contributing

Create a feature branch, run the production build, verify both local and static-export behavior, and open a pull request. Keep secrets out of Git, preserve consent boundaries, and prefer accessible fallbacks over fragile embeds.
