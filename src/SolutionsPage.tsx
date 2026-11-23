import {PageShell} from './components/SiteChrome';
import {PageIntro,PageCallToAction} from './components/PageIntro';
import {SolutionsSection} from './components/BusinessSections';
import {ConnectedJourney} from './components/GrowthComponents';
export default function SolutionsPage(){return <PageShell path="/solutions/"><PageIntro label="Solutions" title="Three solutions. One bigger picture." intro="Website development, WhatsApp automation and customer relationship systems. Start with your business needs. Build the connections that matter."/><SolutionsSection/><ConnectedJourney/><PageCallToAction/></PageShell>}
