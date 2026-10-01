import test from 'node:test';
import assert from 'node:assert/strict';
import {loadPlan,savePlan,cleanPlan,PLAN_KEY} from '../dist/plan-store.js';
import {applyRecommendationPreset} from '../dist/next-action.js';
import {driverSignals,driversHTML} from '../dist/driver-evidence.js';
import {analyzeDataset} from '../dist/analytics/pipeline.js';
import {demoData} from '../dist/analytics.js';
import {modelReport,predict} from '../dist/analytics.js';
import {normalizePlan} from '../dist/clarity.js';
test('blank and entered reach use normalized numeric forecast inputs',()=>{
 const report=modelReport(demoData());
 for(const reach of ['', '300', '0']){const plan=normalizePlan({type:'Presentation',time:'Lunch',promotion:'Instagram',reach});const forecast=predict(report,plan);assert.ok(Number.isFinite(forecast.estimate));assert.ok(forecast.low<=forecast.high);}
});
test('saved plans roundtrip only planning choices and preserve them when recommendation changes format',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
 const original={name:'Board workshop',date:'2026-10-12',type:'Discussion',time:'Lunch',promotion:'Email',reach:200,days_promoted_before:5,attendance:99,members:['private']};
 const next=applyRecommendationPreset(original,{mode:'user',type:'Workshop'},'user',['Workshop','Discussion']);
 assert.equal(savePlan(storage,next),null);const restored=loadPlan(storage);
 assert.equal(restored.error,null);assert.deepEqual(restored.plan,{name:'Board workshop',date:'2026-10-12',type:'Workshop',time:'Lunch',promotion:'Email',reach:'200',days_promoted_before:'5'});
 assert.equal(data.size,1);assert.ok(data.has(PLAN_KEY));assert.doesNotMatch(data.get(PLAN_KEY),/attendance|private|members/);
 assert.equal(applyRecommendationPreset(original,{mode:'demo',type:'Workshop'},'user',['Workshop']).type,'Discussion');
});
test('invalid or unavailable plan storage is handled without claiming success',()=>{
 assert.throws(()=>cleanPlan({reach:-1}));assert.throws(()=>cleanPlan({days_promoted_before:'1.5'}));
 assert.throws(()=>cleanPlan({name:'x'.repeat(301)}));
 assert.match(loadPlan({getItem:()=>'{bad'}).error,/could not be loaded/);
 assert.match(savePlan({setItem:()=>{throw Error('quota')}},{type:'Workshop'}),/could not be saved/);
 assert.equal(loadPlan({getItem:()=>null}).plan,null);
});
test('driver summary uses computed period values and stays honest with missing fields',()=>{
 const outputs=analyzeDataset(demoData()).outputs,signals=driverSignals(outputs);
 assert.equal(signals.length,2);assert.equal(signals[0].before,outputs.analyze_social_reach.trend.previous);
 assert.equal(signals[1].after,outputs.analyze_member_engagement.trend.recent*100);
 assert.match(driversHTML(outputs),/three meetings in each period/);
 assert.match(driversHTML(outputs),/do not prove cause/);
 const sparse=analyzeDataset([{date:'2026-09-03',attendance:20}]).outputs;
 assert.deepEqual(driverSignals(sparse),[]);assert.doesNotMatch(driversHTML(sparse),/declined|\d%/);
});
