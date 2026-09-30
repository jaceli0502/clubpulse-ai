import {sorted} from './analytics/stats.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const present = value => value != null && value !== '' && (!Array.isArray(value) || value.length > 0);
const dateLabel = value => new Date(value + 'T12:00:00Z').toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric', timeZone:'UTC'});

export function createMeetingInspection(rows) {
  const meetings = sorted(rows);
  let selectedIndex = meetings.length - 1;
  let previewIndex = null;
  return {
    meetings,
    get selectedMeeting() { return meetings[selectedIndex] ?? null; },
    get selectedIndex() { return selectedIndex; },
    get previewIndex() { return previewIndex; },
    select(index) { if (Number.isInteger(index) && meetings[index]) selectedIndex = index; },
    preview(index) { previewIndex = Number.isInteger(index) && meetings[index] ? index : null; },
    dismissPreview() { previewIndex = null; }
  };
}

export function meetingDetailsHTML(meeting) {
  if (!meeting) return '<p>Import a meeting to inspect its details.</p>';
  const promotion = meeting.promotion_channels?.length ? meeting.promotion_channels.join(' + ') : meeting.promotion;
  const metadata = [
    ['Meeting type', meeting.type], ['Meeting time', meeting.time],
    ['Promotion', promotion, true],
    ['Promotion started', present(meeting.days_promoted_before) ? `${meeting.days_promoted_before} ${meeting.days_promoted_before === 1 ? 'day' : 'days'} before` : null],
    ['Instagram reach', meeting.reach], ['Signups', meeting.signups],
    ['Special event', present(meeting.special_event) ? (meeting.special_event ? 'Yes' : 'No') : null],
    ['Topic', meeting.topic, true]
  ].filter(([,value]) => present(value));
  const members = [[meeting.new_members,'new'],[meeting.returning_members,'returning']]
    .filter(([value]) => present(value)).map(([value,label]) => `<span><strong>${esc(value)}</strong> ${label}</span>`).join('');
  return `<p class="inspector-date">${esc(dateLabel(meeting.date))}</p>
    ${present(meeting.name) ? `<h4 class="inspector-name">${esc(meeting.name)}</h4>` : ''}
    <p class="inspector-attendance"><strong>${esc(meeting.attendance)}</strong> <span>attendees</span></p>
    ${members ? `<p class="inspector-members">${members}</p>` : ''}
    ${metadata.length ? `<dl class="inspector-metadata">${metadata.map(([label,value,wide]) => `<div${wide ? ' class="inspector-wide"' : ''}><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : ''}
    ${present(meeting.notes) ? `<div class="inspector-notes"><h5>Notes</h5><p>${esc(meeting.notes)}</p></div>` : ''}`;
}

export function meetingInspectorHTML(rows) {
  const state = createMeetingInspection(rows);
  return `<aside class="meeting-inspector" aria-labelledby="inspector-heading">
    <h3 id="inspector-heading">Inspect a meeting</h3>
    <p class="inspector-help" id="inspector-help">Want the full details? Choose a meeting to inspect.</p>
    <label class="chart-meeting-label"><span class="sr-only">Inspect a meeting</span><select id="chart-meeting" aria-describedby="inspector-help">${state.meetings.map((r,i) => `<option value="${i}"${i === state.selectedIndex ? ' selected' : ''}>${esc(dateLabel(r.date))}${r.name ? ' · ' + esc(r.name) : ''}</option>`).join('')}</select></label>
    <div id="meeting-details" class="meeting-details" aria-live="polite" aria-atomic="true">${meetingDetailsHTML(state.selectedMeeting)}</div>
  </aside>`;
}

// The selector writes only the inspector. Chart events write only the preview.
export function bindMeetingInspection(root, rows, tooltipHTML) {
  const state = createMeetingInspection(rows);
  const selector = root.querySelector('#chart-meeting');
  const details = root.querySelector('#meeting-details');
  const plot = root.querySelector('.attendance-plot');
  const floating = root.querySelector('#chart-point-tooltip');
  if (!selector || !plot) return state;
  const points = [...plot.querySelectorAll('[data-meeting-point]')];
  const hide = () => {
    state.dismissPreview();
    floating.hidden = true;
    points.forEach(point => { point.removeAttribute('aria-describedby'); point.removeAttribute('aria-pressed'); });
  };
  const show = index => {
    const meeting = state.meetings[index];
    if (!meeting) return;
    hide();
    state.preview(index);
    const point = points[index];
    floating.innerHTML = tooltipHTML(meeting);
    floating.hidden = false;
    point.setAttribute('aria-describedby', 'chart-point-tooltip');
    point.setAttribute('aria-pressed', 'true');
    const x = parseFloat(point.style.left) / 100 * plot.clientWidth;
    const y = parseFloat(point.style.top) / 100 * plot.clientHeight;
    const width = floating.offsetWidth, height = floating.offsetHeight;
    floating.style.left = Math.max(0, Math.min(plot.clientWidth - width, x - width / 2)) + 'px';
    floating.style.top = (y - height - 16 >= 0 ? y - height - 16 : y + 18) + 'px';
  };
  selector.onchange = () => {
    state.select(Number(selector.value));
    details.innerHTML = meetingDetailsHTML(state.selectedMeeting);
  };
  points.forEach(point => {
    const index = Number(point.dataset.meetingPoint);
    point.onmouseenter = () => show(index);
    point.onmouseleave = hide;
    point.onfocus = () => show(index);
    point.onblur = hide;
    point.onclick = () => show(index);
  });
  plot.onmouseleave = hide;
  root.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
  root.addEventListener('pointerdown', event => { if (!plot.contains(event.target)) hide(); });
  return state;
}
