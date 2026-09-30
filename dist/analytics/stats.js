export const finite = x => typeof x==='number'&&Number.isFinite(x);
export const mean = xs => xs.length?xs.reduce((s,x)=>s+x,0)/xs.length:null;
export const median = xs => {if(!xs.length)return null;const a=[...xs].sort((a,b)=>a-b),i=Math.floor(a.length/2);return a.length%2?a[i]:(a[i-1]+a[i])/2};
export const sorted = rows => [...rows].sort((a,b)=>a.date.localeCompare(b.date)||String(a.id).localeCompare(String(b.id)));
export const pct = (value,base) => finite(value)&&finite(base)&&base!==0?(value-base)/Math.abs(base)*100:null;
export const stdev = a => a.length?Math.sqrt(mean(a.map(x=>(x-mean(a))**2))):null;
export const fmt = x => finite(x)?Number(x.toFixed(1)).toLocaleString('en-US'):'unavailable';
export function pearson(pairs){if(pairs.length<2)return null;const x=mean(pairs.map(p=>p[0])),y=mean(pairs.map(p=>p[1]));let xy=0,xx=0,yy=0;for(const[a,b]of pairs){xy+=(a-x)*(b-y);xx+=(a-x)**2;yy+=(b-y)**2}return xx&&yy?Math.max(-1,Math.min(1,xy/Math.sqrt(xx*yy))):null}
export const sample = (rows, predicate) => ({rows:rows.filter(predicate),excluded:rows.filter(r=>!predicate(r)).map(r=>({id:r.id,row:r.sourceRow??null}))});
