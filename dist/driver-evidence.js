import {esc} from './clarity.js';
import {fmt} from './analytics/stats.js';
export function driverSignals(outputs){
 const signals=[],reach=outputs.analyze_social_reach?.trend,members=outputs.analyze_member_engagement?.trend;
 if(reach)signals.push({label:'Promotion reach',before:reach.previous,after:reach.recent,unit:'accounts reached per meeting'});
 if(members)signals.push({label:'Returning participation',before:members.previous*100,after:members.recent*100,unit:'share of attendees',suffix:'%'});
 return signals;
}
export function driversHTML(outputs){
 const signals=driverSignals(outputs),falling=outputs.calculate_attendance_trend?.change<0;
 return `<section class="notice-story" id="notice-story"><h2>What may be driving it?</h2>${signals.length?`<p>Previous 3 meetings → last 3 meetings · three meetings in each period.</p><div class="driver-list">${signals.map(s=>`<article><h3>${esc(s.label)} ${s.after<s.before?'declined':s.after>s.before?'increased':'was unchanged'}</h3><p class="driver-values"><span>${fmt(s.before)}${s.suffix||''}</span><span aria-hidden="true">→</span><strong>${fmt(s.after)}${s.suffix||''}</strong></p><p>${esc(s.unit)}</p></article>`).join('')}</div><p class="footnote">These changes may be related; they do not prove cause. Returning share describes attendance, not whether the same members came back.</p>`:'<p>Add promotion reach or returning-member counts across six meetings to compare possible drivers. Attendance alone cannot explain why it changed.</p>'}<button class="text-link" id="investigate-change">${falling?'Investigate the decline':'Explore the evidence'} →</button></section>`;
}
