import {DURATION, SCENES} from './demo-video-timeline.js';

export function mountDemoVideo() {
  const options = new URLSearchParams(location.hash.split('?')[1] || '');
  const recording = options.get('recording') === 'true';
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet'; stylesheet.href = 'demo-video.css'; document.head.append(stylesheet);
  const mark = document.querySelector('link[rel="icon"]').href;
  document.body.className = 'demo-video-shell';
  document.body.innerHTML = `<main class="video-stage"><iframe title="Live ClubPulse demo" class="video-product"></iframe><section class="video-cover"><div class="video-brand"><img width="64" height="64" alt=""><span>ClubPulse <small>AI</small></span></div><p class="video-kicker">MEETING HISTORY → INSIGHT → ACTION</p><h1></h1><p class="video-cover-note">Fictional demo data · No narration needed</p></section><aside class="video-caption" aria-live="polite"><span class="video-chapter"></span><p></p></aside><div class="video-progress"></div><nav class="video-controls" aria-label="Demo playback"><button id="video-play">Play</button><button id="video-pause">Pause</button><button id="video-replay">Replay</button><span class="video-clock"></span><a href="#home">Exit</a></nav><p class="video-error" role="alert" hidden></p></main>`;
  document.querySelector('.video-brand img').src = mark;
  const frame = document.querySelector('iframe'), cover = document.querySelector('.video-cover');
  const caption = document.querySelector('.video-caption'), controls = document.querySelector('.video-controls');
  controls.hidden = recording;
  let elapsed = 0, last = 0, index = -1, running = false, busy = false, stopped = false, generation = 0;
  const doc = () => frame.contentDocument;
  const waitFor = async (test, timeout = 10000) => {
    const start = performance.now();
    while (!test()) { if (performance.now() - start > timeout) throw Error('The product view did not become ready. Replay to try again.'); await new Promise(r => setTimeout(r, 40)); }
  };
  async function view(hash, expected) {
    if (frame.contentWindow.location.hash !== '#'+hash) frame.contentWindow.location.hash = hash;
    await waitFor(() => doc().querySelector('#page')?.dataset.view === expected);
    await doc().fonts.ready;
    frame.contentWindow.scrollTo({top:0, behavior:'instant'});
  }
  function target(selector, offset = 28) {
    const node = doc().querySelector(selector);
    if (!node) throw Error('Missing product section: '+selector);
    doc().querySelectorAll('.video-focus').forEach(e => e.classList.remove('video-focus'));
    node.classList.add('video-focus');
    frame.contentWindow.scrollTo({top:node.getBoundingClientRect().top + frame.contentWindow.scrollY - offset, behavior:'smooth'});
  }
  function clearPreview() { doc().querySelector('.attendance-plot')?.dispatchEvent(new frame.contentWindow.MouseEvent('mouseleave')); }
  async function scene(s) {
    document.body.dataset.scene = s.action || document.body.dataset.scene;
    if(s.action && doc()?.body) doc().body.dataset.videoScene=s.action;
    if (s.text) { caption.querySelector('p').textContent = s.text; cover.querySelector('h1').textContent = s.text; }
    caption.querySelector('.video-chapter').textContent = `${String(Math.min(7, Math.floor(s.at/13)+1)).padStart(2,'0')} / CLUBPULSE AI`;
    if (s.action === 'opening' || s.action === 'ending') {
      cover.hidden = false; caption.hidden = true;
      cover.querySelector('.video-kicker').textContent = s.action === 'ending' ? 'A BETTER NEXT MEETING STARTS HERE' : 'MEETING HISTORY → INSIGHT → ACTION';
      return;
    }
    if (s.action) { cover.hidden = true; caption.hidden = false; }
    switch (s.action) {
      case 'intro': await view('demo','demo'); break;
      case 'chart': await view('demo/overview','overview'); target('#attendance-evidence'); break;
      case 'point': {
        const points = [...doc().querySelectorAll('[data-meeting-point]')];
        const point = points[Math.round((points.length-1)*s.index)];
        if (!point) throw Error('Chart points did not load.');
        point.dispatchEvent(new frame.contentWindow.MouseEvent('mouseenter')); break;
      }
      case 'comparison': clearPreview(); target('.comparison-periods',180); break;
      case 'inspector': {
        target('.attendance-layout');
        const select = doc().querySelector('#chart-meeting');
        select.value = String(select.options.length-1);
        select.dispatchEvent(new frame.contentWindow.Event('change',{bubbles:true}));
        doc().querySelector('.meeting-inspector').classList.add('video-focus'); break;
      }
      case 'history': target('#history-table',150); break;
      case 'drivers': target('#notice-story'); break;
      case 'ask': {
        const question = doc().querySelector('#club-question');
        question.value = 'Is promotion helping?';
        doc().querySelector('#ask-form').requestSubmit();
        target('.ask-disclosure'); break;
      }
      case 'answer': target('#ask-answer'); break;
      case 'recommendation': target('[aria-labelledby="next-action-title"]'); break;
      case 'plan': {
        const button = doc().querySelector('[data-plan-type]');
        if (!button) throw Error('Recommendation is unavailable.');
        button.click();
        target('.demo-planner'); break;
      }
      case 'import': await view('import','import'); break;
      case 'entry': await view('data','data'); break;
    }
  }
  const fail = error => {
    running = false; stopped = true; document.body.dataset.videoState = 'error';
    const box=document.querySelector('.video-error'); box.hidden=false; box.textContent=error.message;
    controls.hidden=false;
  };
  function tick(now) {
    if (running && !busy) elapsed += Math.min((now-last)/1000, .1);
    last=now;
    const next = SCENES[index+1];
    if (running && !busy && next && elapsed >= next.at) {
      index++; busy=true;
      scene(next).catch(fail).finally(()=>{busy=false;last=performance.now();});
    }
    document.querySelector('.video-clock').textContent=`${Math.floor(elapsed)} / ${DURATION}s`;
    document.querySelector('.video-progress').style.width=`${Math.min(100,elapsed/DURATION*100)}%`;
    document.body.dataset.videoTime=elapsed.toFixed(2);
    if (elapsed>=DURATION) {running=false;stopped=true;document.body.dataset.videoState='finished';}
    requestAnimationFrame(tick);
  }
  const play=()=>{if(!stopped){running=true;last=performance.now();document.body.dataset.videoState='playing';}};
  async function replay() {
    const token=++generation; running=false; stopped=false;busy=true;elapsed=0;index=-1;
    document.body.dataset.videoState='loading';document.querySelector('.video-error').hidden=true;
    cover.hidden=false;caption.hidden=true;cover.querySelector('h1').textContent='Turn your club’s meeting history into a better next meeting.';
    frame.src='./?videoSession=1#demo';
    try {
      await waitFor(()=>doc()?.querySelector('#page')?.dataset.view==='demo');
      await doc().fonts.ready; await document.fonts.ready;
      if(token!==generation)return;
      busy=false; document.body.dataset.videoState='ready';
      if(options.get('autoplay')!=='false')play();
    } catch(error){fail(error);}
  }
  document.querySelector('#video-play').onclick=play;
  document.querySelector('#video-pause').onclick=()=>{running=false;document.body.dataset.videoState='paused';};
  document.querySelector('#video-replay').onclick=()=>{if(!busy)replay();};
  window.addEventListener('pagehide',()=>{running=false;stopped=true;});
  requestAnimationFrame(tick); replay();
}
