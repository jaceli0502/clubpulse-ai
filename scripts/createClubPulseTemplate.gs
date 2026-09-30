const CLUBPULSE_TEMPLATE_DATA = {
  "fields": [
    [
      "date",
      "Date",
      "Required",
      "When the meeting happened. Use YYYY-MM-DD."
    ],
    [
      "meeting_name",
      "Meeting Name",
      "Recommended",
      "What the meeting was about. For example: NBA Draft Debate."
    ],
    [
      "attendance",
      "Attendance",
      "Required",
      "Total people attending, including new and returning members."
    ],
    [
      "new_members",
      "New Members",
      "Recommended",
      "People attending for the first time, if tracked."
    ],
    [
      "returning_members",
      "Returning Members",
      "Recommended",
      "People who have attended before. New + returning should equal attendance."
    ],
    [
      "meeting_type",
      "Meeting Type",
      "Recommended",
      "The format: Workshop, Presentation, Discussion, Interactive Activity, Competition, Guest Speaker, Social or Other."
    ],
    [
      "meeting_time",
      "Meeting Time",
      "Recommended",
      "Before School, Lunch, After School, Evening or Other."
    ],
    [
      "promotion_channels",
      "Promotion Channels",
      "Recommended",
      "Combine channels with +, for example Instagram + Posters."
    ],
    [
      "days_promoted_before",
      "Promotion Started Days Before",
      "Optional",
      "How many days before the meeting promotion started."
    ],
    [
      "instagram_reach",
      "Instagram Reach Before Meeting",
      "Optional",
      "Accounts reached by promotion before the meeting. Other social platforms are fine too."
    ],
    [
      "signups_before_meeting",
      "Signups Before Meeting",
      "Optional",
      "People who signed up or expressed interest beforehand."
    ],
    [
      "special_event",
      "Special Event",
      "Optional",
      "Yes or No, for a club fair, tournament or special speaker."
    ],
    [
      "notes",
      "Notes",
      "Optional",
      "Context that could affect turnout. Avoid personal student information."
    ]
  ],
  "examples": [
    [
      "2026-09-03",
      "NBA Player Debate",
      28,
      10,
      18,
      "Interactive Activity",
      "Lunch",
      "Instagram + Classroom Announcement",
      4,
      450,
      17,
      "No",
      "Example row - delete before using"
    ],
    [
      "2026-09-10",
      "Introduction to Sports Analytics",
      24,
      6,
      18,
      "Presentation",
      "Lunch",
      "Instagram",
      2,
      310,
      11,
      "No",
      "Example row - delete before using"
    ],
    [
      "2026-09-17",
      "Prediction Challenge",
      35,
      12,
      23,
      "Competition",
      "Lunch",
      "Instagram + Posters + Classroom Announcement",
      5,
      620,
      25,
      "Yes",
      "Example row - delete before using"
    ]
  ],
  "types": [
    "Presentation",
    "Discussion",
    "Interactive Activity",
    "Workshop",
    "Competition",
    "Guest Speaker",
    "Social",
    "Other"
  ],
  "times": [
    "Before School",
    "Lunch",
    "After School",
    "Evening",
    "Other"
  ],
  "instructions": [
    [
      "How to Use ClubPulse",
      ""
    ],
    [
      "You only need two things to start",
      "Date: when the meeting happened. Attendance: how many people attended."
    ],
    [
      "Start simply",
      "That is enough to start seeing attendance trends as you record more meetings. Leave unknown optional fields blank; zero means a measured zero."
    ],
    [
      "Replace the fictional examples",
      "Meetings rows 2–4 are examples. Replace or delete them before analyzing your club."
    ],
    [
      "Header colors",
      "Dark green = Required (Date, Attendance). Pale green = Recommended. Light gray = Optional."
    ],
    [
      "Want better insights?",
      "Adding a few optional details helps ClubPulse understand what may be affecting attendance. Patterns do not prove causes."
    ],
    [
      "Meeting Type",
      "Compare which kinds of meetings tend to attract more people."
    ],
    [
      "New Members + Returning Members",
      "See new and returning turnout. If both counts are known, they should add up to Attendance. Amber cells flag a mismatch; your numbers are never changed."
    ],
    [
      "Promotion Channels",
      "Separate multiple channels with +. Example: Instagram + Classroom Announcement. No single-selection dropdown is used."
    ],
    [
      "Channel suggestions",
      "Instagram, Classroom Announcement, Posters, Discord, Remind, Email, Word of Mouth, Club Rush, Other. Compare how promotion methods relate to turnout."
    ],
    [
      "Promotion Started Days Before",
      "Enter the number of days before the meeting, such as 4. Compare whether earlier promotion is associated with stronger attendance."
    ],
    [
      "Instagram Reach Before Meeting",
      "Reach shown in Instagram Insights before the meeting. Compare promotion exposure with actual attendance."
    ],
    [
      "Signups Before Meeting",
      "People who signed up or expressed interest before the meeting. Compare advance interest with attendance."
    ],
    [
      "After each meeting",
      "1. Add one new row.\n2. Fill in what you know.\n3. Leave untracked optional fields blank.\n4. Bring the updated Sheet into ClubPulse.\n5. See what changed."
    ],
    [
      "Bring it into ClubPulse",
      "Google Sheets → File → Download → Microsoft Excel (.xlsx). Upload at https://clubpulse-ai.netlify.app/#import. For CSV, download the Meetings tab only."
    ],
    [
      "Keep your copy private",
      "Share your own copy only with trusted officers. Use aggregate counts: do not enter student names, emails, phone numbers, student IDs, addresses, grades, profiles or sensitive personal information."
    ],
    [
      "Keep your spreadsheet",
      "Your spreadsheet is the source of truth. ClubPulse uses export and upload, not automatic Google syncing. Refreshing ClubPulse clears the data in that tab."
    ],
    [
      "Prepared entry rows",
      "Formatting, dropdowns and checks cover rows 2–1001. For more rows, copy a blank prepared row including formatting and validation."
    ],
    [
      "Field",
      "Meaning and importance"
    ],
    [
      "Date (Required)",
      "When the meeting happened. Use YYYY-MM-DD."
    ],
    [
      "Meeting Name (Recommended)",
      "What the meeting was about. For example: NBA Draft Debate."
    ],
    [
      "Attendance (Required)",
      "Total people attending, including new and returning members."
    ],
    [
      "New Members (Recommended)",
      "People attending for the first time, if tracked."
    ],
    [
      "Returning Members (Recommended)",
      "People who have attended before. New + returning should equal attendance."
    ],
    [
      "Meeting Type (Recommended)",
      "The format: Workshop, Presentation, Discussion, Interactive Activity, Competition, Guest Speaker, Social or Other."
    ],
    [
      "Meeting Time (Recommended)",
      "Before School, Lunch, After School, Evening or Other."
    ],
    [
      "Promotion Channels (Recommended)",
      "Combine channels with +, for example Instagram + Posters."
    ],
    [
      "Promotion Started Days Before (Optional)",
      "How many days before the meeting promotion started."
    ],
    [
      "Instagram Reach Before Meeting (Optional)",
      "Accounts reached by promotion before the meeting. Other social platforms are fine too."
    ],
    [
      "Signups Before Meeting (Optional)",
      "People who signed up or expressed interest beforehand."
    ],
    [
      "Special Event (Optional)",
      "Yes or No, for a club fair, tournament or special speaker."
    ],
    [
      "Notes (Optional)",
      "Context that could affect turnout. Avoid personal student information."
    ]
  ],
  "widths": [
    15,
    32,
    14,
    15,
    18,
    24,
    20,
    42,
    25,
    28,
    24,
    17,
    35
  ],
  "mismatch": "IF(AND(ISNUMBER($C2),ISNUMBER($D2),ISNUMBER($E2)),$D2+$E2<>$C2,FALSE)"
};
/**
 * Run createClubPulseTemplate once in a standalone Google Apps Script project.
 * Uses SpreadsheetApp only (no external services or Drive sharing changes).
 * The resulting workbook starts private. Share the FICTIONAL template as Viewer.
 * Re-running returns the completed template instead of overwriting entered data.
 */
function createClubPulseTemplate() {
  const lock = LockService.getUserLock();
  lock.waitLock(30000);
  try {
    const props = PropertiesService.getUserProperties();
    const existing = props.getProperty('CLUBPULSE_TEMPLATE_ID');
    if (existing) {
      const saved = SpreadsheetApp.openById(existing);
      return logClubPulseLinks_(saved);
    }
    const book = SpreadsheetApp.create('ClubPulse AI — Club Meeting Tracker Template', 1001, 13);
    console.log('New private spreadsheet: ' + book.getUrl());
    book.setSpreadsheetLocale('en_US');
    book.setSpreadsheetTimeZone('America/Los_Angeles');
    const meetings = book.getSheets()[0].setName('Meetings');
    const guide = book.insertSheet('How to Use ClubPulse');
    const data = CLUBPULSE_TEMPLATE_DATA;
    const area = meetings.getRange('A1:M1001');
    area.setFontFamily('Arial').setFontSize(11).setFontColor('#213D33').setVerticalAlignment('middle');
    meetings.setHiddenGridlines(true).setFrozenRows(1).setFrozenColumns(1).setTabColor('#244E3D');
    meetings.setRowHeights(1, 1001, 26);
    meetings.getRange('A1:M1').setValues([data.fields.map(f => f[1])]);
    // Use numeric date serials to avoid browser/script timezone date shifts.
    const rows = data.examples.map(row => row.map((value, i) =>
      i === 0 ? (Date.parse(value + 'T00:00:00Z') - Date.UTC(1899, 11, 30)) / 86400000 : value));
    meetings.getRange('A2:M4').setValues(rows);
    area.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY)
      .setHeaderRowColor('#EEF1EF').setFirstRowColor('#FFFFFF').setSecondRowColor('#F3F6F4');
    meetings.getRange('A1:M1').setFontWeight('bold').setWrap(true).setHorizontalAlignment('center');
    meetings.setRowHeight(1, 58);
    data.fields.forEach((field, index) => {
      const header = meetings.getRange(1, index + 1);
      const required = field[2] === 'Required';
      header.setBackground(required ? '#244E3D' : field[2] === 'Recommended' ? '#DDE9E2' : '#EEF1EF');
      header.setFontColor(required ? '#FFFFFF' : '#213D33');
      header.setNote(field[2] + '. ' + field[3]);
      meetings.setColumnWidth(index + 1, Math.round(data.widths[index] * 7 + 5));
    });
    meetings.getRange('A2:M4').setWrap(true);
    meetings.setRowHeights(2, 3, 66);
    meetings.getRange('A2:A1001').setNumberFormat('m/d/yyyy');
    ['C2:E1001','I2:K1001'].forEach(range => meetings.getRange(range).setNumberFormat('0'));
    meetings.getRange('A1:M1001').createFilter();
    [['F',data.types],['G',data.times],['L',['Yes','No']]].forEach(([col, values]) => {
      const rule = SpreadsheetApp.newDataValidation().requireValueInList(values, true)
        .setAllowInvalid(true).setHelpText('Choose a suggestion or leave blank if unknown.').build();
      meetings.getRange(col + '2:' + col + '1001').setDataValidation(rule);
    });
    const numberRule = SpreadsheetApp.newDataValidation().requireNumberGreaterThanOrEqualTo(0)
      .setAllowInvalid(true).setHelpText('Use a number of zero or greater. Leave unknown values blank.').build();
    ['C','D','E','I','J','K'].forEach(col => meetings.getRange(col + '2:' + col + '1001').setDataValidation(numberRule));
    meetings.getRange('A2:A1001').setDataValidation(SpreadsheetApp.newDataValidation()
      .requireDate().setAllowInvalid(true).setHelpText('Enter the date the meeting happened.').build());
    // Promotion Channels deliberately remains free text for multiple channels.
    meetings.getRange('H2:H1001').setNote('Separate multiple channels with +, for example Instagram + Posters.');
    meetings.setConditionalFormatRules([SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=' + data.mismatch).setBackground('#FFF0CC').setFontColor('#714E10')
      .setRanges([meetings.getRange('C2:E1001')]).build()]);
    const instructionRange = guide.getRange(1, 1, data.instructions.length, 2);
    instructionRange.setValues(data.instructions).setFontFamily('Arial').setFontSize(11)
      .setFontColor('#213D33').setWrap(true).setVerticalAlignment('middle');
    guide.setHiddenGridlines(true).setTabColor('#244E3D');
    guide.setColumnWidth(1, 280).setColumnWidth(2, 720);
    guide.setRowHeights(1, data.instructions.length, 52);
    guide.getRange('A1:B1').setFontSize(16).setFontWeight('bold').setFontColor('#244E3D');
    guide.setRowHeight(1, 38);
    [2,6,14,19].forEach(row => guide.getRange(row, 1, 1, 2).setBackground('#E5EEE8'));
    guide.setRowHeight(14, 110).setRowHeight(16, 85);
    book.setActiveSheet(meetings);
    SpreadsheetApp.flush();
    props.setProperty('CLUBPULSE_TEMPLATE_ID', book.getId());
    return logClubPulseLinks_(book);
  } finally {
    lock.releaseLock();
  }
}
function logClubPulseLinks_(book) {
  const result = {name:book.getName(), templateUrl:book.getUrl(),
    copyUrl:'https://docs.google.com/spreadsheets/d/' + book.getId() + '/copy'};
  console.log(JSON.stringify(result, null, 2));
  console.log('Share ONLY the fictional template: Anyone with the link → Viewer. Send the copyUrl to configure ClubPulse.');
  return result;
}

