// KUROSEI — Showcase project data
// All projects are fictional case studies created for portfolio demonstration.

export type ProjectMedia = {
  prompt: string;
  aspect: 'video' | 'square' | 'portrait' | 'ultrawide';
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  category: 'BRANDING' | 'WEB' | 'MOTION' | 'CAMPAIGN';
  sector: string;
  year: string;
  color: string;
  featured: boolean;
  services: string[];
  tagline: string;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  cover: ProjectMedia;
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: 'nova-retail',
    title: 'NOVA',
    subtitle: 'RETAIL',
    client: 'Nova Retail Group',
    category: 'WEB',
    sector: 'Fashion / E-Commerce',
    year: '2026',
    color: '#0000ff',
    featured: true,
    services: ['E-Commerce Strategy', 'UX / UI Design', 'Frontend Development', 'Motion Design'],
    tagline: 'A flagship digital store for a fashion house that refuses to feel digital.',
    description:
      'Nova came to us with a legacy platform that was losing customers faster than it converted them. We rebuilt their entire digital retail experience from the ground up — headless architecture, a bespoke design system, and interactions engineered to feel like handling the product itself.',
    challenge:
      'Six-second page loads. A 68% cart abandonment rate. A brand celebrated for tactile, physical craft trapped inside a template store that looked like everyone else. Nova needed a digital flagship that could carry the weight of the brand — without sacrificing an ounce of performance.',
    approach:
      'We moved Nova to a fully headless stack and designed "Prism", a modular design system built around their seasonal drops. Every interaction — from the fabric zoom to the drag-to-explore lookbooks — was prototyped in motion first, then engineered to ship at 60fps. Checkout was compressed from five steps to one continuous gesture.',
    outcome:
      'The new flagship launched alongside their SS26 collection and immediately became the brand’s highest-converting channel. What was a liability is now the model their retail partners ask to license.',
    metrics: [
      { value: '+212%', label: 'CONVERSION RATE' },
      { value: '0.8s', label: 'LARGEST CONTENTFUL PAINT' },
      { value: '+64%', label: 'AVERAGE ORDER VALUE' },
    ],
    quote: {
      text: 'KUROSEI didn’t redesign our store. They redesigned what our customers think shopping online can feel like.',
      author: 'Mika Ashworth',
      role: 'CEO, Nova Retail Group',
    },
    cover: {
      prompt: 'Flagship e-commerce experience: dark editorial layout, oversized product photography, fabric-level zoom, one-gesture checkout flow.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Product detail page: 3D fabric zoom with inertia, floating size selector, add-to-cart morph animation.', aspect: 'video' },
      { prompt: 'Mobile checkout: single continuous gesture from cart to confirmation, haptic-timed micro-interactions.', aspect: 'portrait' },
      { prompt: 'Seasonal lookbook: drag-to-explore horizontal editorial with parallax typography.', aspect: 'square' },
    ],
  },
  {
    slug: 'apex-studios',
    title: 'APEX',
    subtitle: 'STUDIOS',
    client: 'Apex Studios',
    category: 'BRANDING',
    sector: 'Film Production',
    year: '2026',
    color: '#0000ff',
    featured: true,
    services: ['Brand Strategy', 'Visual Identity', 'Kinetic Logo System', 'Brand Guidelines'],
    tagline: 'An identity that moves like the films it stands behind.',
    description:
      'Apex Studios produces some of the most visually ambitious independent films in Asia — but their identity was a static logo designed a decade ago. We built them a kinetic brand system where motion is the primary medium and the still logo is just a single frame of something larger.',
    challenge:
      'How do you brand a company whose entire output is 24 frames per second? Apex’s old identity collapsed the moment it appeared next to their work. They needed a system that could open a festival screening, brand a title sequence, and still function on a business card.',
    approach:
      'We designed the identity in motion first. The Apex mark is generated from a light-sweep — a single beam crossing a dark frame — and every static application is a captured moment of that sweep. We delivered a parametric logo tool, a full type and color system, and broadcast-ready title packages.',
    outcome:
      'The identity debuted at their showcase in Tokyo and was picked up by the design press within the week. Twelve international design awards followed. More importantly: it finally looks like them.',
    metrics: [
      { value: '3×', label: 'UNAIDED BRAND RECALL' },
      { value: '12', label: 'INTERNATIONAL DESIGN AWARDS' },
      { value: '40+', label: 'SYSTEM DELIVERABLES' },
    ],
    quote: {
      text: 'For the first time, our brand holds the screen next to our films instead of apologizing for being there.',
      author: 'Daniel Reyes',
      role: 'Founder, Apex Studios',
    },
    cover: {
      prompt: 'Kinetic brand identity: light-sweep logo generation, dark cinematic frames, parametric mark variations across media.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Logo animation: single light beam crossing dark frame, freezing into the static Apex mark.', aspect: 'video' },
      { prompt: 'Brand applications: title cards, festival posters, letterhead — captured frames of the moving identity.', aspect: 'square' },
      { prompt: 'Broadcast package: lower thirds, end cards, and title sequences built from the kinetic system.', aspect: 'video' },
    ],
  },
  {
    slug: 'horizon-tech',
    title: 'HORIZON',
    subtitle: 'TECH',
    client: 'Horizon Technologies',
    category: 'WEB',
    sector: 'AI Infrastructure',
    year: '2025',
    color: '#0000ff',
    featured: true,
    services: ['Narrative Strategy', 'Web Design', 'WebGL Development', 'Data Visualization'],
    tagline: 'Making invisible infrastructure impossible to ignore.',
    description:
      'Horizon builds the compute layer that AI companies run on — critical, complex, and completely invisible. Ahead of their Series B, we built them a website that turns server racks and network topology into something investors could feel: a real-time WebGL visualization of their actual global network.',
    challenge:
      'Infrastructure companies all say the same three words: fast, reliable, scalable. Horizon needed to raise a Series B in a crowded market where every competitor’s website was interchangeable. The product is genuinely impressive — the problem was making anyone see it.',
    approach:
      'We connected the website directly to Horizon’s network telemetry. The hero isn’t a stock render — it’s their real global traffic, visualized live in WebGL at 60fps. Every claim on the site is backed by a number that updates in real time. The site doesn’t say "trust us"; it shows the receipts.',
    outcome:
      'The site launched eight weeks before their raise closed. Their CEO told us investors kept the live network view open during partner meetings. The round was oversubscribed.',
    metrics: [
      { value: '$48M', label: 'SERIES B CLOSED POST-LAUNCH' },
      { value: '4:12', label: 'AVERAGE SESSION DURATION' },
      { value: 'SOTD', label: 'AWWWARDS SITE OF THE DAY' },
    ],
    quote: {
      text: 'Investors stopped asking what we do. The site answers it before we say a word.',
      author: 'Priya Sharma',
      role: 'CEO, Horizon Technologies',
    },
    cover: {
      prompt: 'Live network visualization: real-time global traffic rendered in WebGL, dark interface with blue data streams.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Hero section: rotating globe of live network topology, packets tracing real routes between data centers.', aspect: 'video' },
      { prompt: 'Metrics dashboard: real-time uptime, latency, and throughput counters integrated into the marketing site.', aspect: 'video' },
      { prompt: 'Scroll-driven story: infrastructure layers peeling apart as the user descends the page.', aspect: 'square' },
    ],
  },
  {
    slug: 'stellar-audio',
    title: 'STELLAR',
    subtitle: 'AUDIO',
    client: 'Stellar Audio',
    category: 'CAMPAIGN',
    sector: 'Consumer Electronics',
    year: '2025',
    color: '#0000ff',
    featured: true,
    services: ['Campaign Strategy', 'Art Direction', 'Film Production', 'Audio-Reactive Visuals'],
    tagline: 'A launch campaign you can see with your ears.',
    description:
      'For the launch of Stellar’s flagship headphones, we built an entire campaign around a single idea: what does this sound look like? Nine films, each driven by a custom audio-reactive engine that translated the headphones’ actual frequency response into visuals — no fakery, no stock waveforms.',
    challenge:
      'The headphone market runs on the same ad: slow pans over matte black hardware, a celebrity nodding to unheard music. Stellar’s engineering genuinely was different — a driver design with measurably flatter response — but "measurably flatter response" has never sold a headphone to anyone.',
    approach:
      'We built a custom audio-reactive rendering engine and fed it the real measured output of the Stellar driver versus competitors. The differences became visible — their sound renders as clean, continuous forms while competitors’ render distorted. Nine films, nine genres, one system. The campaign line: "Hear the difference. Now see it."',
    outcome:
      'The launch film hit 28 million organic views in the first month. The first production run sold out in three weeks. The audio-reactive engine now powers Stellar’s retail installations in four cities.',
    metrics: [
      { value: '28M', label: 'ORGANIC VIEWS / 30 DAYS' },
      { value: '3 WKS', label: 'TO FIRST-RUN SELLOUT' },
      { value: '+340%', label: 'SOCIAL ENGAGEMENT' },
    ],
    quote: {
      text: 'They made frequency response charts feel like a music video. I still don’t fully understand how.',
      author: 'Tomas Lindqvist',
      role: 'CMO, Stellar Audio',
    },
    cover: {
      prompt: 'Audio-reactive launch film: headphone driver frequency response rendered as flowing luminous forms in a dark studio.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Hero film: real measured sound translating into continuous liquid visual forms, product reveal at crescendo.', aspect: 'video' },
      { prompt: 'Comparison sequence: Stellar’s clean waveform forms versus distorted competitor renders, side by side.', aspect: 'video' },
      { prompt: 'Retail installation: floor-to-ceiling audio-reactive wall responding to live in-store listening sessions.', aspect: 'square' },
    ],
  },
  {
    slug: 'zenith-finance',
    title: 'ZENITH',
    subtitle: 'FINANCE',
    client: 'Zenith Finance',
    category: 'WEB',
    sector: 'Fintech',
    year: '2025',
    color: '#0000ff',
    featured: false,
    services: ['Product Design', 'Design System', 'Frontend Architecture', 'Motion Guidelines'],
    tagline: 'Two million users. Zero tolerance for confusion.',
    description:
      'Zenith’s trading platform had grown feature by feature into a maze. We redesigned the entire product around a single principle — every screen answers one question — and built the design system to keep it that way as they scale.',
    challenge:
      'Power users loved Zenith’s depth and new users drowned in it. Support tickets grew faster than the user base. The product needed radical simplification without amputating the features their most valuable traders depended on.',
    approach:
      'We ran task-time studies with 40 traders, then rebuilt the information architecture around observed behavior instead of org-chart logic. The new system, "Meridian", uses progressive disclosure — every screen leads with one decision, with depth one deliberate gesture away. Real-time data visualization was redesigned for glanceability at trading speed.',
    outcome:
      'Task completion time dropped by more than a third while feature usage among power users actually increased. The support queue finally bent downward.',
    metrics: [
      { value: '-37%', label: 'AVG. TASK COMPLETION TIME' },
      { value: '4.9', label: 'APP STORE RATING' },
      { value: '2.1M', label: 'ACTIVE USERS ON MERIDIAN' },
    ],
    cover: {
      prompt: 'Trading platform redesign: dark glanceable dashboard, one-decision screens, real-time data visualization at speed.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Trading view: progressive disclosure from single-decision overview into full order-book depth.', aspect: 'video' },
      { prompt: 'Meridian design system: component library, motion timing tokens, data-viz color semantics.', aspect: 'square' },
      { prompt: 'Mobile companion: portfolio pulse view designed for two-second glances.', aspect: 'portrait' },
    ],
  },
  {
    slug: 'pulse-health',
    title: 'PULSE',
    subtitle: 'HEALTH',
    client: 'Pulse Health',
    category: 'MOTION',
    sector: 'Digital Health',
    year: '2025',
    color: '#0000ff',
    featured: false,
    services: ['Motion System', 'Interaction Design', 'Animation Library', 'Accessibility Review'],
    tagline: 'Motion designed to lower your heart rate, not raise it.',
    description:
      'Pulse asked us a question we’d never heard from a client: can animation be therapeutic? We designed their entire motion language around clinical research on visual pacing — 120+ animations engineered to calm, delivered as a production-ready library their team ships with daily.',
    challenge:
      'Health apps borrow their motion from social apps — snappy, dopamine-tuned, attention-hungry. For an app serving people managing anxiety and chronic conditions, that default is actively harmful. Pulse needed motion that served the user’s nervous system, not the engagement dashboard.',
    approach:
      'We worked with Pulse’s clinical advisors to define pacing principles from breathing-exercise research — nothing on screen moves faster than a resting exhale. We built 120+ animations on those curves: transitions, celebrations, loading states, and a signature "breathing" home screen that syncs to guided sessions. Everything ships as tokens, not videos.',
    outcome:
      'Thirty-day retention jumped by more than half — in a category where most apps lose 90% of users. Pulse’s clinical team now cites the motion system in their published product research.',
    metrics: [
      { value: '+58%', label: 'DAY-30 RETENTION' },
      { value: '92', label: 'NET PROMOTER SCORE' },
      { value: '120+', label: 'MOTION PATTERNS SHIPPED' },
    ],
    quote: {
      text: 'Users describe the app as "calming" in reviews. That word appears 400% more often since the new motion system.',
      author: 'Dr. Amara Chen',
      role: 'Chief Product Officer, Pulse Health',
    },
    cover: {
      prompt: 'Therapeutic motion system: breathing-paced transitions, calm celebration states, exhale-speed animation curves.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Breathing home screen: interface elements expanding and contracting in sync with guided breath sessions.', aspect: 'portrait' },
      { prompt: 'Motion library: 120 animation patterns organized by emotional register and clinical pacing tier.', aspect: 'video' },
      { prompt: 'Before / after: standard snappy transitions versus exhale-paced Pulse equivalents.', aspect: 'video' },
    ],
  },
  {
    slug: 'vertex-gaming',
    title: 'VERTEX',
    subtitle: 'GAMING',
    client: 'Vertex Gaming',
    category: 'BRANDING',
    sector: 'Esports',
    year: '2024',
    color: '#0000ff',
    featured: false,
    services: ['Brand Identity', 'Jersey & Merch Design', 'Broadcast Package', 'Social Toolkit'],
    tagline: 'A brand built to survive a stadium screen and a sticker sheet.',
    description:
      'Vertex was a top-five esports org wearing a logo made in a weekend seven years ago. We rebuilt their identity for every surface competitive gaming touches — from 4K broadcast overlays to 32-pixel avatars — and handed their content team a system they could run at internet speed.',
    challenge:
      'Esports brands live or die at two extremes: enormous (arena screens, broadcast) and tiny (avatars, badges, emotes). Vertex’s identity failed at both. And unlike traditional sports, their fans remix everything — the brand had to survive being memed.',
    approach:
      'We designed the Vertex mark as a modular chevron system that locks up differently at every scale — full crest for broadcast, mid-form for jerseys, and a single-stroke mark that stays legible at 16 pixels. The color system centers on a signature electric blue tuned for both OLED broadcast and print. We shipped the whole thing as a self-serve toolkit their designers use daily.',
    outcome:
      'Merch revenue nearly tripled in the first year. The new jersey sold out before the split started. The brand survived the memes — mostly because the fans made better ones with the toolkit.',
    metrics: [
      { value: '+190%', label: 'MERCH REVENUE YOY' },
      { value: '2.4M', label: 'SOCIAL FOLLOWERS ADDED' },
      { value: '30+', label: 'BROADCAST SCENES DELIVERED' },
    ],
    cover: {
      prompt: 'Esports identity: modular chevron mark scaling from arena broadcast graphics down to 16-pixel avatars, electric blue system.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Broadcast package: in-game overlays, player cams, victory sequences in the Vertex system.', aspect: 'video' },
      { prompt: 'Jersey and merch line: 2024 competitive kit with modular chevron lockups.', aspect: 'square' },
      { prompt: 'Scale test: identity legibility from stadium screen to Discord avatar in one continuous zoom.', aspect: 'video' },
    ],
  },
  {
    slug: 'flux-creative',
    title: 'FLUX',
    subtitle: 'CREATIVE',
    client: 'Flux Creative',
    category: 'MOTION',
    sector: 'Arts & Culture',
    year: '2024',
    color: '#0000ff',
    featured: false,
    services: ['Creative Direction', 'AI-Assisted Pipeline', 'Film Production', 'Sound Design'],
    tagline: 'A six-minute film made by four people and one very unusual pipeline.',
    description:
      'Flux commissioned us to make their annual brand film — with a catch: document the process as honestly as the output. We built a hybrid AI-assisted production pipeline, kept every human decision in the loop, and produced a six-minute film that toured six festivals with a crew of four.',
    challenge:
      'The brief asked for the production value of a thirty-person studio on a four-person budget — and for the process itself to be part of the story. Naive AI generation produces mush; the challenge was building a pipeline where machine speed served human taste instead of replacing it.',
    approach:
      'We designed a pipeline where every AI-generated frame passed through human keyframing, color, and edit decisions — machines for coverage, people for taste. Custom tooling let our director art-direct generations in real time rather than gambling on prompts. The film’s making-of, released alongside it, shows every seam honestly.',
    outcome:
      'The film screened at six festivals and the making-of outperformed it online — studios now reference our pipeline documentation in their own AI production guidelines. Made entirely in-house.',
    metrics: [
      { value: '6', label: 'FESTIVAL SELECTIONS' },
      { value: '1.2M', label: 'ORGANIC VIEWS COMBINED' },
      { value: '4', label: 'PERSON CREW, END TO END' },
    ],
    cover: {
      prompt: 'Hybrid AI film production: director art-directing generative frames in real time, human keyframes over machine coverage.',
      aspect: 'ultrawide',
    },
    media: [
      { prompt: 'Film excerpt: continuous morphing sequence blending photographed and generated frames seamlessly.', aspect: 'video' },
      { prompt: 'Pipeline documentation: the real-time art-direction tool with generation parameters exposed.', aspect: 'video' },
      { prompt: 'Festival screening: the film projected at 12 meters wide, Rotterdam premiere.', aspect: 'square' },
    ],
  },
];

export const categories = ['ALL', 'WEB', 'BRANDING', 'MOTION', 'CAMPAIGN'] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
