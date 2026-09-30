# UX clarity upgrade

## Architecture audit
The existing app uses plain HTML/CSS and ES modules, hash routing, and in-memory rows with cached analytics. Main views remain Home, Your Data, Insights and Next Meeting (technical route #predict). CSV and XLSX share normalization and validation. XLSX parsing is vendored SheetJS. Google OAuth, direct sync, backend functions, databases and external AI calls are absent. Only optional tour completion is stored in localStorage. Files and entered records stay in the current tab; refresh clears them. Netlify serves dist without a bundle step.

The 28-meeting demo uses the same pipeline as user data. The local analyst selects allowlisted calculations; answers show calculated signals and tool labels, not hidden reasoning. Retention requires complete anonymous attendance and follow-up. Aggregate counts measure returning share. Forecasting retains chronological backtesting, ridge-vs-recent-average selection, sample requirements and an empirical planning range. Confidence remains capped at Moderate.

## Changes
- Clearer home choices, prominent Demo Workspace/Use My Own Data, source and last-updated metadata.
- Your Data offers Sheets, Excel and CSV cards. Export moves under More.
- Shared manual/modal meeting fields, multi-channel promotion, numeric lead time, inline count warnings, advanced IDs collapsed. No duplicated Name and Topic inputs.
- Ordered 13-column templates, three fictional examples, typed dates/counts, dropdowns, frozen headers and required-column colors. Meetings, How to Use ClubPulse and optional Members tabs retained.
- Validated GOOGLE_SHEETS_TEMPLATE_URL configuration and truthful unconfigured fallback. See GOOGLE-SHEETS-SETUP.md.
- First Insights section shows computed changes; one action opens the analyst. Answers separate signals, recommendations, confidence and analyses used. Category comparisons state sample sizes and sparse-data warnings.
- Next Meeting includes name/date, multiple channels and lead-time context. Name/date and lead time are explicitly distinguished from numeric model inputs. Output shows expected turnout, range, historical comparisons and confidence.
- Four-step optional tour and simpler How ClubPulse works explanation.

## Verification
35 Node tests pass, including schema, parser, Excel, configuration, count warnings, channel normalization, coverage, demo and forecast regressions. All 25 JavaScript modules pass syntax and local import checks. The static production check validates required assets. No TypeScript compiler or separate lint configuration exists; no claim of running those tools is made.

Browser checks: guided demo and investigation; normal and sparse planning; switching out of demo; manual entry with two promotion channels and inconsistent member counts; mobile 390px data/Sheets/import/Insights screens without horizontal overflow; template download and actual XLSX upload; source label and import coverage. No application console errors observed.

## Limits
No configured native Google copy template or OAuth sync. The owner must publish only the fictional template and set its URL. No external LLM is active. In-memory data resets on refresh. Planning date/name are notes; lead time supplies context but does not change the forecast model. This release targets the existing public Netlify project; the older ChatGPT Site remains an unchanged backup.
