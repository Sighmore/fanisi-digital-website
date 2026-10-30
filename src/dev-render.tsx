import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
export async function renderDevPage(){
 const path=location.pathname.replace(/\/$/,'') || '/';
 const {default:Page}=await(path==='/guides'?import('./GuidePage'):path==='/privacy'?import('./PrivacyPage'):import('./App'));
 flushSync(()=>createRoot(document.getElementById('root')!).render(<React.StrictMode><Page/></React.StrictMode>));
}
