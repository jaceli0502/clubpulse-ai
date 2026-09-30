import{calmView}from'./calm.js';
import{installInsightEvidence}from'./insight-evidence.js';
import{dataChoices}from'./clarity.js';
import{highlightsHTML}from'./journeys.js';
// Small, presentation-only improvements shared by the existing views.
export function improveNavigation({page,rows,isDemo,ready,outputs,escape:esc}){
  const root=document.querySelector('#page');
  if(page==='overview'){
    const actions=document.createElement('section');
    actions.className='quick-start card';
    actions.innerHTML=`<div><div class="eyebrow">${isDemo?'YOU’RE EXPLORING THE DEMO':'YOUR NEXT STEP'}</div><h2>${isDemo?'See how a meeting becomes an insight.':'What would you like to do?'}</h2><p>${isDemo?`These ${rows.length} fictional meetings are already analyzed. Start with the attendance chart, or try a question below.`:'Your meeting history is analyzed automatically. Add a meeting, ask a question, or plan your next event.'}</p></div><div class="quick-actions"><button class="button primary" id="quick-question">Ask about my ${isDemo?'sample ':''}club</button><a class="button" href="#${ready?'predict':'data'}">${ready?'Estimate next turnout':'Add a meeting'}</a>${isDemo?'<a class="text-link" href="#import">Use my own data →</a>':''}</div>`;
    root.querySelector('.notice')?.after(actions);if(outputs){actions.insertAdjacentHTML('afterend',highlightsHTML(outputs));actions.remove()}
    const ask=root.querySelector('.ask-card');
    const disclosure=document.createElement('details');disclosure.className='card section-gap ask-disclosure';
    disclosure.innerHTML='<summary>Ask a question about your club <span>Choose a suggestion or write your own</span></summary>';
    ask.replaceWith(disclosure);disclosure.append(ask);
    const openAsk=()=>{disclosure.open=true;disclosure.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('#club-question').focus({preventScroll:true})};const quick=document.querySelector('#quick-question');if(quick)quick.onclick=openAsk;const investigate=document.querySelector('#investigate-change');if(investigate)investigate.onclick=()=>{openAsk();document.querySelector('#club-question').value=outputs.calculate_attendance_trend.change<0?'Why is attendance dropping?':'What changed recently?';document.querySelector('#ask-form').requestSubmit()};
    const answer=document.querySelector('#ask-answer'),clear=document.createElement('button');clear.type='button';clear.className='text-link clear-answer';clear.textContent='Clear answer';clear.hidden=true;answer.after(clear);
    const observer=new MutationObserver(()=>{clear.hidden=!answer.textContent.trim()});observer.observe(answer,{childList:true,subtree:true});clear.onclick=()=>{answer.dispatchEvent(new Event('clear-analysis'));answer.replaceChildren();document.querySelector('#club-question').value='';document.querySelector('#club-question').focus()};
    const pulse=[...root.querySelectorAll('section.card')].find(s=>s.querySelector('.eyebrow')?.textContent==='MEETING PULSE');
    if(pulse){const details=document.createElement('details');details.className='card section-gap';details.innerHTML='<summary>How did the latest meeting go?</summary>';pulse.replaceWith(details);details.append(...pulse.childNodes)}
    const idea=root.querySelector('.next-idea');if(idea)root.querySelector('.metrics').after(idea);
    const chart=[...root.querySelectorAll('section.card')].find(s=>s.querySelector('h2')?.textContent==='Attendance over time');if(chart){if(rows.length<2)chart.remove();else{const supporting=document.createElement('details');supporting.className='section-gap supporting-chart';supporting.innerHTML='<summary>Attendance over time</summary>';chart.replaceWith(supporting);supporting.append(chart)}};
    root.querySelectorAll('.metric-label').forEach(label=>{if(label.textContent.includes('Recent momentum'))label.firstChild.textContent='Attendance trend'});
    const question=document.querySelector('#club-question');question.placeholder='For example: Why did attendance drop?';
  }
  if(page==='data'){
    root.querySelector('.page-heading').insertAdjacentHTML('afterend',dataChoices());
    root.querySelectorAll('.upload-choice').forEach(b=>b.onclick=()=>{const section=root.querySelector('#import-section');section.open=true;const file=root.querySelector('#csv-file');file.accept=b.dataset.format;file.click()});
  }
  if(page==='predict'){
    const intro=root.querySelector('.page-heading p');if(intro)intro.textContent=ready?'Try different meeting setups and see what your club history suggests.':`You have ${rows.length} meeting${rows.length===1?'':'s'}. Add more history to unlock a useful estimate.`;
    const back=document.createElement('a');back.href='#overview';back.className='text-link back-link';back.textContent='← Back to my dashboard';root.prepend(back);
  }
  calmView({page,root,rows});if(page==='overview')installInsightEvidence(root,rows,isDemo);
}
