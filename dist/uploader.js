import {importFile} from './importers.js';
export function uploaderHTML(label='Upload spreadsheet'){
  return `<div class="upload-dropzone" role="region" aria-label="Spreadsheet upload"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H6V3h1Zm7 0v5h4M9 12h6M9 16h6"/></svg><strong>Drop your spreadsheet here</strong><p>Excel (.xlsx) or CSV (.csv) · Up to 3 MB</p><div class="toolbar"><button type="button" class="button primary" id="upload-spreadsheet">${label}</button><input id="csv-file" type="file" accept=".xlsx,.csv" aria-label="Excel or CSV" hidden></div></div><p class="error" id="import-error" role="alert"></p><p id="import-help" hidden>Make sure you’re using the ClubPulse template or check your column names. <a href="#sheets">View Google Sheets Template</a></p><div id="import-preview" aria-live="polite"></div>`;
}
export function importErrorMessage(error){return /required.*column|missing.*column|date.*attendance.*column|column.*date.*attendance/i.test(error.message)?"ClubPulse couldn't find a Date or Attendance column.":error.message}
export function bindUploader(root,{coverageHTML,qualityHTML,onImportSuccess}){
  const input=root.querySelector('#csv-file'),preview=root.querySelector('#import-preview'),error=root.querySelector('#import-error'),help=root.querySelector('#import-help');
  let run=0;
  const open=()=>{input.value='';input.click()};
  root.querySelector('#upload-spreadsheet').onclick=open;
  const handle=async file=>{
    if(!file)return;const current=++run;
    root.classList.remove('import-ready');error.textContent='';help.hidden=true;preview.textContent='Checking your spreadsheet…';
    try{
      const checked=await importFile(file);if(!root.contains(input)||!input.isConnected||current!==run)return;
      if(!checked.rows.length)throw Error('No usable meetings. Check your Date and Attendance values.');
      preview.innerHTML=`<p class="overline">Spreadsheet checked</p><h1 tabindex="-1">Your data is ready</h1><p class="ready-filename"></p><p class="lead"><strong class="ready-count">${checked.rows.length}</strong> meetings checked and ready to import.</p>${coverageHTML(checked.rows)}<details><summary>Review import checks</summary>${qualityHTML(checked.quality)}</details><p class="footnote">Continuing replaces the current workspace. Replace or delete fictional example rows before analyzing your club.</p><button class="button primary" id="confirm-import">See what ClubPulse found →</button> <button class="text-link" id="choose-another">Choose another file</button>`;
      preview.querySelector('.ready-filename').textContent=file.name;
      if(root.querySelector('#import-section')?.parentElement===root)root.classList.add('import-ready');
      preview.querySelector('#choose-another').onclick=open;
      preview.querySelector('#confirm-import').onclick=async e=>{e.currentTarget.disabled=true;await onImportSuccess(checked,file)};
      preview.querySelector('h1').focus();preview.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }catch(err){if(!input.isConnected||current!==run)return;preview.innerHTML='';error.textContent=importErrorMessage(err);help.hidden=false;error.scrollIntoView({block:'center'})}
  };
  input.onchange=()=>handle(input.files[0]);
  const zone=root.querySelector('.upload-dropzone');
  zone.ondragover=e=>{e.preventDefault();zone.classList.add('is-dragover')};
  zone.ondragleave=e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove('is-dragover')};
  zone.ondrop=e=>{e.preventDefault();zone.classList.remove('is-dragover');if(e.dataTransfer.files.length!==1){++run;root.classList.remove('import-ready');preview.innerHTML='';error.textContent='Choose one spreadsheet at a time.';return}handle(e.dataTransfer.files[0])};
}
