export {mean,sorted} from './analytics/stats.js';
export {demoData} from './analytics/demo.js';
export {retention} from './analytics/retention.js';
export {parseCSV,importCSV,validateRow} from './analytics/data-quality.js';
export {modelReport,predict} from './analytics/forecasting.js';
import {compareCategories} from './analytics/attendance.js';
export function groups(rows,key){return compareCategories(rows,key).groups.map(g=>({name:g.name,n:g.count,avg:g.average}))}
export function toCSV(rows){const keys=['name','date','type','time','promotion','attendance','reach','signups','members','new_members','returning_members','topic','days_promoted_before','special_event','notes'];const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return[keys.join(','),...rows.map(r=>keys.map(k=>esc(k==='members'?(r.members??[]).join(';'):r[k])).join(','))].join('\r\n')}
