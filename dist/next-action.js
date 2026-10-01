import {esc} from './clarity.js';
import {fmt} from './analytics/stats.js';
export const demoContextHTML=()=>'<section id="demo-context" class="demo-context" aria-label="Demo workspace"><div><strong>DEMO WORKSPACE</strong><span>Fictional club data</span></div><a class="button primary" href="#import">Analyze My Club →</a></section>';
export const demoConversionHTML=()=>'<section class="demo-conversion"><h2>Ready to analyze your own club?</h2><p>ClubPulse can run the same analysis using your meeting history.</p><a class="button primary" href="#import">Analyze My Club →</a> <a class="text-link" href="#demo">Restart Demo</a></section>';
export function recommendationHTML(outputs,{demo=false}={}){
 const best=outputs.compare_meeting_types?.best;
 const fallback=outputs.recommend_next_steps?.recommendations?.[0];
 const supported=best&&best.difference>0;
 const title=supported?`Run ${/^[aeiou]/i.test(best.name)?'an':'a'} ${best.name}`:fallback?.title||'Build your meeting history';
 return `<section class="next-idea next-action" aria-labelledby="next-action-title"><p class="eyebrow">${demo?'04 · ':''}Recommended next move</p><h2 id="next-action-title">${esc(title)}</h2><p class="action-reason">${supported?'This format historically performed better for this club.':esc(fallback?.reason||'Record a few more meetings to find a pattern worth testing.')}</p>${supported?`<dl class="action-evidence"><div><dt>average attendance</dt><dd>${fmt(best.average)}</dd></div><div><dt>meetings observed</dt><dd>${best.count}</dd></div><div><dt>vs club average</dt><dd>+${fmt(best.difference)}</dd></div></dl><p>${esc(best.name)} meetings averaged ${fmt(best.average)} attendees across ${best.count} past meetings — about ${fmt(best.difference)} more than the club’s overall average.</p><p>Try this format while keeping your meeting time and promotion approach similar. See whether the pattern holds.</p>`:`<p>${esc(fallback?.evidence||'No reliable comparison yet.')}</p>`}<p class="footnote">This is a historical association, not a guaranteed increase.</p><a class="button primary" href="#${demo?'demo/':''}predict"${supported?` data-plan-type="${esc(best.name)}"`:''}>Plan This Meeting →</a></section>`;
}
// A one-use, workspace-scoped preset changes only the recommended format.
export function applyRecommendationPreset(values,preset,mode,availableTypes){return preset?.mode===mode&&availableTypes.includes(preset.type)?{...values,type:preset.type}:{...values};}

