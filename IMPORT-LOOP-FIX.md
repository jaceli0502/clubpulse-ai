# Google Sheets import-loop fix

Published at https://clubpulse-ai.netlify.app/#sheets in Netlify deploy 6aba1146bb2c68ad69e79cab.

The old completed-sheet Upload link navigated to #import. That page offered Google Sheets again, sending people back to the template workflow rather than making the upload action obvious.

Step 3 now embeds a native file-picker button. dist/uploader.js owns the upload markup, selection handler, validation preview and error recovery for both the Sheets page and the generic data/import pages. It calls the unchanged importFile pipeline from importers.js; there is no second parser. Import success uses one shared workspace-update callback in app.js.

Routes: #sheets handles template instructions, file selection and the Your data is ready confirmation. Only the confirmation button commits the dataset and navigates to #overview (Insights). Generic #import and #data use the same uploader. The configured public /copy link is preserved. This remains export/upload, not OAuth or sync.

Google exports the template's CSV dates as M/D/YYYY. Added explicit month/day/year normalization alongside ISO dates and validation that rejects invalid calendar dates; no locale guessing or Date.parse shortcuts for slash dates.

Verification: 43 tests pass and 27 modules pass syntax/import checks. Regression checks cover embedded uploader/no #import link, friendly missing-column errors, Google CSV dates and invalid-date rejection. Browser-tested actual public Google-template XLSX and CSV exports: native picker → Your data is ready on #sheets → #overview. Tested missing-column CSV error and template help. Production XLSX upload and confirmation to Insights passed. No student records were used or changed; fixtures contain three fictional examples. Existing Google copy screen and Viewer access were verified in the preceding release.

Mobile limitation: requested 390px viewport override did not apply (the browser remained 1280px). Desktop layout and picker were verified; a real mobile-device test was not completed in this pass. Override reset afterward.
