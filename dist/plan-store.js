export const PLAN_KEY='clubpulse.next-plan.v1';
const fields=['name','date','type','time','promotion','days_promoted_before','reach'];
export function cleanPlan(value){
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid plan');
 const plan={};for(const key of fields){const v=value[key]??'';if(!['string','number'].includes(typeof v)||String(v).length>300)throw Error('Invalid plan');plan[key]=String(v)}
 for(const key of ['reach','days_promoted_before'])if(plan[key]!==''&&(!Number.isInteger(Number(plan[key]))||Number(plan[key])<0||Number(plan[key])>10000000))throw Error('Invalid plan');
 if(plan.date&&(!/^\d{4}-\d{2}-\d{2}$/.test(plan.date)||!Number.isFinite(Date.parse(plan.date))||new Date(plan.date).toISOString().slice(0,10)!==plan.date))throw Error('Invalid date');return plan;
}
export function loadPlan(storage){try{const raw=storage.getItem(PLAN_KEY);if(!raw)return {plan:null,error:null};const value=JSON.parse(raw);if(value.version!==1)throw Error();return {plan:cleanPlan(value.plan),error:null}}catch{return {plan:null,error:'Your saved plan could not be loaded. Your meeting history is unchanged.'}}}
export function savePlan(storage,plan){try{storage.setItem(PLAN_KEY,JSON.stringify({version:1,plan:cleanPlan(plan)}));return null}catch{return 'Plan could not be saved on this device. Keep this page open and try again.'}}
