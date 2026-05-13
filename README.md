# node-red-contrib-shadow-check

A Node-RED node that checks whether the sun currently shines into a configured window.

The node combines a window's dimensions, azimuth, inset and roof overhang settings with sun position input. It can be used to decide whether blinds or roller shutters should be lowered.

## Input

The node expects sun position data on `msg.payload`:

```json
{
  "azimuth": 180,
  "altitude": 35,
  "sunInSky": true
}
```

`azimuth` and `altitude` are degrees. `sunInSky` is optional and defaults to `true`. If `sunInSky` is `false`, the output payload is `false`.

## Output

The node preserves the incoming message and sets:

- `msg.payload`: `true` if the sun shines into the configured window, otherwise `false`
- `msg.topic`: the configured topic, defaulting to `sunInWindow`

## Development

```sh
npm ci --ignore-scripts
npm run lint
npm run typecheck
npm test
npm run build
```

Release versioning is managed with Changesets:

```sh
npm run changeset
```
