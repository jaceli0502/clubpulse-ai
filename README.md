# ClubPulse AI

The existing static HTML/CSS/ES-module application and Import / Demo home were preserved. No framework, backend, external AI service, database, or account system was added.

## September UX and data upgrade

Home offers Analyze My Club and Explore Demo. The import page offers direct meeting entry first, followed by spreadsheet upload and templates. Both paths open the same editable, automatically saved meeting table. Demo is one continuous walkthrough with an inline planner and an isolated sample workspace; leaving Demo restores the user's own data. Google Sheets uses export/upload, not live OAuth sync. CSV and XLSX files share validation and analytics. The XLSX template contains exactly two tabs: Meetings and How to Use ClubPulse. See GOOGLE-SHEETS-SETUP.md.

Template fields: required date and attendance; recommended new_members, returning_members, meeting_type, topic, meeting_time, promotion_channels; optional instagram_reach, days_promoted_before, signups_before_meeting, special_event, notes. Replace all three fictional example rows. Count discrepancies warn without rewriting the submitted values.

Coverage shows which analyses have sufficient usable fields. Highlights and demo explanations use calculated values. Returning-attendee share, promotion lead time, recent formats and signup ratios now inform the analyst. Returning share is not cohort retention; correlations are not causal claims.

See DEPLOYMENT.md for the free Netlify subdomain path, production configuration and inactive OAuth setup requirements. The current app needs no environment variables. No custom domain has been purchased.

## Features

- Progressive CSV import needs only date and attendance. Preview reports duplicate exclusions, invalid dates/counts, optional-field issues and normalized categories. Optional missing values remain null.
- Automatic cached analysis after import, add and removal: statistics, recent trends, rolling averages, format/timing/promotion comparisons, reach correlations and ratios, retention, anomaly flags, forecast eligibility and recommendations.
- Ask ClubPulse has suggested questions, bounded intent routing, calculated evidence, confidence, caveats and an expandable tool trace.
- Meeting Pulse compares the latest meeting with earlier dates only. The UI labels this a historical baseline, not a saved forecast.
- Club health explains the thresholds behind each label. Reports can be downloaded on demand; the pure report service accepts a previous report for change detection and future scheduler integration.
- Deterministic 28-meeting fictional demo includes an attendance anomaly and consistent pseudonymous attendance lists.

## Architecture and files

- `dist/app.js`, `index.html`, `styles.css`: existing frontend, escaped rendering, forms, chart, progressive disclosures and session state.
- `dist/analytics.js`: backward-compatible analytics facade.
- `dist/analytics/data-quality.js`: validation, aliases, normalization and CSV parsing.
- `attendance.js`, `promotion.js`, `retention.js`, `health.js`: deterministic specialist calculations.
- `forecasting.js`: ridge model, chronological backtest, recent-five baseline, empirical planning range and model contrasts.
- `pipeline.js`: automatic tool pipeline; `report.js`: on-demand report service; `config.js`: centralized guardrails; `stats.js`: numerical helpers; `demo.js`: sample data.
- `dist/agents/club-pulse-analyst.js`: coordinator and evidence-based answer synthesis; `intent-router.js`: allowlisted plans; `tool-registry.js`: validated dataset contexts, parameters and per-run cache; `strategy-analyst.js`: grounded experiments.
- `tests/analytics.test.mjs`: dependency-free Node regression suite; `test.mjs`: compatibility entry point.

## Actual AI behavior

No LLM is configured. A local keyword router chooses allowlisted analyses. All numbers, comparisons, recommendations and answer text come from deterministic functions. An optional injected planner interface may select only an approved intent and period; it receives aggregate metadata, not raw records or IDs. Invalid responses, timeout and provider failure fall back to local routing. No API key belongs in the frontend.

There are 20 registered tools: dataset validation/summary; attendance metrics/trend/recent comparison; format/timing/promotion comparison; social reach; engagement ratios; retention; anomaly detection; forecast; Meeting Pulse; health; recommendations. Tool outputs are structured objects; unrecognized tool names and parameters are rejected.

## Data requirements

Required CSV columns: `date` (YYYY-MM-DD), `attendance` (nonnegative integer). Optional: `name`, `type`, `time`, `promotion`, `reach`, `signups`, `members`, `new_members`, `returning_members`. Aliases include `meeting_type`, `meeting_time`, `promotion_channels`, `instagram_reach`, `social_reach`, `member_ids`, `meeting_name`.

Type/time/promotion unlock comparisons; reach enables relationships and aggregate ratios; signups enable signup/reach ratios. Consistent semicolon-separated anonymous member IDs, matching attendance at every meeting, enable true retention. Aggregate member counts cannot establish cohort retention. Files are capped at 3 MB / 2,000 records. Extra columns are ignored, not passed to the analyst.

## Forecast and confidence limits

Forecasting requires 12 meetings and at least four chronological test cases with eight strictly earlier-date training meetings. It compares ridge regression with a recent-five-meeting average, using the simpler baseline on ties or absent predictors. Unknown categories fall back to the baseline with Low confidence. More than 20 levels in any categorical field disables ridge fitting. Optional reach uses training-fold median imputation and a missingness indicator.

The planning range uses the 80th percentile of historical absolute error; it is not a calibrated confidence interval. Method selection and error reporting reuse the small backtest. Model feature contrasts are associations, not causal drivers. No p-values or accuracy percentage are claimed. Category recommendations need two groups with at least three meetings each and five meetings overall. Correlations need ten complete pairs. Confidence is capped at Moderate and reports sample-size/missing-data limitations.

## Running and validation

From this `site` directory, with Node.js installed:

```sh
node server.mjs
node scripts/check-build.mjs
node --check dist/app.js
```

Open http://127.0.0.1:4173. There are no npm dependencies or required environment variables. Production is the existing https://clubpulse-ai.netlify.app/ site. `netlify.toml` runs the production checks and publishes `dist`; `.node-version` pins Node 24. GitHub main is connected to the existing Netlify site for continuous deployment.

The regression suite covers CSV parsing, aliases, missing fields, invalid values, duplicate removal, cohort eligibility, zero denominators, anomalous attendance, chronological forecast restrictions, baseline fallbacks, Meeting Pulse, health thresholds, router/tool restrictions, provider fallback, sparse-data honesty and report changes. Browser checks and publication status are reported in the delivery message.

## Remaining limitations

Your meeting records and unfinished drafts are saved in this browser on this device. Clearing browser storage removes them; export a CSV for a backup. Data is not synchronized between devices. There is no real weekly scheduler, email delivery, server persistence, configured LLM or saved pre-meeting prediction workflow. The report and Meeting Pulse modules expose integration boundaries for those future capabilities. The English intent router supports a bounded set of analytics questions. No sensitive profiling or person-level recommendations are produced. Charts and comparisons are descriptive and cannot establish causes. Promotion combinations are compared as recorded strategies, not isolated channel effects. Use reach measured before the meeting; the app cannot verify when a supplied value was measured.


Built with substantial OpenAI Codex assistance. This implementation uses browser JavaScript, not Python/Streamlit. Demo data is fictional and is not evidence of measured real-club impact.
