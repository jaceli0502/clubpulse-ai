# ClubPulse repository setup

Application repository: this `site` directory. The parent workspace is a separate repository of local artifacts and must not be uploaded as the application.

GitHub: https://github.com/jaceli0502/clubpulse-ai (private)
Local remote: origin, https://github.com/jaceli0502/clubpulse-ai.git
Default branch: main
Existing production: https://clubpulse-ai.netlify.app/

## Verified September 29, 2026

The GitHub plugin authenticated as jaceli0502. The private repository was created with explicit user approval and verified through the plugin, which reports push and admin access. The application remote was configured; the parent repository was not changed. Application files are stored as a snapshot through the GitHub connector. Existing local Git history and uncommitted work are preserved; the GitHub snapshot has separate commit history.

The dependency-free static app passes `node scripts/check-build.mjs`: 56 tests and syntax/import checks covering 29 JavaScript modules. `netlify.toml` uses this check and publishes `dist`; `.node-version` pins Node 24. No environment variables, package installation, TypeScript check, or separate lint command are required.

## Deployment remains separate

The existing Netlify site was confirmed not linked to Git. Repository creation and uploading source do not deploy it. The prior automatic-review deployment restriction remains unresolved and must be cleared through a supported process before any Netlify connection or alternate deployment attempt. GitHub authorization does not clear that restriction.

The final demo polish is in the local app. No new Netlify site or domain has been requested or created. Preserve the existing production site.
