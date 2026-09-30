# Soft UI overhaul

Unified radii (6/10/14/18/22px), rounded 46px action controls, warm neutral secondary buttons, evergreen focus rings, soft active navigation, compact pill badges and selected channels. Reduced separator density; added restrained surfaces to the demo, import, Ask ClubPulse and forecast. Polished the editorial hero and real-data preview. Analytics, import and routing logic remain unchanged.

Validation: node scripts/check-build.mjs passes 61 tests and 30 module checks. No standalone lint or TypeScript configuration exists in this JavaScript repository. Screenshots inspected at actual 1440, 1280, 768 and 390px widths across home, demo, import, Sheets, analytics and planning. Inspector selection remained on Jan 8 while a May 7 chart tooltip displayed independently. No browser errors observed. CSS includes reduced-motion and visible keyboard focus support.

Published through the existing GitHub main -> Netlify workflow; same production URL.
