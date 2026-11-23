import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
export async function renderDevPage(){
 const path=location.pathname.replace(/\/$/,'')||'/';
 const root=createRoot(document.getElementById('root')!);
 if(path.startsWith('/solutions/')){const {default:Page}=await import('./ServicePage');flushSync(()=>root.render(<Page slug={path.split('/')[2]}/>));}
 else{const {default:Page}=await(path==='/guides'?import('./GuidePage'):path==='/privacy'?import('./PrivacyPage'):import('./App'));flushSync(()=>root.render(<React.StrictMode><Page/></React.StrictMode>));}
}
