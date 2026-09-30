# ClubPulse repository and deployment

Application repository: this site directory. The parent workspace holds local artifacts and must not be uploaded as the app.

- GitHub: https://github.com/jaceli0502/clubpulse-ai (private), main
- Production: https://clubpulse-ai.netlify.app/
- Existing Netlify project ID: 3c239542-f7b7-4505-9956-cfb3b598eeae
- Build command: node scripts/check-build.mjs
- Publish directory: dist
- Runtime: Node 24, pinned by .node-version

The existing Netlify project was linked to GitHub on September 29, 2026. Its deployment of c413baf819095077803bc5716d0e68dcc839854a succeeded. Main now deploys automatically. Earlier notes about an unlinked repository or unresolved publication block are historical; the same browser approval path subsequently allowed linking and deployment after explicit user authorization.

The app is dependency-free browser JavaScript. The production check runs regression tests, JavaScript syntax checks, local import validation, and required-asset checks. There is no package.json, separate lint command, or TypeScript configuration. No environment variables are required.

GitHub was initialized through the connector with a complete application snapshot. Existing local Git history and uncommitted work remain preserved, so local and remote histories differ. Do not reset or force-push to reconcile them. Connector updates must build on the current remote commit and update main without force. Only site/ has origin configured; the parent repository is separate.
