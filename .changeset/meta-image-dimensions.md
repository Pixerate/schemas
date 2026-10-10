---
"@pixerate/schemas": minor
---

Add optional `mainImageWidth`, `mainImageHeight`, `squareImageWidth` and `squareImageHeight` (positive integers) to `MetaConfigSchema` so metadata builders can emit accurate `og:image:width` / `og:image:height` instead of assuming 1200×630 / 400×400.
