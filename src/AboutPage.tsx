import {PageShell} from './components/SiteChrome';
import {PageIntro,PageCallToAction} from './components/PageIntro';
import {AboutSection,ProblemSection} from './components/BusinessSections';
export default function AboutPage(){return <PageShell path="/about/"><PageIntro label="About" title="Built around your business." intro="Independent thinking. Connected solutions. Fanisi Digital brings your website, customer conversations and relationships into the same picture."/><AboutSection/><ProblemSection/><PageCallToAction/></PageShell>}
