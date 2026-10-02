import {browserStorage} from './browser-storage.js';
import {esc,promotionFields,promotionTimingField,formRecord,normalizePlan,planningEvidence} from './clarity.js';
import {MEETING_TYPES,MEETING_TIMES} from './meeting-options.js';
import {modelReport,predict} from './analytics.js';
import {forecastAttendance} from './analytics/forecasting.js';
import {fmt} from './analytics/stats.js';
import {applyRecommendationPreset} from './next-action.js';
import {loadPlan,savePlan,cleanPlan} from './plan-store.js';
const drafts={user:null,demo:null};
const storage=browserStorage;
export function mountPlanner(root,{rows,demo=false,preset=null}){
 const mode=demo?'demo':'user',report=modelReport(rows),typical=forecastAttendance(rows).typicalSetup||{};
 const loaded=!demo&&!drafts.user?loadPlan(storage):{plan:null,error:null};
 const initial=drafts[mode]||loaded.plan||{type:typical.type||'',time:typical.time||'',promotion:typical.promotion||'',reach:'',days_promoted_before:'',name:'',date:''};
 const options=(key,values)=>[...new Map([...rows.map(r=>r[key]),...values,initial[key]].filter(Boolean).reverse().map(v=>[v.toLowerCase(),v])).values()];
 const types=options('type',MEETING_TYPES),times=options('time',MEETING_TIMES);
 const values=applyRecommendationPreset(initial,preset,mode,types);
 const select=(key,label,list)=>`<label>${label}<select name="${key}"><option value="">Not provided</option>${list.map(v=>`<option value="${esc(v)}"${v.toLowerCase()===String(values[key]||'').toLowerCase()?' selected':''}>${esc(v)}</option>`).join('')}</select></label>`;
 root.innerHTML=`<div class="page-heading"><div><p class="eyebrow">Next Meeting</p><h1>Plan your next meeting</h1><p>Choose one idea to test. Use your history to understand the tradeoffs.</p></div></div><div class="planner-layout"><form id="predict-form" data-planner="true" class="plan-controls"><fieldset><legend>Make it your plan</legend><div class="form-grid">${select('type','Meeting type',types)}${select('time','Meeting time',times)}</div></fieldset>${promotionFields()}<div class="form-grid">${promotionTimingField()}<label>Expected reach before meeting<input name="reach" type="number" min="0" max="10000000" step="1" value="${esc(values.reach??'')}"><span class="field-help">Optional. Use an estimate you know before the meeting.</span></label></div><details class="plan-notes"><summary>Add a name and date <span>optional</span></summary><div class="form-grid"><label>Meeting name<input name="name" maxlength="150" value="${esc(values.name??'')}"></label><label>Meeting date<input name="date" type="date" value="${esc(values.date??'')}"></label></div></details><button class="button" type="submit">Update plan →</button><p class="footnote">Feedback updates as you change your choices.</p><p class="error" id="plan-error" role="alert"></p></form><section id="prediction-output" class="plan-feedback" aria-label="Your plan"></section></div><p class="footnote plan-privacy">${demo?'This is a fictional practice plan. It never changes your own club’s plan.':'Your plan stays on this device. Saving it does not add a meeting to your history.'}</p>`;
 const form=root.querySelector('#predict-form'),output=root.querySelector('#prediction-output');
 if(values.days_promoted_before!==''&&values.days_promoted_before!=null&&![...form.elements.days_promoted_before.options].some(o=>o.value===String(values.days_promoted_before))){form.elements.days_promoted_before.add(new Option(values.days_promoted_before+' days before',values.days_promoted_before))}form.elements.days_promoted_before.value=values.days_promoted_before??'';
 const channels=(values.promotion||'').replace('Announcements','Classroom Announcement').split(' + ');
 for(const channel of channels.filter(Boolean)){if(![...form.querySelectorAll('[name=channels]')].some(c=>c.value.toLowerCase()===channel.toLowerCase()))form.querySelector('.channel-options').insertAdjacentHTML('beforeend',`<label><input type="checkbox" name="channels" value="${esc(channel)}"> ${esc(channel)}</label>`)}
 for(const c of form.querySelectorAll('[name=channels]'))c.checked=channels.some(v=>v.toLowerCase()===c.value.toLowerCase());
 let current=null,normalized=null,saveMessage=loaded.error||'';
 const draw=()=>{
  if(!form.checkValidity()){root.querySelector('#plan-error').textContent='Check the highlighted fields. Counts must be whole numbers of zero or more.';return false}
  try{normalized=normalizePlan(formRecord(form));current=cleanPlan(normalized)}catch{root.querySelector('#plan-error').textContent='Check your plan details and try again.';return false}
  root.querySelector('#plan-error').textContent='';drafts[mode]=current;
  const evidence=planningEvidence(rows,normalized),estimate=report.ready?predict(report,normalized):null;
  output.innerHTML=`<p class="eyebrow">Your plan</p><h2>${esc(current.type||'Choose a meeting format')}</h2><p class="plan-summary">${esc([current.time,current.promotion].filter(Boolean).join(' · ')||'Add the details you know.')}</p><div class="plan-evidence"><h3>What your history suggests</h3>${evidence.length?evidence.map(x=>`<p><strong>${esc(x.label)}</strong><span>${esc(x.text)}</span></p>`).join(''):'<p>Choose a format or time to see the evidence available in your meeting history.</p>'}</div><section class="plan-turnout"><h3>Expected turnout</h3>${estimate?`<p class="turnout-range"><strong>${estimate.low}–${estimate.high}</strong> attendees</p><p class="footnote">Planning range · central estimate ${estimate.estimate}. ${esc(estimate.confidence.level)} confidence. Based on ${rows.length} meetings.</p><details><summary>How to read this estimate</summary><p>This is a rough planning range, not a guarantee. Typical historical error: ${fmt(report.typicalError)} attendees across ${report.testCount} tests.</p><p>${estimate.method==='Ridge regression'?'Meeting format, time, promotion and pre-meeting reach inform this estimate.':'Your recent average performed better in historical checks. Changing these choices does not change that baseline estimate.'}</p>${estimate.warnings.map(w=>`<p>${esc(w)}</p>`).join('')}<a href="#${demo?'demo/':''}method">How ClubPulse estimates turnout →</a></details>`:`<p>Keep building your history.</p><p class="footnote">You can plan now. Turnout estimates need at least 12 meetings and four tests using only earlier dates. You have ${rows.length} meeting${rows.length===1?'':'s'}.</p>`}</section><button type="button" class="button primary" id="save-plan" ${Object.values(current).some(Boolean)?'':'disabled'}>${demo?'Keep practice plan':'Save Plan'}</button><p class="plan-save-status" role="status">${esc(saveMessage)}</p><a class="text-link plan-next" href="#${demo?'demo/overview':'data'}">${demo?'Back to demo insights':'After your meeting, record what happened'} →</a>`;
  output.querySelector('#save-plan').onclick=()=>{const error=demo?null:savePlan(storage,current);saveMessage=error||(demo?'Practice plan kept for this tab. Your own plan is unchanged.':'Plan saved on this device.');output.querySelector('.plan-save-status').textContent=saveMessage;output.querySelector('.plan-save-status').classList.toggle('error',!!error)};return true;
 };
 form.onsubmit=e=>{e.preventDefault();saveMessage='';draw()};
 form.addEventListener('change',()=>{saveMessage='Unsaved changes';draw()});
 form.addEventListener('input',()=>{saveMessage='Unsaved changes';output.querySelector('.plan-save-status').textContent=saveMessage;output.querySelector('#save-plan').disabled=true});
 draw();
}
