import {validateRow} from './analytics/data-quality.js';
export const STORAGE_KEY='clubpulse.user-meetings.v1';
export function normalizeEntry(raw,index=1){return validateRow(raw,index)}
export function validEntries(records){return records.flatMap((r,i)=>{try{return [normalizeEntry(r,i+1)]}catch{return []}})}
export function updateEntry(records,id,patch){return records.map(r=>r.id===id?{...r,...patch,id}:r)}
export function deleteEntry(records,id){return records.filter(r=>r.id!==id)}
export function loadEntries(storage){try{const text=storage.getItem(STORAGE_KEY);if(!text)return {records:[],error:null};const data=JSON.parse(text);if(data.version!==1||!Array.isArray(data.records)||data.records.length>2000||data.records.some(r=>!r||typeof r!=='object'||typeof r.id!=='string'))throw Error('Invalid saved data');return {records:data.records,error:null}}catch{return {records:[],error:'Saved meetings could not be read. Your existing stored data has not been changed.'}}}
export function saveEntries(storage,records){try{storage.setItem(STORAGE_KEY,JSON.stringify({version:1,records}));return null}catch{return 'Not saved on this device. Keep this tab open and export your data before leaving.'}}
export function entryWarning(r){return r.new_members!=null&&r.new_members!==''&&r.returning_members!=null&&r.returning_members!==''&&Number(r.new_members)+Number(r.returning_members)>Number(r.attendance)?'New + returning members is greater than total attendance. Check these values.':''}
