export const site = {
  name: "Carl Nyvlt",
  role: "Senior UX/UI Designer with AI Creative Ideation",
  roleShort: "Senior UX/UI Designer",
  location: "Vancouver, BC",
  email: "carlnyvlt@gmail.com",
  phone: "1.604.345.1551",
  phoneHref: "tel:+16043451551",
  statement:
    "I'm a UX/UI designer with over 20 years of experience designing user-centred experiences for mobile and desktop applications.",
  intro:
    "Over 20 years as a UX/UI visual designer, I've worked with companies in Canada, the US and Europe. I've had the opportunity to use my communication, artistic and technical skills on several large projects from concept through to implementation.",
  bio: [
    "My specialty is the overall visual design and user experience for websites, web applications, tablets and mobile phones. I'm committed to excellence, innovation and attention to detail.",
    "I enjoy working with my clients to develop and implement exciting ideas that are practical and creative.",
  ],
  capabilities: [
    "Wireframing",
    "Navigation structures",
    "Journey mapping",
    "Mockups",
    "Prototyping",
    "Mobile design",
    "iOS",
    "Android",
  ],
};

/* ------------------------------------------------------------------
   AI-assisted design — the differentiator, so it is stated once here and
   given a section of its own on the home page and on /about.
   ------------------------------------------------------------------ */

export interface AiArea {
  index: string;
  label: string;
  body: string;
}

export const aiSkills = {
  /** Home-page headline. */
  headline:
    "AI-powered design tools, used across the whole process — not bolted on at the end.",
  /** /about — the shorter statement above the detail. */
  lead: "AI-powered design tools are part of the process from the first sketch to the final handoff, not an add-on at the end.",
  body: "I use them to accelerate ideation, content creation, prototyping and design exploration, then apply twenty years of craft to decide what actually ships. The work moves faster without giving up usability or user-centred outcomes.",
  areas: [
    {
      index: "01",
      label: "Ideation",
      body: "Generating and pressure-testing directions in hours rather than weeks, so more of the early thinking actually gets explored.",
    },
    {
      index: "02",
      label: "Content creation",
      body: "Drafting realistic copy, imagery and data up front, so designs are reviewed against real content instead of placeholder text.",
    },
    {
      index: "03",
      label: "Prototyping",
      body: "Turning concepts into interactive prototypes fast enough to put them in front of users and test the flow properly.",
    },
    {
      index: "04",
      label: "Design exploration",
      body: "Producing and comparing visual directions at volume, then refining the strongest by hand.",
    },
  ] satisfies AiArea[],
};

/** The AI tools, kept separate so every surface lists the same set. */
export const aiTools = ["Midjourney", "Figma AI", "ChatGPT", "Claude", "Runway"];

/* ------------------------------------------------------------------
   Design philosophy — the human-first position, argued in full on /philosophy.
   The short lines live in data/principles.ts; this is the case they belong to.
   ------------------------------------------------------------------ */

export interface CreedStep {
  index: string;
  title: string;
  body: string;
}

export const philosophy = {
  /** Opening paragraph, set beside the headline. */
  lead: "AI has widened what one designer can explore. It has not changed who is accountable for the result. My approach is to let the tools widen the search and keep the judgement — research, usability and craft — firmly human.",
  /** The argument, in the order it is made. */
  creed: [
    {
      index: "01",
      title: "The human sets the purpose",
      body: "Every project starts with the people who will use it — their goals, their context, the constraints they actually work under. AI is pointed at that problem. It does not get to define it.",
    },
    {
      index: "02",
      title: "AI widens the search",
      body: "Ideation, content, prototyping and visual exploration run at a volume that was never possible by hand, so more directions get generated, compared and pressure-tested before anything is committed.",
    },
    {
      index: "03",
      title: "Craft decides what ships",
      body: "Generated material is a starting point, never a deliverable. Hierarchy, typography, interaction states and accessibility are resolved by hand, to the same standard as any pre-AI project.",
    },
    {
      index: "04",
      title: "Usability is the test",
      body: "Speed is only worth having if the result is easier to use. Flows are still prototyped and tested with real users, and anything that fails that test gets changed, however good it looked.",
    },
  ] satisfies CreedStep[],
};

export interface Service {
  index: string;
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "User experience design",
    body: "By defining the needs of the user through demographic user research, we can outline application flows that focus on what each user would like to accomplish for their goals.",
  },
  {
    index: "02",
    title: "Interaction design",
    body: "Building a live interactive prototype application (MVP) that can be viewed on your iOS, Android or desktop. This illustrates how the application functions, along with focusing on the interactions.",
  },
  {
    index: "03",
    title: "User interface design",
    body: "By studying the demographics we can illustrate a variety of user interface designs that let the user easily recognise functionality in the application. The focus is on giving the user the best visual experience and enabling them to flow through the application seamlessly with a combination of content, wording and graphics.",
  },
  {
    index: "04",
    title: "Usability testing",
    body: "By designing interactive wireframes for mobile or web applications to illustrate functionality, we can test the flow with users and properly assess whether there are pain points to address before the design goes to development. This adds to a better user experience and development cost savings.",
  },
];

export const process = [
  { index: "01", label: "Research" },
  { index: "02", label: "Documentation" },
  { index: "03", label: "Defining users" },
  { index: "04", label: "Wireframing" },
  { index: "05", label: "Interactive testing" },
  { index: "06", label: "Hi-fidelity design" },
];

export const clients = [
  "Archer Petroleum",
  "Atlas Copco",
  "Aviso Wealth",
  "BCIT",
  "Binary Stream Software",
  "Biotrade Fund",
  "Bluerealm Solutions Corp.",
  "Canadian Nexus Ventures",
  "City of Ottawa / Poets' Pathway",
  "Climate Change Solutions",
  "Cokinetic Systems Corp.",
  "Compucom",
  "County of San Mateo",
  "Ferro Iron Ore",
  "ICBC",
  "Investor World Online",
  "Ionysys",
  "Lions Gate Metals",
  "MacDonald Dettwiler MDA",
  "Marifil Mines LTD.",
  "Maximizer Software",
  "Microsoft",
  "Netco Silver Inc.",
  "NextGen Integrated Engineering Inc.",
  "Optinet Systems Inc.",
  "Pacific Blue Cross",
  "Pacific Standard Properties",
  "Pivotal Corporation (CDC Software)",
  "Ramp Group",
  "Spark Integration Technologies",
  "Starfish Channel Builders",
  "TMS Consultancy",
];

export const toolGroups = [
  { label: "AI", items: aiTools },
  { label: "Design", items: ["Sketch", "Photoshop", "Illustrator", "Invision", "Figma"] },
  { label: "Wireframing", items: ["Balsamiq", "Axure RP", "Sketch"] },
  { label: "Build", items: ["HTML", "CSS", "Bootstrap", "WordPress", "ServiceNow"] },
];
