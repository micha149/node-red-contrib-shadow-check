# node-red-contrib-shadow-check

## 1.0.2

### Patch Changes

- 0f6f046: Validate configuration values for plausibility instead of only checking that
  they are finite numbers. Width and height must now be greater than 0, the
  distance values (inset, overhang, overhang offsets) must be 0 or greater, and
  the window azimuth must be between 0 and 360 degrees. This also fixes a case
  where a negative width or height could make a fully shaded window report as
  fully sunlit.
- 018be32: Prevent the output from flapping at the shadow edge. The node now decides "sun
  shines into the window" based on the sunlit area fraction (more than 5 % of the
  window lit) instead of whether any single window corner is lit. Previously an
  infinitesimal sliver at one corner could briefly toggle the output, causing
  shutters to move down, up, and down again within a few minutes.

## 1.0.1

### Patch Changes

- 53eb4b6: Add installation and usage examples to README
