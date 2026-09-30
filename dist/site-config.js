// Set only to the public, fictional template. Never use a club's attendance sheet.
export const GOOGLE_SHEETS_TEMPLATE_URL = 'https://docs.google.com/spreadsheets/d/1LrZedKCb6SmFKLZONsbBbStwczmKsBqjhBb1kg-hGZA/copy';
export function googleTemplateCopyURL(value=GOOGLE_SHEETS_TEMPLATE_URL){
  if(!value)return null;
  try{const u=new URL(value);const m=u.pathname.match(/^\/spreadsheets\/d\/([A-Za-z0-9_-]+)(?:\/|$)/);return u.protocol==='https:'&&u.hostname==='docs.google.com'&&m?`https://docs.google.com/spreadsheets/d/${m[1]}/copy`:null}catch{return null}
}
