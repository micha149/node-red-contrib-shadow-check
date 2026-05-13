# AGENTS.md

## Purpose
- This package adds a Node-RED node that checks whether the sun currently shines into a configured window.
- The node combines window dimensions, window azimuth, inset, and roof overhang settings with sun position input, for example from [`node-red-contrib-sunpos`](https://github.com/alisdairjsmyth/node-red-contrib-sunpos), to decide whether blinds/roller shutters should be lowered.

## Commands
- Install with `npm ci`; the lockfile is v1 and CI runs against old Node lines (8/10/12 for tests, 12 for lint/release), so avoid modern JS syntax unless you also update that support story.
- Run the real verification with `npm run lint`; it lints only `shadow-check.js` and `src/` using `.eslintrc.js` (`eslint-config-brainbits`).
- `npm test` is a placeholder: it prints `Error: no test specified` but exits 0, so do not treat it as meaningful coverage.
- Release dry-run is `npm run release -- --dry-run`; `.versionrc` uses no tag prefix and changelog sections for `feat`, `fix`, `refactor`, and `deps`.

## Project Shape
- This is a Node-RED node package; Node-RED loads `shadow-check.js` via `package.json` `node-red.nodes.shadow-check`.
- `shadow-check.html` defines the editor UI/help and must stay in sync with config fields parsed in `shadow-check.js`.
- Runtime flow in `shadow-check.js` is `parsePayload -> calculateShadow -> checkIfWindowInShadow -> createMessage -> node.send`.
- Static admin assets are served from `assets/` at `/shadow-check/assets` with `shadow-check.read` permission.

## Behavioral Notes
- Input expects `msg.payload.azimuth`, `msg.payload.altitude`, and optional `msg.payload.sunInSky`; angles are degrees and converted to radians in `src/parsePayload.js`.
- Output payload is `true` when sun shines into the window; internally `checkIfWindowInShadow` returns the inverse and `src/createMessage.js` flips it.
- If `sunInSky` is false or no shadow polygon can be calculated, `checkIfWindowInShadow` returns true, producing output payload `false`.
- Keep all window/overhang measurements in one consistent unit; the code only uses relative geometry.
