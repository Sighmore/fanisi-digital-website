import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
export async function renderDevPage(){
 const path=location.pathname.replace(/\/$/,'')||'/';
 const root=createRoot(document.getElementById('root')!);
 if(path.startsWith('/solutions/')&&path!=='/solutions'){const {default:Page}=await import('./ServicePage');flushSync(()=>root.render(<Page slug={path.split('/')[2]}/>));}
 else{const loaders:Record<string,()=>Promise<{default:React.ComponentType}>>={'/':()=>import('./App'),'/solutions':()=>import('./SolutionsPage'),'/our-work':()=>import('./WorkPage'),'/about':()=>import('./AboutPage'),'/contact':()=>import('./ContactPage'),'/guides':()=>import('./GuidePage'),'/privacy':()=>import('./PrivacyPage')};const {default:Page}=await(loaders[path]||loaders['/'])();flushSync(()=>root.render(<React.StrictMode><Page/></React.StrictMode>));}
}
