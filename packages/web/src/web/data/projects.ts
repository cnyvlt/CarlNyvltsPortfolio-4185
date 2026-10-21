import { type PhaseId } from "./phases";

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Which phase of the practice this engagement belongs to. */
  phase: PhaseId;
  year?: string;
  context: string;
  tasks: string[];
  tools: string[];
  disciplines: string[];
  thumbnail: string;
  cover: string;
  /** Shape of the primary artwork — drives the image plate aspect ratio. */
  orientation: "portrait" | "landscape";
  images: ProjectImage[];
  featured?: boolean;
  /** Surfaces the inline "Ask about this project" link that seeds the agent. */
  askAbout?: boolean;
}

const img = (slug: string, file: string, caption: string): ProjectImage => ({
  src: `/work/${slug}/${file}`,
  caption,
});

export const projects: Project[] = [
  {
    slug: "west-coast-inns",
    phase: "pre-ai",
    askAbout: true,
    orientation: "portrait",
    title: "West Coast Inns",
    client: "West Coast Village",
    context:
      "West Coast Village is an MVP application targeting rustic accommodation throughout the West Coast of Canada and the U.S. The work covered the full journey from discovery through to wireframes and high-fidelity screens.",
    tasks: ["Discovery", "Visual design", "Wire-framing"],
    tools: ["Sketch", "Invision"],
    disciplines: ["Visual design", "Wire-framing"],
    thumbnail: "/thumb/west-coast-inns.gif",
    cover: "/work/west-coast-inns/01-home.gif",
    featured: true,
    images: [
      img("west-coast-inns", "01-home.gif", "Home — high fidelity"),
      img("west-coast-inns", "02-home-wireframe.gif", "Home — wireframe"),
      img("west-coast-inns", "03-search.gif", "Search — high fidelity"),
      img("west-coast-inns", "04-search-wireframe.gif", "Search — wireframe"),
      img("west-coast-inns", "05-results.gif", "Results — high fidelity"),
      img("west-coast-inns", "06-results-wireframe.gif", "Results — wireframe"),
      img("west-coast-inns", "07-results-wireframe-phone.png", "Results — wireframe, phone screen"),
    ],
  },
  {
    slug: "eadvisor-aviso",
    phase: "pre-ai",
    askAbout: true,
    orientation: "landscape",
    title: "eAdvisor — Aviso Wealth",
    client: "Aviso Wealth",
    context:
      "Aviso Wealth is a national financial services company with approximately $90 billion in assets under administration and management, owned by the credit union Centrals, The Co-operators / CUMIS and Desjardins. They required concepts and ideations to illustrate functionality and layout for their eAdvisor application.",
    tasks: ["Research", "Concept ideations", "Interactive wire-framing"],
    tools: ["Research", "Sketch", "Invision"],
    disciplines: ["Research", "Wire-framing", "Visual design"],
    thumbnail: "/thumb/eadvisor-aviso.gif",
    cover: "/work/eadvisor-aviso/01-dashboard.png",
    featured: true,
    images: [
      img("eadvisor-aviso", "01-dashboard.png", "Advisor dashboard"),
      img("eadvisor-aviso", "02-client-dashboard.png", "Advisor view — client portfolio"),
      img("eadvisor-aviso", "03-holdings.png", "Holdings"),
      img("eadvisor-aviso", "04-performance.png", "Performance"),
      img("eadvisor-aviso", "05-smart-search.png", "Smart search"),
    ],
  },
  {
    slug: "microsoft-ramp",
    phase: "pre-ai",
    askAbout: true,
    orientation: "landscape",
    title: "Microsoft / Ramp Technology",
    client: "Microsoft, Ramp Technology",
    context:
      "Microsoft partnered with Ramp Technology to design and develop a tablet application delivered to pregnant patients who sign up with Advocate Healthcare. The application tracks a patient's pregnancy and health goals, gives access to a physician on the app, and lets patients sign up for classes.",
    tasks: [
      "Visual design",
      "Interaction design",
      "Designing high fidelity mockups",
      "User interface design",
      "Wireframing",
    ],
    tools: ["Photoshop", "Balsamiq"],
    disciplines: ["Visual design", "Interaction design", "Wire-framing"],
    thumbnail: "/thumb/microsoft-ramp.gif",
    cover: "/work/microsoft-ramp/01-homepage.gif",
    featured: true,
    images: [
      img("microsoft-ramp", "01-homepage.gif", "Patient home — care and classes"),
      img("microsoft-ramp", "02-app-track.gif", "App Track — weekly tracking"),
      img("microsoft-ramp", "03-app-track-detail.gif", "App Track — data entry"),
      img("microsoft-ramp", "04-app-track-alt.gif", "App Track — alternate dashboard treatment"),
      img("microsoft-ramp", "05-contraction-wireframe.gif", "Contraction timer — annotated wireframe"),
      img("microsoft-ramp", "06-contraction-timer.gif", "Contraction timer — high fidelity"),
    ],
  },
  {
    slug: "poets-pathway",
    phase: "pre-ai",
    askAbout: true,
    orientation: "portrait",
    title: "City of Ottawa — Poets' Pathway",
    client: "City of Ottawa / Poets' Pathway",
    context:
      "The Poets' Pathway is a walking and biking trail of approximately 35 kilometres, much of it on existing walking paths through Ottawa. It runs from Britannia Beach, south along Pinecrest Creek, east along Nepean Creek, crosses the Rideau River, moves north to the Ottawa River and ends in Beechwood Cemetery where the poets lie. The organization required a wireframe app design so users can learn about the poems through audio, video and images in one integrated format.",
    tasks: [
      "Wire-framing several user paths to illustrate how a user would achieve their defined goals and to highlight the functionality of the product",
      "Interaction design",
      "Designing high fidelity mockups",
      "Project management",
      "Theme design",
      "User interface design",
    ],
    tools: ["Invision", "Sketch"],
    disciplines: ["Wire-framing", "Interaction design", "UI design"],
    thumbnail: "/thumb/poets-pathway.gif",
    cover: "/work/poets-pathway/01-home.gif",
    images: [
      img("poets-pathway", "01-home.gif", "Home — app entry"),
      img("poets-pathway", "02-home-alt.gif", "Home — alternate treatment"),
      img("poets-pathway", "03-poet-page.gif", "Poet page"),
      img("poets-pathway", "04-poem-audio.gif", "Poem — audio playback"),
      img("poets-pathway", "05-search.gif", "Search and discovery"),
      img("poets-pathway", "06-geolocate.gif", "Geolocate — points of interest along the trail"),
      img("poets-pathway", "07-play-poems.gif", "Play poems"),
      img("poets-pathway", "08-plaques.gif", "Plaques along the pathway"),
      img("poets-pathway", "09-home-phone.png", "Home — phone screen"),
      img("poets-pathway", "10-audio-phone.png", "Poem — audio playback, phone screen"),
    ],
  },
  {
    slug: "qtrade-factset",
    phase: "pre-ai",
    askAbout: true,
    orientation: "landscape",
    title: "Qtrade Investor — Stock Screener",
    client: "Qtrade Investor",
    context:
      "Qtrade Investor is an award-winning online brokerage for trading stocks, options, ETFs, bonds and mutual funds. The engagement covered research and concept ideations through to interactive wireframes for the stock screener.",
    tasks: ["Research", "Concept ideations", "Interactive wire-framing"],
    tools: ["Research", "Sketch", "Invision"],
    disciplines: ["Research", "Wire-framing"],
    thumbnail: "/thumb/qtrade-factset.png",
    cover: "/work/qtrade-factset/01-main-page.png",
    images: [
      img("qtrade-factset", "01-main-page.png", "Portal — main page"),
      img("qtrade-factset", "02-portal-view.png", "Portal view"),
      img("qtrade-factset", "03-prebuilt-modal.png", "Prebuilt modal"),
    ],
  },
  {
    slug: "qtrade-mobile-menu",
    phase: "pre-ai",
    orientation: "portrait",
    title: "Qtrade Investor — Mobile Menu Update",
    client: "Qtrade Investor",
    context:
      "Qtrade required changes to their mobile navigation system and information architecture, covering research, concept ideations and interactive wireframes.",
    tasks: ["Research", "Concept ideations", "Interactive wire-framing"],
    tools: ["Research", "Sketch", "Invision"],
    disciplines: ["Research", "Interaction design", "Wire-framing"],
    thumbnail: "/thumb/qtrade-mobile-menu.png",
    cover: "/work/qtrade-mobile-menu/01-mobile-menu.png",
    images: [img("qtrade-mobile-menu", "01-mobile-menu.png", "Mobile navigation — revised IA")],
  },
  {
    slug: "county-of-san-mateo",
    phase: "pre-ai",
    orientation: "landscape",
    title: "County of San Mateo",
    client: "County of San Mateo, California",
    context:
      "The County of San Mateo required a custom design for their ServiceNow CMS implementation, along with several themes and layouts.",
    tasks: [
      "Wire-framing several user paths to illustrate how a user would achieve their defined goals and to highlight functionality of the product",
      "Designing several themes using varying icons, buttons and CSS",
      "Creating the ability to switch themes with ease",
      "User interface design",
    ],
    tools: ["ServiceNow", "CSS", "Balsamiq", "Photoshop", "Illustrator", "Bootstrap"],
    disciplines: ["Wire-framing", "UI design", "Theming"],
    thumbnail: "/thumb/county-of-san-mateo.gif",
    cover: "/work/county-of-san-mateo/01-wireframe.gif",
    images: [
      img("county-of-san-mateo", "01-wireframe.gif", "Self Help — annotated wireframe"),
      img("county-of-san-mateo", "02-theme-one.gif", "Self Serve portal — theme one"),
      img("county-of-san-mateo", "03-theme-two.gif", "Self Serve portal — theme two"),
    ],
  },
  {
    slug: "process-flow",
    phase: "pre-ai",
    orientation: "landscape",
    title: "Process Flow",
    client: "Qtrade Investor",
    context:
      "Qtrade Investor required a process flow to illustrate user paths for varying demographics, and to display drop-off points as a percentage so pain points could be addressed at a user experience level.",
    tasks: [
      "Research",
      "Collaborative consultation with business intelligence and development",
      "Process flow design",
    ],
    tools: ["Research", "Sketch"],
    disciplines: ["Research", "Workflow"],
    thumbnail: "/thumb/process-flow.gif",
    cover: "/work/process-flow/01-user-flow.png",
    images: [
      img("process-flow", "01-user-flow.png", "Onboarding user flow — operations and compliance"),
    ],
  },
  {
    slug: "personal-investment-plan",
    phase: "pre-ai",
    orientation: "landscape",
    title: "Personal Investment Plan — Workflow",
    client: "Qtrade Investor",
    context:
      "Qtrade required a process workflow to illustrate demographic user paths through the personal investment plan.",
    tasks: ["Research", "Collaboration", "Workflow design"],
    tools: ["Research", "Sketch", "Invision"],
    disciplines: ["Research", "Workflow"],
    thumbnail: "/thumb/personal-investment-plan.gif",
    cover: "/work/personal-investment-plan/01-workflow.png",
    images: [
      img(
        "personal-investment-plan",
        "01-workflow.png",
        "Personal investment plan — demographic user paths",
      ),
    ],
  },
  {
    slug: "ezlandlords",
    phase: "pre-ai",
    orientation: "landscape",
    title: "ezLandlords",
    client: "ezLandlordforms",
    context:
      "ezLandlordforms specialises in lease agreements for tenants and landlords throughout North America. They required several new designs to introduce their new lease builder application into their site. I provided varying designs and ideated new functionality to improve the user experience.",
    tasks: [
      "Visual design",
      "Interaction design",
      "Designing high fidelity mockups",
      "User interface design",
      "Wireframing",
    ],
    tools: ["Photoshop", "Balsamiq"],
    disciplines: ["Visual design", "Interaction design", "UI design", "Wire-framing"],
    thumbnail: "/thumb/ezlandlords.gif",
    cover: "/work/ezlandlords/01-lease-builder.gif",
    images: [
      img("ezlandlords", "01-lease-builder.gif", "Lease builder — agreement form"),
      img("ezlandlords", "02-mockup.gif", "Marketing page — lease builder launch"),
      img("ezlandlords", "03-history.gif", "My History — saved documents"),
    ],
  },
  {
    slug: "snapelp",
    phase: "pre-ai",
    orientation: "landscape",
    title: "SnapElp",
    client: "SnapElp",
    context:
      "SnapElp is a concept social mobile app and accompanying website that enables users to snap pictures and ask questions of other users. The project required a custom design for the main pages and a set of wireframes illustrating the functionality of all aspects of the application — both a public view and a logged-in view showing the functions added once a user has signed up.",
    tasks: ["Discovery", "Visual design", "Wireframing"],
    tools: ["Photoshop", "Axure RP", "HTML", "CSS"],
    disciplines: ["Visual design", "Wire-framing"],
    thumbnail: "/thumb/snapelp.gif",
    cover: "/work/snapelp/01-home-public.gif",
    images: [
      img("snapelp", "01-home-public.gif", "Public home — photo feed"),
      img("snapelp", "02-home-logged-in.gif", "Logged-in home — annotated wireframe"),
      img("snapelp", "03-profile-edit.gif", "Profile detail and edit"),
    ],
  },
  {
    slug: "cokinetic",
    phase: "pre-ai",
    orientation: "landscape",
    title: "CoKinetic Systems",
    client: "CoKinetic Systems Corp",
    context:
      "CoKinetic is globally recognised as a major source of innovation in in-flight entertainment software and services. The company's AirPlay IFE platform has been powering award-winning IFE systems since 2007. CoKinetic is based in Harrison, NY, with offices in Lake Forest, CA and Bengaluru, India. They required a WordPress website.",
    tasks: ["Discovery", "Visual design", "WordPress build"],
    tools: ["Photoshop", "WordPress", "Balsamiq", "HTML", "CSS"],
    disciplines: ["Visual design", "Web build"],
    thumbnail: "/thumb/cokinetic.gif",
    cover: "/work/cokinetic/01-homepage.gif",
    images: [img("cokinetic", "01-homepage.gif", "Homepage — hero and platform positioning")],
  },
];

export const disciplines = Array.from(new Set(projects.flatMap((p) => p.disciplines))).sort();

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

/** Every project in one phase, in the order they are authored above. */
export function projectsInPhase(phase: PhaseId) {
  return projects.filter((p) => p.phase === phase);
}

export function countInPhase(phase: PhaseId) {
  return projectsInPhase(phase).length;
}
