# ClubPulse product refinement report

## Product architecture
Home → Your Data → Insights → Next Meeting. The existing static browser application, canonical meeting schema and deterministic analytics remain in place. Demo uses its own workspace. No accounts, backend, calendar, external AI service or new hosting project were introduced.

## Home
Shorter positioning copy connects meeting history to trends, explanations and a better next meeting. Analyze My Club is the main button; Explore Demo is a lighter text action. Entry navigation now shows those two choices instead of workspace utilities. The preview uses calculated fictional attendance and a supported next format, not invented metrics or a generic dashboard image.

## Your Data and import
Manual and imported records continue to use one editable meeting history. Add meeting and Import spreadsheet are grouped above the table; See My Insights is the next action below it. Desktop labels are less repetitive while retaining accessible input names. Optional fields remain expandable. Tablet and phone layouts use meeting blocks so dates and controls stay readable. Only Date and Attendance are required. Changes save on this device, with deletion undo retained. CSV and Excel previews, validation, and the Google Sheets copy/download/upload flow are preserved. Imports still explicitly replace the current workspace; merging files is not implemented.

## Demo
#demo is the concise introduction; #demo/overview is the continuous case study. Older trend/full links resolve to the analysis. The fictional-data banner and exit remain visible. The story connects attendance, meeting history, possible drivers, a recommended move and an inline planner. Supporting reports and deeper details follow the planner. No alternate guided/full modes or progression state were added.

## Insights
Real-club Insights now leads with the main attendance finding, followed by the full chronological graph and independent meeting inspector. Period comparisons retain actual averages, dates, sample sizes and qualified percentages. Limited-history wording remains visible. History is newest first with optional columns only when populated; all records remain accessible through expansion. Driver summaries show calculated before/after reach and returning-attendee share, with a three-versus-three period explanation. They explicitly avoid causal claims.

## Recommendation and Ask ClubPulse
The recommendation remains the main action, supported by historical averages, group size and difference from club average. Its copy proposes a controlled next experiment. Forecasts support the plan rather than replacing the recommendation. Ask ClubPulse uses three suggested questions, structured signals, evidence strength and expandable limitations. It remains a local deterministic analytics surface, not a conversational chatbot. Answers do not invent values.

## Next Meeting
One shared planner renders both real and demo experiences. Desktop places choices beside feedback; smaller screens stack them. The plan format and historical evidence precede the turnout range. Feedback updates when choices change. Applying a recommendation changes only the supported format, preserving time, promotion, reach, name and date. Users can explicitly save a plan on this device even before enough history exists for a forecast. Saved choices survive reload; demo practice plans remain in tab memory and never write the user's plan. Saving does not create a meeting or save a historical prediction for later scoring.

## Design system and simplification
Evergreen #183D32 anchors actions; #F7F8F5 page, white surface and #F0F3EF soft surface create restrained grouping. DM Sans and Manrope remain the two fonts. Existing semantic colors, 10/14/18/22px radii, tabular numbers and spacing tokens are reused. Primary buttons are filled, secondary buttons neutral and tertiary actions text. Inputs have 14px radii and visible focus. Shared product rules normalize navigation, editor, evidence, planner and mobile behavior. Reduced-motion preferences disable animation and transitions. Removed/de-emphasized: Home utility menu, duplicate desktop field labels, technical source timestamps, two suggested questions, exposed forecast machinery and unnecessary driver/chart borders. No numerical card-reduction percentage is claimed.

## Shared components
- planner.js: shared demo/user plan controls, evidence, turnout and save behavior; replaces the large inline planner renderer.
- plan-store.js: validated allowlisted plan choices and storage error handling; independent of meeting storage.
- driver-evidence.js: calculated period signals and shared presentation.
- product.css: common product surfaces and responsive refinements using existing semantic tokens.
- Existing meeting editor, importer, chart, inspector, recommendation, workspace isolation and analytics modules are reused.

## Tests and browser checks
Production check: 76 tests passed, 0 failed; 37 JavaScript modules passed syntax/import checks. No standalone lint configuration or TypeScript/typecheck setup exists in this JavaScript project, so those checks were not claimed. New tests cover saved-plan roundtrips, bounded fields, storage failure, recommendation preservation, missing/entered reach and computed driver values.

Browser checks used local synthetic data: create, edit, incomplete-row validation, delete/undo, reload persistence, CSV import, Excel import, missing-column error, real-data findings, structured Ask output, chart tap/Escape, independent inspector selection, recommendation prefill, plan save/reload and demo isolation. Fresh-session demo rendering produced no console errors. Desktop/phone screenshots and layout bounds were inspected at 1440, 1280, 1024, 768 and 390px. Home, data editor, demo chart/inspector and planner were covered across these widths; phone intro, import, Sheets, drivers and recommendation were also inspected. Tablet date clipping and extra phone navigation wrapping were corrected. No page-level horizontal overflow remained in the checked views; wide history tables retain their intentional inner scroll.

## Remaining weaknesses
Data and saved plans are local to one browser/device; clearing storage removes them. There is no cloud sync, plan history, automatic forecast-versus-outcome comparison or external LLM. Spreadsheet import replaces rather than merges records. Dense optional meeting history still needs horizontal scrolling on phones. Accessibility was reviewed through labels, focus, keyboard interactions and responsive layout, not a formal third-party WCAG audit. Legacy styles remain beneath the shared refinement layer; a full stylesheet rewrite was deliberately avoided to protect existing behavior.

## Deployment
Prepared for one update through the existing GitHub main → Netlify workflow at https://clubpulse-ai.netlify.app/. No deployment configuration, domain or repository connection was changed. Publication is verified separately in the delivery message.
