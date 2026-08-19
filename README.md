# NeonGate AI

The NeonGate AI website is a single Next.js application. It has no workspace
packages, Turborepo configuration, or package-publication pipeline.

## Requirements

- Node.js 24
- pnpm 10.32.1 through Corepack

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Commands

```bash
pnpm dev          # build local tokens and start Next.js
pnpm build        # build local tokens and the production application
pnpm start        # start the production application
pnpm check        # run Biome and TypeScript
pnpm tokens:build # regenerate local CSS and JSON tokens
```

## Orb

The website renders the published `@neongate-ai/orbz` Web Component through its
SSR-safe React adapter. Orbz owns the Shadow DOM styles, default NeonGate palette,
palette overrides, five conversational states, motion profiles, and reduced-motion
behavior.

Orbz itself has no timers and changes only when its `state` prop changes. The
website-only `LivingOrb` wrapper randomly rotates through `idle`, `listening`,
`thinking`, `speaking`, and `asleep` every 3.5 seconds. The former local
`src/orb` implementation is no longer part of this repository.

## Tokens

The DTCG source files live in `src/identity/tokens/foundation`. The small local
builder writes `src/identity/tokens/dist/index.css` and `tokens.json` before every
development or production build. The generated directory is not committed.

## Static metadata and assets

There is no metadata or asset generator. Basic metadata is declared literally in
`src/app/layout.tsx`. Next.js metadata conventions (`favicon.ico`, `icon.png`,
`apple-icon.png`, `opengraph-image.png`, `twitter-image.png`,
`manifest.webmanifest`, `robots.txt`, and `sitemap.xml`) are committed as static
files in `src/app`. Fixed PWA icon URLs used by the manifest remain in
`public/icons` as normal public assets.

## Vercel

This repository must be configured as a normal root Next.js application:

| Setting | Value |
| --- | --- |
| Root Directory | Empty / repository root |
| Framework Preset | Next.js |
| Build Command | Default (`pnpm build`) |
| Install Command | Default |
| Output Directory | Default (`.next`) |
| Node.js Version | 24.x |

For an existing project, remove the old `apps/website` Root Directory and every
custom Build, Install, and Output override. Add
`ENABLE_EXPERIMENTAL_COREPACK=1` to Preview and Production so Vercel follows the
committed `packageManager` version, then redeploy once without the build cache.

The root `vercel.json` only identifies the Next.js framework. There are no custom
paths or monorepo build commands.
