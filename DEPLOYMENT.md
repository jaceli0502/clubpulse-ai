# Hosting ClubPulse independently

ClubPulse is static HTML, CSS and JavaScript. It has hash routes, browser-only analytics and local file import. No API server, database, secret, scheduled job or host-specific service is required. Google Fonts is optional presentation; spreadsheet parsing is vendored locally. The existing public ChatGPT Site must remain available as a backup.

## Netlify

Netlify is selected because its static deployment supports the complete app and supplies a netlify.app address without buying a domain. Exact names are subject to availability; this document does not claim a name has been reserved. No DNS changes or purchases are necessary.

1. Sign in at https://app.netlify.com if you want the deployment attached to your account and a renameable project. The owner must complete account creation, authentication and any terms acceptance.
2. Open https://app.netlify.com/drop and upload the prepared `clubpulse-netlify.zip`, or select the `site/dist` folder. Upload the compiled public assets, not the full repository or local data.
3. Claim the project if Netlify prompts you. In the project configuration, rename it to `clubpulse-ai` if available, followed by `clubpulseai`, `clubpulse`, or `clubpulse-analytics`. Do not buy a domain.
4. Verify the actual generated URL, open the guided demo, upload the template, and refresh `/#overview` and `/#sheets`. A refresh intentionally clears session data.
5. For later manual releases, upload the new `dist` folder on this project's Deploys page. Do not create a new project for each update.

For Git-connected deployment, use this repository's `netlify.toml`: publish `dist`, build command `node scripts/check-build.mjs`. There are no npm packages to install and no environment variables to set. Hash routing never sends `/dashboard` to the server; the app uses `/#overview`.

Reference: https://docs.netlify.com/deploy/create-deploys/ and https://docs.netlify.com/manage/domains/domains-fundamentals/understand-domains/

## Custom domains

A registered custom domain is separate from the included provider subdomain. The owner does not currently own one. No custom hostname has been invented, purchased or configured, and no DNS changes are part of this delivery. If one is acquired later, either host can be configured after ownership verification.

## Google Sheets status

The shipped workflow is a Sheets-ready XLSX template plus private export/upload. Direct OAuth connection, refresh tokens, Google Picker and live refresh are not implemented or active. There is no fake Connect button and no requirement to publish a spreadsheet publicly. The app accepts Google Sheets' downloaded XLSX or Meetings CSV, normalizes display headers, validates records and reruns the existing analysis pipeline.

A future secure OAuth integration requires an owned Google Cloud project, Sheets API and Picker/Drive API configuration, an OAuth consent screen, approved JavaScript origins and redirect URLs for the verified production host, and any required Google verification. Prefer selection-scoped `drive.file` with Picker, rather than broad Drive access. A server-side implementation would also need encrypted token storage, revocation/disconnect handling, session protection, and server-only secrets. None of those credentials should be added to `dist`. This is a future setup plan, not a claim of functioning sync.

Current environment variables: none. `.env.example` intentionally contains no values or inactive pretend credentials.
