import test from 'node:test';import assert from 'node:assert/strict';
import {meetingTooltipHTML,attendanceComparison,attendanceTrendChart,comparisonHTML,historyRows,historyColumns,meetingHistoryTable} from '../dist/insight-evidence.js';
import {demoData} from '../dist/analytics.js';import {analyzeDataset} from '../dist/analytics/pipeline.js';import {importCSV} from '../dist/analytics/data-quality.js';
const rows=Array.from({length:6},(_,i)=>({id:String(i),date:`2026-09-0${i+1}`,attendance:i<3?30:15}));
test('chart keeps every meeting and sorts actual normalized dates',()=>{const html=attendanceTrendChart([...rows].reverse());assert.equal((html.match(/data-meeting-point=/g)||[]).length,6);assert.ok(html.indexOf('Sep 1, 2026')<html.indexOf('Sep 6, 2026'));assert.equal(rows[0].date,'2026-09-01')});
test('balanced comparison exposes dates, headcounts, sample size and percent',()=>{const c=attendanceComparison(rows);assert.equal(c.currentAverage,15);assert.equal(c.previousAverage,30);assert.equal(c.absoluteDifference,-15);assert.equal(c.percentDifference,-50);assert.equal(c.sampleSize,6);assert.deepEqual(c.currentPeriod,['2026-09-04','2026-09-05','2026-09-06']);assert.match(comparisonHTML(rows),/Last 3 meetings/);assert.match(comparisonHTML(rows),/Previous 3 meetings/)});
test('one and fewer than six meetings do not claim percentage trend',()=>{for(let n=1;n<6;n++){assert.equal(attendanceComparison(rows.slice(0,n)).available,false);assert.doesNotMatch(comparisonHTML(rows.slice(0,n)),/\d%/)}assert.match(comparisonHTML(rows.slice(0,1)),/Add another meeting/)});
test('zero baseline does not invent a percentage',()=>{assert.equal(attendanceComparison(rows.map((r,i)=>({...r,attendance:i<3?0:10}))).percentDifference,null)});
test('history includes all records on expansion and sorts newest first',()=>{const d=analyzeDataset(demoData()).rows;assert.equal(historyRows(d)[0].date,historyRows(d,true).at(-1).date);assert.equal((meetingHistoryTable(d,false,true).match(/<tr(?:\s[^>]*)?>/g)||[]).length,d.length+1);assert.match(meetingHistoryTable(d),/View all 28 meetings/)});
test('empty optional fields disappear while zero values remain',()=>{assert.deepEqual(historyColumns(rows).map(c=>c[0]),['date','attendance']);assert.ok(historyColumns([{...rows[0],new_members:0}]).some(c=>c[0]==='new_members'));assert.match(meetingHistoryTable([{...rows[0],notes:'<script>'+ 'x'.repeat(100)}]),/&lt;script&gt;/)});
test('demo and CSV uploads use the same chart and history with normalized dates',()=>{const uploaded=importCSV('Date,Attendance\n9/6/2026,15\n9/1/2026,30').rows;for(const d of [analyzeDataset(demoData()).rows,uploaded]){assert.equal((attendanceTrendChart(d).match(/data-meeting-point=/g)||[]).length,d.length);assert.equal((meetingHistoryTable(d,false,true).match(/<tr(?:\s[^>]*)?>/g)||[]).length,d.length+1)}});

test('compact tooltip exposes date, optional name and attendance for every demo point',()=>{for(const r of analyzeDataset(demoData()).rows){const html=meetingTooltipHTML(r);assert.ok(html.includes(String(r.attendance)+' <small>attendees'));assert.match(html,/2026/);assert.ok(html.includes(r.name));assert.doesNotMatch(html,/returning|new_members|special_event/)}const basic=meetingTooltipHTML({date:'2026-09-17',attendance:35});assert.match(basic,/Sep 17, 2026/);assert.doesNotMatch(basic,/tooltip-name/);assert.match(meetingTooltipHTML({date:'2026-09-17',attendance:0,name:'<img>'}),/&lt;img&gt;/)});

import {createMeetingInspection,meetingDetailsHTML,meetingInspectorHTML,bindMeetingInspection} from '../dist/meeting-inspector.js';
test('inspector defaults to most recent normalized meeting without changing input order',()=>{
  const reversed=[...rows].reverse(), state=createMeetingInspection(reversed);
  assert.equal(state.selectedMeeting.date,'2026-09-06');assert.equal(state.previewIndex,null);
  assert.equal(reversed[0].date,'2026-09-06');
  assert.match(meetingInspectorHTML(reversed),/value="5" selected/);
});
test('persistent inspection and temporary preview stay independent',()=>{
  const state=createMeetingInspection(rows);state.select(1);state.preview(4);
  assert.equal(state.selectedMeeting,rows[1]);assert.equal(state.previewIndex,4);
  state.select(2);assert.equal(state.previewIndex,4);state.dismissPreview();
  assert.equal(state.selectedMeeting,rows[2]);assert.equal(state.previewIndex,null);
  state.select(999);assert.equal(state.selectedMeeting,rows[2]);
});
test('meeting details show available metadata and preserve zero and false',()=>{
  const basic=meetingDetailsHTML(rows[0]);assert.doesNotMatch(basic,/Meeting type|Special event|Notes|returning|inspector-name/);
  const rich=meetingDetailsHTML({...rows[0],name:'<unsafe>',new_members:0,returning_members:30,type:'Discussion',time:'Lunch',promotion_channels:['Instagram','Announcements'],days_promoted_before:0,reach:0,signups:0,special_event:false,notes:'<script>no</script>'});
  for(const value of ['&lt;unsafe&gt;','Instagram + Announcements','0 days before','<dd>0</dd>','<dd>No</dd>','&lt;script&gt;'])assert.ok(rich.includes(value),value);
  assert.doesNotMatch(rich,/<script>/);
});
test('demo and imported records use the same inspector with conditional fields',()=>{
  for(const data of [analyzeDataset(demoData()).rows,importCSV('Date,Attendance\n9/1/2026,0\n9/6/2026,15').rows]){
    const state=createMeetingInspection(data),html=attendanceTrendChart(data);
    assert.equal((html.match(/id="meeting-details"/g)||[]).length,1);
    assert.ok(html.includes(meetingDetailsHTML(state.selectedMeeting)));
    assert.equal((html.match(/<option /g)||[]).length,data.length);
  }
});
test('selector updates only details; hover, focus and tap never overwrite selection or invoke navigation',()=>{
  const noNavigation=()=>{throw Error('Unexpected focus/scroll/navigation')};
  const points=rows.map((r,i)=>({dataset:{meetingPoint:String(i)},style:{left:'50%',top:'40%'},attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},focus:noNavigation,scrollIntoView:noNavigation}));
  const selector={value:'5',focus:noNavigation,scrollIntoView:noNavigation}, details={innerHTML:meetingDetailsHTML(rows[5])};
  const floating={hidden:true,innerHTML:'',style:{},offsetWidth:200,offsetHeight:90};
  const plot={clientWidth:700,clientHeight:360,querySelectorAll:()=>points,contains:target=>points.includes(target)};
  const nodes={'#chart-meeting':selector,'#meeting-details':details,'.attendance-plot':plot,'#chart-point-tooltip':floating},events={};
  const root={querySelector:s=>nodes[s],addEventListener:(event,fn)=>events[event]=fn,scrollIntoView:noNavigation};
  const state=bindMeetingInspection(root,rows,meetingTooltipHTML);
  selector.value='0';selector.onchange();assert.equal(state.selectedMeeting,rows[0]);assert.match(details.innerHTML,/Sep 1, 2026/);
  assert.equal(floating.hidden,true);assert.ok(points.every(p=>!Object.keys(p.attrs).length));
  const detailSnapshot=details.innerHTML;
  points[3].onmouseenter();assert.equal(floating.hidden,false);assert.match(floating.innerHTML,/Sep 4, 2026/);
  assert.equal(details.innerHTML,detailSnapshot);assert.equal(selector.value,'0');
  points[3].onmouseleave();assert.equal(floating.hidden,true);assert.equal(state.previewIndex,null);
  points[2].onfocus();assert.equal(floating.hidden,false);points[2].onblur();assert.equal(floating.hidden,true);
  points[4].onclick();assert.equal(floating.hidden,false);assert.equal(state.selectedMeeting,rows[0]);
  events.keydown({key:'Escape'});assert.equal(floating.hidden,true);
  points[4].onclick();events.pointerdown({target:selector});assert.equal(floating.hidden,true);
  assert.equal(state.selectedMeeting,rows[0]);assert.ok(points.every(p=>!Object.keys(p.attrs).length));
});
