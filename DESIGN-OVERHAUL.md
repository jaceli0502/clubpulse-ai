# ClubPulse visual overhaul — September 28, 2026

Published at https://clubpulse-ai.netlify.app/ (Netlify deploy `6abb44de30ac8a63f62a9336`).

## Design system

Central semantic tokens in `dist/calm.css` define a warm #F7F8F5 canvas, evergreen #183D32 actions, near-black #18251F text, and readable gray-green #5B6C63 secondary text. Existing DM Sans and Manrope remain the only two font families. The spacing scale runs from 4 to 48 pixels; content uses restrained 6/12/16-pixel radii and minimal shadows. Main content is capped at 1280 pixels. Legacy theme variables bridge to the semantic tokens.

## Main changes

- Home: editorial split hero, clear Google Sheets/upload/demo hierarchy, and a lightweight product preview calculated from the actual fictional demo dataset.
- Navigation: quiet numbered workflow, active underline, compact mobile layout.
- Your Data and Sheets: unboxed source choices, vertical three-step instructions, unchanged real Google template copy link, shared upload component with drag feedback and a filename/meeting-count readiness state.
- Insights: three prominent findings in a cohesive surface; secondary statistics and deeper analysis remain progressively disclosed.
- Ask ClubPulse: integrated question field, suggestions beneath it, numbered evidence and restrained recommendation sections.
- Next Meeting: desktop two-column configuration/result layout, mobile stacking, selected channel chips, and clearer forecast hierarchy.
- Manual entry: required/core fields first; other details and advanced retention fields remain available in disclosures.

## Charts, motion and accessibility

Charts use token-based evergreen primary lines, restrained comparison color, faint grids and low-opacity area fill. No chart or animation dependency was added. CSS transitions are brief; reduced-motion preferences disable nonessential animation and smooth scrolling. Inputs retain labels, native checkbox keyboard behavior and visible focus rings. Mobile controls have comfortable touch sizing.

Core palette contrast calculations: body on canvas 14.89:1; muted text on canvas 5.23:1; primary button white on evergreen 11.98:1; danger on white 6.67:1; warning on white 6.55:1; muted on soft brand surface 4.81:1. A low-contrast planner eyebrow discovered during visual review was corrected. These are palette checks, not a full accessibility certification.

## Verification

- All 43 regression tests pass; production checker validates 27 JavaScript modules and required assets. This static project has no separate configured TypeScript or lint command.
- All eight main routes checked at iframe viewport widths 390, 768, 1280 and 1440 pixels; document scroll width matched client width at every size. The browser used a 15-pixel vertical scrollbar. This tests real layout widths, not physical devices.
- Desktop and mobile Home, Insights/Ask, and planner reviewed visually.
- Real Google-exported XLSX imported locally through the new readiness screen and confirmation to Insights. CSV and XLSX parsing, required-column errors, template configuration, forecasts and demo calculations also covered by existing automated tests.
- Production: new Home, guided demo, 28-meeting Insights, Ask why, forecast calculation, navigation and manual entry verified. A test entry increased the temporary demo workspace to 29 meetings; no external club data was changed.
- Template copy URL preserved. Google copying was verified in the previous release; no additional copy created in this pass.
- Tour dismissal continues to work. Meeting data remains tab-local and clears on refresh; export remains necessary to keep records.

## Major files

`dist/calm.css`, `dist/styles.css`, `dist/journeys.js`, `dist/app.js`, `dist/index.html`, `dist/calm.js`, `dist/uploader.js`, `dist/usability.js`.

## Remaining limitations

- Legacy structural CSS remains beneath the centralized theme; some secondary one-off styles could be consolidated further.
- Chart tooltips retain native browser styling. No bespoke tooltip system was introduced.
- Drag/drop handlers share the tested importer but were not tested with a physical OS file drag in this environment.
- No full screen-reader or physical-device audit was performed.
- Google Sheets still uses download/upload, not automatic syncing. These existing product limits are clearly stated in the interface.

Before/after screenshots are in the workspace's `outputs/design` folder. The temporary responsive harness is kept under `tests/qa-design.html` and excluded from deployment.
