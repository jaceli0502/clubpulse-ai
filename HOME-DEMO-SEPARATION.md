# Home and demo separation

Production: https://clubpulse-ai.netlify.app/
Deployment: `6abb4f71000fbe6a7f4aa8ef`, September 28, 2026 at 10:41 PM America/Los_Angeles.

Home now offers two main paths: **Analyze My Club** and **Explore Demo**. Spreadsheet methods no longer compete with Demo. The short product preview remains clearly labeled fictional.

## Import

`#import` opens “Add your meeting history”, with the existing shared CSV/XLSX uploader first. Google Sheets, Excel and CSV templates are secondary helpers under “Need a template?”. `#sheets` retains the real Google copy URL and its direct completed-sheet uploader. Manual entry remains under `#data`. Existing user records are preserved while choosing templates or exploring Demo.

## Demo

`#demo` introduces the actual 28-meeting fictional dataset. Start Analysis and Skip to Full Demo both open the complete nonblocking narrative:

1. First, what happened? — the shared attendance chart and dated headcount comparison.
2. What meetings caused that change? — the same history table, with the latest three meetings highlighted.
3. What changed? — promotion and returning-member findings with comparison context.
4. Ask ClubPulse — a supplied “Why did attendance fall?” action and structured answer, including expanded tools/limitations.
5. What should the club try next? — the existing recommendation and planner, preselecting the best supported meeting format in Demo.

Every Demo screen identifies “Demo Workspace / Fictional sample data” and offers “Analyze My Own Club”. No tour overlays or coach marks are installed. The end-of-demo conversion links to real import, with Restart Demo as a secondary action.

## Isolation and routes

`dist/workspaces.js` explicitly tracks `user` and `demo`. Each context holds separate records, import quality, source/update metadata, report history, analytics/model caches and filter state. Switching modes stores the current context and restores the other; demo initialization never assigns sample rows to the user workspace. Asynchronous Ask requests capture their own input records before yielding.

- User: `#home`, `#import`, `#sheets`, `#data`, `#overview`, `#predict`.
- Demo: `#demo`, `#demo/overview`, `#demo/predict`, plus scoped deeper-analysis/method routes.
- Exit Demo: `#import`; any previous user data remains available through “Return to your insights”.
- Refreshing a demo route reconstructs clearly labeled fictional data. Refreshing an unscoped user analysis route never loads Demo implicitly.
- User records remain in-memory for the current tab, as before. Refreshing or closing the tab clears them; export is still needed for keeping records. Mode switching itself does not clear them.

Shared components remain AttendanceTrendChart, AttendanceComparison, MeetingHistoryTable, driver findings, Ask ClubPulse, the importer and Next Meeting planner. Demo adds context and narrative labels to the same components.

## Verification

- 55 tests pass; 29 JavaScript modules and required assets pass production checks. No separate lint or TypeScript command is configured for this static project.
- New tests cover workspace restoration, independent metadata/report state, empty-user preservation, explicit refresh routes, Home paths and actual demo record count.
- Local browser: imported a real Google-exported CSV with three records, entered the 28-record demo, ran Ask and forecast, exited, and confirmed the original three records and CSV source were restored with no demo banner.
- Local deep-link refresh: `#demo/predict` rebuilt the labeled demo; exiting reached an empty user import workspace, with no sample rows transferred.
- Google Sheets helper retained the correct real `/copy` URL and completed-sheet upload button. CSV and XLSX validation remain covered by automated regression tests.
- Home, Import and Demo intro checked at 390, 768, 1280 and 1440px: no document overflow. Mobile narrative also checked at 390px. No physical-device audit was performed.
- Public release verified: two Home actions, narrative demo route, 28 chart points, no tutorial overlay, planner with Interactive Activity selected, forecast result, and clean exit to import.

Major changes: `dist/app.js`, `dist/workspaces.js`, `dist/journeys.js`, `dist/usability.js`, `dist/calm.js`, `dist/calm.css`, `dist/insight-evidence.js`, and regression tests. Screenshot: `../outputs/design/home-two-paths-live.png`.
