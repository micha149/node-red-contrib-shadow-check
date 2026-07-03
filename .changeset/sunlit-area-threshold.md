---
"node-red-contrib-shadow-check": patch
---

Prevent the output from flapping at the shadow edge. The node now decides "sun
shines into the window" based on the sunlit area fraction (more than 5 % of the
window lit) instead of whether any single window corner is lit. Previously an
infinitesimal sliver at one corner could briefly toggle the output, causing
shutters to move down, up, and down again within a few minutes.
