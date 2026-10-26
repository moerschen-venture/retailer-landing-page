# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Design tokens

`app/assets/css/design-tokens.generated.css` is a generated, byte-identical copy of the design
system's `build/tokens.css` (`<workspace>/design-system/machinemaster/build/tokens.css`). **Never
edit it by hand** - change the system and re-sync.

```bash
# copy the source into the repo (set DESIGN_SYSTEM_DIR to the design-system folder when this
# checkout is not at <workspace>/retailer-landing-page, e.g. in a worktree)
DESIGN_SYSTEM_DIR=/path/to/design-system/machinemaster npm run tokens:sync
```

`npm run generate` first runs `node scripts/sync-design-tokens.mjs --check`: it fails (exit 1) when
the copy differs from the source, and prints `design-system source not reachable - copy not
verified` and carries on when the source folder is not there (Cloud Build sees this repo alone).
`DESIGN_SYSTEM_DIR` defaults to `../design-system/machinemaster` relative to the repo root.

The copy is imported into the CSS layer `design-tokens`, ranked below Tailwind's `theme` layer
(`app/assets/css/main.css`), because several of its names (`--color-gray-*`, `--color-white`,
`--radius-*`, `--shadow-xl`) collide with Tailwind 4 defaults and must not override them. For the
same reason use `bg-(--color-surface-mid)` (the system's `#f2f4f7`), not `bg-gray-100` (Tailwind's
`#f3f4f6`).

Values the system does not have stay in `@theme` / the components: `brand-50..400,600..900`,
`peach-50/100`, `ink-950/900/800`, `#27b300` (StatsBar), `#151c25` and `#626f83` (ModuleTabs).

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
