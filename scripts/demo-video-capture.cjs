// Use existing Playwright and Chrome. Set PLAYWRIGHT_MODULE and FFMPEG_PATH explicitly.
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const record = process.argv.includes('--record');
const out = path.resolve('outputs/demo-video');
fs.mkdirSync(out, {recursive:true});
const delay = ms => new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const context = await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 const page = await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/#demo-video?recording=true&autoplay=false');
 await page.waitForFunction(()=>document.body.dataset.videoState==='ready');
 if(record && !process.env.FFMPEG_PATH)throw Error('FFMPEG_PATH is required');
 const output=path.join(out,'ClubPulse_AI_Devpost_Demo.mp4');
 let encoder,encoderDone,frameCount=0;
 if(record){
   encoder=spawn(process.env.FFMPEG_PATH,['-y','-f','image2pipe','-vcodec','mjpeg','-framerate','15','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-r','30','-movflags','+faststart',output],{windowsHide:true,stdio:['pipe','ignore','pipe']});
   const log=fs.createWriteStream(path.join(out,'encoding.log'));encoder.stderr.pipe(log);
   encoderDone=new Promise((resolve,reject)=>{encoder.on('error',reject);encoder.on('close',code=>code===0?resolve():reject(Error('Encoder exited '+code)));});
 }
 const checks=[],milestones=[16,20,23,26,29,34,39,44,50,54,60,74,80,83,86];
 // Invoke the same Play control; recording mode intentionally hides its UI.
 await page.evaluate(()=>document.querySelector('#video-play').click());
 const start=Date.now();let nextMilestone=0,lastReport=-1;
 while(true){
   const state=await page.evaluate(()=>({state:document.body.dataset.videoState,time:Number(document.body.dataset.videoTime),scene:document.body.dataset.scene,error:document.querySelector('.video-error').textContent}));
   if(state.state==='error')throw Error(state.error);
   if(state.time>=milestones[nextMilestone]){
     const result=await page.evaluate(()=>{const d=document.querySelector('iframe').contentDocument;return {time:document.body.dataset.videoTime,scene:document.body.dataset.scene,view:d.querySelector('#page').dataset.view,tooltip:!!d.querySelector('#chart-point-tooltip:not([hidden])'),meetings:d.querySelector('.editor-count')?.textContent,answer:d.querySelector('#ask-answer')?.textContent.slice(0,160),type:d.querySelector('.demo-planner [name=type]')?.value,caption:document.querySelector('.video-caption p').textContent};});
     checks.push(result);
     if(!record)await page.screenshot({path:path.join(out,`check-${String(milestones[nextMilestone]).padStart(2,'0')}.jpg`),type:'jpeg',quality:85});
     nextMilestone++;
   }
   if(record){
     const image=await page.screenshot({type:'jpeg',quality:88});
     const target=Math.floor((Date.now()-start)/1000*15)+1;
     while(frameCount<target){if(!encoder.stdin.write(image))await new Promise(r=>encoder.stdin.once('drain',r));frameCount++;}
   }
   if(Math.floor(state.time/15)!==lastReport){lastReport=Math.floor(state.time/15);console.log(JSON.stringify(state));}
   if(state.state==='finished')break;
   if(Date.now()-start>110000)throw Error('Sequence exceeded 110 seconds');
   await delay(record?Math.max(0,start+frameCount/15*1000-Date.now()):100);
 }
 if(record){encoder.stdin.end();await encoderDone;}
 const duration=(Date.now()-start)/1000;
 if(errors.length)throw Error(errors.join('\n'));
 if(checks.filter(c=>c.tooltip).length<3)throw Error('Expected three real tooltip previews');
 if(!checks.find(c=>c.scene==='plan'&&c.type==='Interactive Activity'))throw Error('Planner preset missing');
 // Test playback controls and normal routes after a complete run.
 if(!record){
   await page.evaluate(()=>document.querySelector('#video-replay').click());
   await page.waitForFunction(()=>document.body.dataset.videoState==='ready');
   await page.evaluate(()=>document.querySelector('#video-play').click());await delay(250);
   await page.evaluate(()=>document.querySelector('#video-pause').click());
   const paused=await page.evaluate(()=>document.body.dataset.videoTime);await delay(350);
   if(paused!==await page.evaluate(()=>document.body.dataset.videoTime))throw Error('Pause failed');
   await page.goto('http://127.0.0.1:4173/#home');
   for(const route of ['home','import','data','sheets','demo','demo/overview','demo/insights','demo/predict']){
     console.log('Regression '+route);await page.goto('http://127.0.0.1:4173/?qa='+encodeURIComponent(route)+'#'+route);await page.waitForFunction(()=>document.querySelector('#page')?.textContent.length>20);
     if(await page.locator('.video-stage').count())throw Error('Video shell leaked into '+route);
   }
 }
 fs.writeFileSync(path.join(out,record?'recording-report.json':'qa-report.json'),JSON.stringify({duration,frameCount,errors,checks,output:record?output:null},null,2));
 console.log(JSON.stringify({done:true,record,duration,frameCount,output:record?output:null}));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
