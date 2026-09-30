# ClubPulse analytics upgrade

The existing static HTML/CSS/ES-module application and Import / Demo home were preserved. No framework, backend, external AI service, database, or account system was added.

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

There are 16 registered tools: dataset validation/summary; attendance metrics/trend/recent comparison; format/timing/promotion comparison; social reach; engagement ratios; retention; anomaly detection; forecast; Meeting Pulse; health; recommendations. Tool outputs are structured objects; unrecognized tool names and parameters are rejected.

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
node --test tests/analytics.test.mjs
node --check dist/app.js
```

Open http://127.0.0.1:4173. There are no npm dependencies, build step, or required environment variables. Deploy `dist` as static assets through the existing Sites manifest.

The regression suite covers CSV parsing, aliases, missing fields, invalid values, duplicate removal, cohort eligibility, zero denominators, anomalous attendance, chronological forecast restrictions, baseline fallbacks, Meeting Pulse, health thresholds, router/tool restrictions, provider fallback, sparse-data honesty and report changes. Browser checks and publication status are reported in the delivery message.

## Remaining limitations

Data lives in the current tab's memory. Refreshing loses it; export a CSV to retain records. There is no real weekly scheduler, email delivery, server persistence, configured LLM or saved pre-meeting prediction workflow. The report and Meeting Pulse modules expose integration boundaries for those future capabilities. The English intent router supports a bounded set of analytics questions. No sensitive profiling or person-level recommendations are produced. Charts and comparisons are descriptive and cannot establish causes. Promotion combinations are compared as recorded strategies, not isolated channel effects. Use reach measured before the meeting; the app cannot verify when a supplied value was measured.
