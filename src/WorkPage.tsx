import {PageShell} from './components/SiteChrome';
import {PageIntro,PageCallToAction} from './components/PageIntro';
import {OurWork} from './components/OurWork';
import {GrowthDemo} from './components/GrowthComponents';
export default function WorkPage(){return <PageShell path="/our-work/"><PageIntro label="Our work" title="Our work." intro="Explore a website built by Fanisi Digital, then try a sample customer journey to see how connected systems could support your business."/><OurWork/><GrowthDemo/><PageCallToAction/></PageShell>}
