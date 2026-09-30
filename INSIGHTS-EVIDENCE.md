# Evidence-first Insights

Published to https://clubpulse-ai.netlify.app/ on September 28, 2026. Netlify deploy: `6abb4b06ed9cc51892e3da78`.

The Overview page now leads with an expanded Attendance over time chart, followed by the headcount comparison, meeting history, possible drivers, Ask ClubPulse, and the next-meeting recommendation. Demo starts with “Here’s what happened”; uploaded records use “Your attendance, explained”.

## Attendance graph

The shared `attendanceTrendChart` uses the same normalized meeting records as analytics. It sorts ISO dates chronologically, positions points using actual date spacing, and retains every meeting, including special events and outliers. No extra chart library or fabricated values were added. The chart is 360px high on desktop and 280px on phones. Three date labels avoid overlap.

Each point supports hover, keyboard focus and activation. An inline detail panel shows date, name, attendance and available new/returning counts or special-event status. A labeled meeting selector makes every record accessible even when points overlap on the same date or on a narrow screen. The detail panel is deliberately inline rather than a hover-only floating tooltip.

## Comparison rule

The existing central `compareRecent` function supplies the comparison. For six or more meetings, it compares the latest three meetings with the immediately preceding three, after date sorting. Percentage change is `(recent average - previous average) / abs(previous average) × 100`, using unrounded averages. Date ranges, averages, absolute difference and period counts are visible. If the previous average is zero, percentage change is explicitly undefined.

Demo: previous three average 33.666… (displayed 33.7), latest three average 16; change −17.666… attendees and −52.475…% (displayed 52.5%). Previous dates: June 11–25, 2026. Latest dates: July 2–16, 2026.

One meeting produces no trend. Two through five meetings show an explicitly limited first-to-last headcount description and no strong percentage trend.

## Meeting history

Date and Attendance are always included. Other normalized fields appear only when populated somewhere in the dataset: name, new/returning members, type, time, promotion, promotion timing, reach, signups, special event, notes, topic and anonymous member IDs. Empty cells use a dash; zero and false values are preserved. Names synthesized by the existing importer remain part of the normalized records.

The table initially shows eight meetings and offers “View all N meetings”. Default order is newest first; Date toggles it. Numeric columns align right, the header remains visible within the scroll region, and mobile overflow stays inside the table. Long notes expand in place. Channels display as readable combinations, never serialized JSON.

## Shared components

`dist/insight-evidence.js` contains `attendanceTrendChart`, `attendanceComparison`, `comparisonHTML`, `meetingHistoryTable`, and the `installInsightEvidence` page integration. `historyRows` and `historyColumns` are pure helpers. Both demo and imported workspaces call the same installation path in `dist/usability.js`. Styles are in `dist/calm.css`; demo/tour wording is in `dist/journeys.js`.

## Verification

- 50 tests passed, including seven new evidence tests; 28 JavaScript modules passed syntax/import checks and required production assets passed validation.
- The static project has no separate configured lint or TypeScript command.
- New tests cover all chart points, chronological order, full table records, newest-first order, optional columns, sparse data, one meeting, zero baseline, comparison arithmetic/labels, escaped notes, and common CSV date formats.
- Real layout widths 390, 768, 1280 and 1440 were tested using a local iframe harness. At each size the page scroll width equaled its client width, and all 28 graph points remained present. The table scrolls independently.
- Browser checks verified point details, the meeting selector, table expansion to 28 rows, and date sorting.
- A real Google-exported CSV imported through confirmation to the same graph/table: three points, three table rows and a limited-history explanation.
- Production verified after publishing: 28 demo points, dated headcount comparison, expansion to all 28 rows, and Ask why response.

No data persistence or syncing changes were made. The responsive harness is excluded from the deployment. Physical-device and full screen-reader audits were not performed.
