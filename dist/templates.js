const originalFields=[
 ['date','Date','Required','When the meeting happened. Use YYYY-MM-DD.'],
 ['attendance','Attendance','Required','Total people attending, including new and returning members.'],
 ['new_members','New Members','Recommended','People attending for the first time, if tracked.'],
 ['returning_members','Returning Members','Recommended','People who have attended before. New + returning should equal attendance.'],
 ['meeting_type','Meeting Type','Recommended','The format: Workshop, Presentation, Discussion, Interactive Activity, Competition, Guest Speaker, Social or Other.'],
 ['meeting_name','Meeting Name','Recommended','What the meeting was about. For example: NBA Draft Debate.'],
 ['meeting_time','Meeting Time','Recommended','Before School, Lunch, After School, Evening or Other.'],
 ['promotion_channels','Promotion Channels','Recommended','Combine channels with +, for example Instagram + Posters.'],
 ['instagram_reach','Instagram Reach Before Meeting','Optional','Accounts reached by promotion before the meeting. Other social platforms are fine too.'],
 ['days_promoted_before','Promotion Started Days Before','Optional','How many days before the meeting promotion started.'],
 ['signups_before_meeting','Signups Before Meeting','Optional','People who signed up or expressed interest beforehand.'],
 ['special_event','Special Event','Optional','Yes or No, for a club fair, tournament or special speaker.'],
 ['notes','Notes','Optional','Context that could affect turnout. Avoid personal student information.']
];
const originalExamples=[['2026-09-03',28,10,18,'Interactive Activity','NBA Player Debate','Lunch','Instagram + Classroom Announcement',450,4,17,'No','Example row - delete before using'],['2026-09-10',24,6,18,'Presentation','Introduction to Sports Analytics','Lunch','Instagram',310,2,11,'No','Example row - delete before using'],['2026-09-17',35,12,23,'Competition','Prediction Challenge','Lunch','Instagram + Posters + Classroom Announcement',620,5,25,'Yes','Example row - delete before using']];
const order=[0,5,1,2,3,4,6,7,9,8,10,11,12];
export const FIELDS=order.map(i=>originalFields[i]);
export const EXAMPLES=originalExamples.map(r=>order.map(i=>r[i]));
export const templateCSV=()=>[FIELDS.map(x=>x[1]),...EXAMPLES].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
