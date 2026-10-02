import test from 'node:test';
import assert from 'node:assert/strict';
import {createBrowserStorage} from '../dist/browser-storage.js';
import {DURATION,SCENES} from '../dist/demo-video-timeline.js';
test('video frames neither read nor write real storage and replay begins empty',()=>{
 const forbidden=()=>{throw Error('Real storage was touched');};
 const frame=createBrowserStorage('?videoSession=1',forbidden);
 assert.equal(frame.getItem('clubpulse.user-meetings.v1'),null);
 frame.setItem('clubpulse.user-meetings.v1','fictional');
 assert.equal(frame.getItem('clubpulse.user-meetings.v1'),'fictional');
 assert.equal(createBrowserStorage('?videoSession=1',forbidden).getItem('clubpulse.user-meetings.v1'),null);
});
test('normal product retains persistent meeting and plan storage',()=>{
 const values=new Map();const persistent=()=>({getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)});
 const normal=createBrowserStorage('',persistent);
 normal.setItem('meetings','saved');normal.setItem('plan','saved plan');
 assert.equal(createBrowserStorage('',persistent).getItem('meetings'),'saved');
 assert.equal(createBrowserStorage('',persistent).getItem('plan'),'saved plan');
});
test('story stays under 90 seconds with a readable final frame',()=>{
 assert.ok(DURATION<90);assert.equal(SCENES[0].at,0);
 assert.ok(SCENES.every((s,i)=>i===0||s.at>SCENES[i-1].at));
 assert.ok(DURATION-SCENES.at(-1).at>=4);
});
