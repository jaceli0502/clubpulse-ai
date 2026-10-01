// Reorganize existing controls without introducing another application state layer.
export function calmView({page,root,rows}){
  if(page==='overview'){
    root.querySelector('.notice')?.remove();
    root.querySelector('.page-heading h1').textContent='What should I notice?';
    const metrics=root.querySelector('.metrics');if(metrics){const detail=document.createElement('details');detail.className='summary-metrics';detail.innerHTML='<summary>Meeting summary</summary>';metrics.replaceWith(detail);detail.append(metrics)}
    const ask=root.querySelector('.ask-card'),chips=ask?.querySelector('.question-chips'),form=ask?.querySelector('form');if(chips&&form)form.after(chips);
    const askSummary=root.querySelector('.ask-disclosure>summary');if(askSummary)askSummary.innerHTML='Ask ClubPulse <span>Explore the evidence behind your meeting history</span>';if(ask?.querySelector('h2'))ask.querySelector('h2').textContent='What do you want to understand?';
    const idea=root.querySelector('.next-idea');if(idea)root.querySelector('.ask-disclosure')?.after(idea);
    const tour=root.querySelector('.tour-panel');if(tour){tour.querySelector('button').textContent='Quick tour';root.append(tour)}
    const download=root.querySelector('#health-report');if(download){const details=document.createElement('details');details.innerHTML='<summary>Reports and data</summary>';download.parentElement.before(details);details.append(download.parentElement)}
  }
  if(page==='predict'){
    if(root.querySelector('[data-planner]'))return;
    root.querySelector('.notice')?.remove();
    const form=root.querySelector('#predict-form');if(!form)return;
    const meeting=document.createElement('fieldset'),promotion=document.createElement('fieldset');
    meeting.innerHTML='<legend>Meeting</legend><div class="form-grid"></div>';
    promotion.innerHTML='<legend>Promotion</legend><div class="form-grid"></div>';
    for(const k of ['name','type','date','time']){const el=form.querySelector(`[name="${k}"]`)?.closest('label');if(el)meeting.lastElementChild.append(el)}
    const channels=form.querySelector('.channel-field');if(channels)promotion.append(channels);
    for(const k of ['days_promoted_before','reach']){const el=form.querySelector(`[name="${k}"]`)?.closest('label');if(el)promotion.querySelector('.form-grid').append(el)}
    form.querySelector('.form-grid')?.remove();form.prepend(meeting,promotion);
    root.querySelector('.support-line')?.remove();
    const output=root.querySelector('#prediction-output');
    const simplify=()=>{const context=[...output.querySelectorAll(':scope > p')].filter(p=>p.textContent.startsWith('Learned from')||p.textContent.startsWith('Meeting name and date')||p.textContent.startsWith('Your recent five'));const detail=output.querySelector('details');if(detail)context.forEach(p=>detail.prepend(p))};
    simplify();form.addEventListener('submit',()=>queueMicrotask(simplify));
  }
}
export function refineEntry(form){
  if(!form||form.querySelector('.extra-meeting-details'))return;
  const more=document.createElement('details');more.className='optional-fields extra-meeting-details';more.innerHTML='<summary>More meeting details</summary><div class="form-grid"></div>';
  for(const name of ['time','new_members','returning_members','days_promoted_before','reach','signups']){const label=form.querySelector(`[name="${name}"]`)?.closest('label');if(label)more.lastElementChild.append(label)}
  const first=form.querySelector('.optional-fields');if(first)first.before(more);else form.append(more);
  form.querySelectorAll('.form-grid').forEach(grid=>{if(!grid.children.length)grid.remove()});
}
