---
"node-red-contrib-shadow-check": patch
---

Validate configuration values for plausibility instead of only checking that
they are finite numbers. Width and height must now be greater than 0, the
distance values (inset, overhang, overhang offsets) must be 0 or greater, and
the window azimuth must be between 0 and 360 degrees. This also fixes a case
where a negative width or height could make a fully shaded window report as
fully sunlit.
