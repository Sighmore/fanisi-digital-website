// No provider, storage, cookies or network calls. An approved analytics adapter
// may opt in only after appropriate consent; never include enquiry field values.
let measurementConsent=false;
export function setMeasurementConsent(allowed:boolean){measurementConsent=allowed;}
export function measure(event:string,placement='page'){
 if(!measurementConsent)return;
 const device=innerWidth<768?'mobile':innerWidth<1100?'tablet':'desktop';
 window.dispatchEvent(new CustomEvent('fanisi:conversion',{detail:{event,placement,path:location.pathname,device}}));
}
window.addEventListener('fanisi:measurement-consent',event=>setMeasurementConsent((event as CustomEvent).detail===true));
