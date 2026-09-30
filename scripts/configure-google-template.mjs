// Run: node scripts/configure-google-template.mjs "https://docs.google.com/spreadsheets/d/REAL_ID/edit"
import fs from 'node:fs/promises';
import {googleTemplateCopyURL} from '../dist/site-config.js';
const url=googleTemplateCopyURL(process.argv[2] || '');
if(!url)throw Error('Provide the actual public Google spreadsheet URL. Nothing was changed.');
const path=new URL('../dist/site-config.js',import.meta.url);
const source=await fs.readFile(path,'utf8');
const next=source.replace(/export const GOOGLE_SHEETS_TEMPLATE_URL = '[^']*';/,`export const GOOGLE_SHEETS_TEMPLATE_URL = '${url}';`);
if(next===source&&!source.includes(url))throw Error('Configuration declaration not found. Nothing was changed.');
await fs.writeFile(path,next);
console.log('Configured '+url+'. Verify signed-out viewing and Google copy flow, then redeploy dist to the existing Netlify project.');
