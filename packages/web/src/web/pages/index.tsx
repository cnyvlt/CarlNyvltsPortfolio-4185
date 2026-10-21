import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/layout";
import { WorkMosaic } from "../components/work-mosaic";
import { countInPhase, projects } from "../data/projects";
import { aiSkills, aiTools, clients, process, services, site } from "../data/site";

const featured = projects.filter((p) => p.featured).slice(0, 3);

const preAiCount = countInPhase("pre-ai");
const aiCount = countInPhase("ai-enhanced");

/** The split, stated in one line. While the AI phase is still empty the meta
 *  says so plainly rather than printing a zero next to it. */
const phaseMeta =
  aiCount > 0
    ? `${preAiCount} pre-AI · ${aiCount} AI-enhanced`
    : `${preAiCount} pre-AI · AI-enhanced in progress`;

function SectionHead({
  label,
  title,
  meta,
  action,
  actions,
  accent = false,
}: {
  label: string;
  title?: string;
  meta?: string;
  action?: { href: string; label: string };
  /** Several links in the head — used where a section forks into two paths. */
  actions?: { href: string; label: string }[];
  accent?: boolean;
}) {
  const links = actions ?? (action ? [action] : []);
  return (
    <div className="rule grid gap-6 pt-6 pb-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p
          className="label label-row mb-4"
          style={accent ? { color: "var(--accent)" } : undefined}
        >
          {label}
        </p>
        {title && <h2 className="display-l">{title}</h2>}
      </div>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-3 lg:col-span-4 lg:justify-end">
        {meta && <span className="label">{meta}</span>}
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            to={link.href}
            className="link-accent label label-ink inline-flex items-center gap-2"
          >
            {link.label}
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* ---------------- hero ---------------- */}
      <section className="container-x pt-[clamp(2.5rem,6vw,5.5rem)] pb-[clamp(3rem,7vw,6rem)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="label label-row enter mb-8" style={{ animationDelay: "40ms" }}>
              {site.roleShort} — Portfolio · {site.location}
            </p>
            <h1 className="display-xl enter" style={{ animationDelay: "120ms" }}>
              Senior UX/UI designer directing AI to create thoughtful custom products.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pt-24">
            <p className="measure enter body-lg" style={{ animationDelay: "260ms" }}>
              {site.intro}
            </p>
            <ul className="enter mt-8 grid gap-1.5" style={{ animationDelay: "340ms" }}>
              {site.capabilities.map((c) => (
                <li key={c} className="label">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- positioning statement ---------------- */}
      <section className="container-x mt-[clamp(3.5rem,7vw,6.5rem)] pb-[clamp(4rem,8vw,8rem)]">
        <div className="rule grid gap-6 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-9">
            <h2 className="display-xl measure-tight enter">
              When AI starts designing, who keeps UX consistent?
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
              <p
                className="body-lg enter"
                style={{ color: "var(--ink-soft)", animationDelay: "80ms" }}
              >
                Ensuring human-centered design stays strong even when AI is involved.
              </p>
              <p
                className="body-lg enter"
                style={{ color: "var(--ink-soft)", animationDelay: "140ms" }}
              >
                Designing the future means guiding the AI, not letting the AI guide the human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- selected work ---------------- */}
      <section id="work">
        <div className="container-x">
          <SectionHead
            label="Selected work"
            title="Twelve projects from the pre-AI phase — discovery through to hi-fidelity design."
            meta={phaseMeta}
            actions={[
              { href: "/work", label: "Pre-AI work" },
              { href: "/work?phase=ai-enhanced", label: "AI-enhanced" },
            ]}
          />
        </div>
        {/* full-bleed — deliberately outside the container so the mosaic runs
            edge to edge the way the reference does */}
        <Reveal>
          <WorkMosaic />
        </Reveal>
      </section>

      {/* ---------------- featured cases ---------------- */}
      <section className="container-x mt-[clamp(4rem,8vw,8rem)]">
        <SectionHead label="In detail" meta="Client context, tasks, tools" />
        <div className="grid gap-[clamp(2rem,4vw,4rem)]">
          {featured.map((p, i) => (
            <Reveal key={p.slug} as="article">
              <div
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7">
                  <Link to={`/work/${p.slug}`} className="group block overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      className={`media-zoom w-full object-contain ${p.orientation === "portrait" ? "aspect-[4/5] max-h-[70vh]" : "aspect-[16/10]"}`}
                      style={{ background: "var(--panel)" }}
                    />
                  </Link>
                </div>
                <div className="lg:col-span-5">
                  <p className="label label-row mb-4">{String(i + 1).padStart(2, "0")} — {p.client}</p>
                  <h3 className="display-m mb-4">
                    <Link to={`/work/${p.slug}`} className="link-accent">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="measure" style={{ color: "var(--ink-soft)" }}>
                    {p.context}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {p.disciplines.map((d) => (
                      <li key={d} className="label">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- services ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <SectionHead
          label="Services"
          title="User experience, interaction design, interface design and usability testing."
          action={{ href: "/services", label: "Services" }}
        />
        <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--hairline)" }}>
          {services.map((s, i) => (
            <Reveal key={s.index} className="panel-block p-[clamp(1.5rem,3vw,2.75rem)]" delay={i * 60}>
              <span className="meta meta-ink">{s.index}</span>
              <h3 className="display-s mt-6 mb-4">{s.title}</h3>
              <p className="measure" style={{ color: "var(--ink-soft)" }}>
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
        <div className="rule mt-px flex flex-wrap items-center gap-x-8 gap-y-3 py-6">
          {process.map((step) => (
            <span key={step.index} className="label">
              <span className="meta meta-ink">{step.index}</span> {step.label}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- AI-assisted design ---------------- */}
      <section id="ai-skills" className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <SectionHead
          label="AI-assisted design"
          title={aiSkills.headline}
          action={{ href: "/philosophy", label: "Design philosophy" }}
          accent
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="body-lg measure" style={{ color: "var(--ink-soft)" }}>
              {aiSkills.body}
            </p>
            <p className="label label-row mt-10">Tools</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {aiTools.map((tool) => (
                <li key={tool} className="display-s" style={{ color: "var(--ink-soft)" }}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px sm:grid-cols-2" style={{ background: "var(--hairline)" }}>
              {aiSkills.areas.map((area, i) => (
                <Reveal
                  key={area.index}
                  className="panel-block p-[clamp(1.25rem,2.5vw,2rem)]"
                  delay={i * 60}
                >
                  <span className="meta meta-ink">{area.index}</span>
                  <h3 className="display-s mt-5 mb-3">{area.label}</h3>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    {area.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- clients ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <SectionHead
          label="Clients"
          title="Companies I've worked with directly or indirectly."
          meta={`${clients.length} clients`}
          action={{ href: "/clients", label: "Full list" }}
        />
        <Reveal>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {clients.slice(0, 18).map((c) => (
              <li key={c} className="display-s" style={{ color: "var(--ink-soft)" }}>
                {c}
              </li>
            ))}
            <li className="display-s" style={{ color: "var(--accent)" }}>
              +{clients.length - 18} more
            </li>
          </ul>
        </Reveal>
      </section>

      {/* ---------------- contact ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <div className="rule pt-6">
          <p className="label label-row mb-6">Contact</p>
          <h2 className="display-xl measure-tight">
            Like my stuff? Want to work with me? Or just say hello.
          </h2>
          <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-4">
            <a href={`mailto:${site.email}`} className="display-m link-accent">
              {site.email}
            </a>
            <a href={site.phoneHref} className="display-m link-accent" style={{ color: "var(--ink-soft)" }}>
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
