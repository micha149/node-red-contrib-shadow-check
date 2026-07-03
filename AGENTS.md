# AGENTS.md

## Purpose
- This package adds a Node-RED node that checks whether the sun currently shines into a configured window.
- The node combines window dimensions, window azimuth, inset, and roof overhang settings with sun position input, for example from [`node-red-contrib-sunpos`](https://github.com/alisdairjsmyth/node-red-contrib-sunpos), to decide whether blinds/roller shutters should be lowered.

## Commands
- Install with `npm ci`; the package targets Node `>=20` (see `engines`).
- `npm test` runs the Vitest suite (`vitest run`); this is the real coverage.
- `npm run typecheck` type-checks the whole project including tests (`tsc -p tsconfig.test.json`).
- `npm run lint` runs ESLint (`eslint .`) using `eslint.config.mjs` (flat config: `@eslint/js`, `typescript-eslint`, and `@stylistic` rules; `dist/` is ignored). `npm run format` applies fixes.
- `npm run build` cleans, compiles the runtime with `tsc`, bundles the editor via esbuild, and copies icons into `dist/`.
- Releases use Changesets: add one with `npm run changeset`; `npm run version` writes the changelog/version; `npm run release` builds and publishes. Config lives in `.changeset/config.json` (base branch `master`).

## Project Shape
- This is a Node-RED node package written in TypeScript under `src/`; the compiled output in `dist/` is what ships (`package.json` `files` includes `dist`).
- Node-RED loads `dist/nodes/shadow-check/shadow-check.js` via `package.json` `node-red.nodes.shadow-check`; the source is `src/nodes/shadow-check/shadow-check.ts`.
- Runtime flow inside the node input handler is `v.parse(configSchema) (on init) -> v.parse(sunPositionSchema) -> calculateShadow -> calculateSunlitFraction -> isWindowSunlit -> applyResultToMessage -> node.send`.
- Reusable pure logic lives in `src/lib/` (`calculate-shadow.ts`, `calculate-sunlit-fraction.ts`, `payload-schema.ts`, `create-message.ts`), each with a colocated `*.test.ts`.
- The editor UI lives in `src/nodes/shadow-check/shadow-check.html/` (`index.ts`, `editor.html`, `help.html`); `scripts/build-editor.mjs` bundles `index.ts` and inlines the templates into `dist/nodes/shadow-check/shadow-check.html`. Keep `help.html`/`editor.html` in sync with the config fields in `config-schema.ts`.
- Config parsing uses valibot: `configSchema` in `src/nodes/shadow-check/config-schema.ts` coerces string/number inputs to finite numbers.

## Behavioral Notes
- Input expects `msg.payload.azimuth`, `msg.payload.altitude`, and optional `msg.payload.sunInSky` (default `true`); angles are degrees and converted to radians in `src/lib/payload-schema.ts`, where the sun azimuth is also made relative to the window azimuth.
- Output payload is `true` when sun shines into the window; `calculateSunlitFraction` returns the sunlit area fraction (0..1) and `isWindowSunlit` emits `true` only when it exceeds `SUNLIT_THRESHOLD` (0.05), which prevents boolean flapping at shadow edges. Both live in `src/lib/calculate-sunlit-fraction.ts`.
- If `sunInSky` is false or no shadow polygon can be calculated, `calculateSunlitFraction` returns `0`, producing output payload `false`.
- `calculateSunlitFraction` computes the shaded area by convex-clipping the window rectangle against the shadow polygon (Sutherland-Hodgman); the shadow is always a parallelogram, so the convexity precondition holds.
- Keep all window/overhang measurements in one consistent unit; the code only uses relative geometry.
