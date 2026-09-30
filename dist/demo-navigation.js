export function configureDemoExperience(root,experience){
 root.classList.toggle('full-demo',experience==='full');if(experience!=='full')return;
 root.classList.add('full-demo');
 root.querySelector('.page-heading h1').textContent='Full demo workspace';
 root.querySelector('.page-heading p:not(.eyebrow)').textContent='Explore every section freely. All analysis uses fictional club data.';
 root.querySelectorAll(':scope > details').forEach(d=>d.open=true);
 const destinations=[['attendance-evidence','Attendance trend'],['demo-history','Meeting history'],['notice-story','Drivers'],['demo-ask','Ask ClubPulse'],['demo-recommendation','Recommendation']];
 root.querySelector('.meeting-history').id='demo-history';root.querySelector('.ask-disclosure').id='demo-ask';root.querySelector('.next-action').id='demo-recommendation';
 const nav=document.createElement('nav');nav.className='demo-section-nav';nav.setAttribute('aria-label','Full demo sections');
 nav.innerHTML=destinations.map(([id,label])=>`<button class="text-link" type="button" data-demo-section="${id}">${label}</button>`).join('')+'<a class="text-link" href="#demo/predict">Next Meeting →</a>';
 root.querySelector('.page-heading').after(nav);
 nav.querySelectorAll('button').forEach(b=>b.onclick=()=>focusSection(root.querySelector('#'+b.dataset.demoSection)));
}
function focusSection(section){if(!section)return;section.tabIndex=-1;section.focus({preventScroll:true});section.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
export function focusDemoDestination(root,experience){if(experience==='trend'){focusSection(root.querySelector('#attendance-evidence'));return;}window.scrollTo({top:0,behavior:'instant'});const h=root.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}


