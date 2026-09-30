# Create the real Google template

The user created the live template and it is now configured and published: https://docs.google.com/spreadsheets/d/1LrZedKCb6SmFKLZONsbBbStwczmKsBqjhBb1kg-hGZA/copy . Public Viewer access and the Google copy screen were verified. No setup remains for this template. The instructions below are retained only for creating a future replacement; deliverables are in ../outputs/google-template/.

1. Open https://script.google.com/home/start and create a project. Replace the default Code.gs contents with **createClubPulseTemplate.gs** from this folder.
2. Save. Select **createClubPulseTemplate**, click **Run**, and review Google's authorization request for your script. The script creates a private spreadsheet; it does not change sharing or send data to another service.
3. Open the spreadsheet URL in the execution log. Share this fictional master using **Anyone with the link → Viewer**. Keep copying enabled. Send me the logged **copyUrl** so I can connect and redeploy ClubPulse.

No Google Cloud OAuth project, deployment of the Apps Script, API key, or Netlify environment variable is needed. This app is static and uses dist/site-config.js. A plain Netlify environment variable would not reach the browser.

Re-running the completed script returns the same spreadsheet without changing its contents. If you intentionally want another master, create a new Apps Script project. If execution fails, the log includes the private file created before the failure; it is not marked as completed.

## Verification after creation

Confirm the title is “ClubPulse AI — Club Meeting Tracker Template”; tabs are Meetings and How to Use ClubPulse; there are three fictional rows and 13 columns. Dropdowns: Meeting Type, Meeting Time, Special Event. Promotion Channels accepts multiple values separated by +. Only Date and Attendance are required. Numeric validation warns rather than blocks. Counts that disagree highlight amber when all three are numbers.

Use a signed-out browser to check that the master is viewable, not editable. Use a separate signed-in account to open /copy, make a private copy, and check both tabs and their dropdowns. Remove or replace example rows in each club's private copy. Direct sync is not implemented; export XLSX or the Meetings tab as CSV, then upload to ClubPulse.

## Maintainer configuration

After the real template exists and public Viewer access is verified, from site run:

    node scripts/configure-google-template.mjs "ACTUAL_GOOGLE_SPREADSHEET_URL"
    node scripts/check-build.mjs

The command accepts an edit or copy URL and writes its canonical /copy URL. It never creates a fake ID or checks sharing on your behalf. Publish dist to the existing clubpulse-ai Netlify project and verify Home → Use Google Sheets → Make a Copy.

Implementation references: [Google SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app), [validation warnings](https://developers.google.com/apps-script/reference/spreadsheet/data-validation-builder), and [range formatting](https://developers.google.com/apps-script/reference/spreadsheet/range). The Apps Script has been syntax-checked locally; Google execution and copy behavior require the account step above.
