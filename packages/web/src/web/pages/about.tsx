import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/layout";
import { Principle } from "../components/principle";
import { aiSkills, clients, site, toolGroups } from "../data/site";

export default function AboutPage() {
  return (
    <div className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="label label-row enter mb-8">About</p>
          <h1 className="display-l enter" style={{ animationDelay: "80ms" }}>
            {site.statement}
          </h1>
          <div className="mt-10 grid gap-6 measure" style={{ color: "var(--ink-soft)" }}>
            <p className="body-lg enter" style={{ animationDelay: "160ms" }}>
              {site.intro}
            </p>
            {site.bio.map((p) => (
              <p key={p} className="body-lg">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure className="enter" style={{ animationDelay: "220ms" }}>
            <div className="overflow-hidden" style={{ background: "var(--panel)" }}>
              <img
                src="/portrait/carl-bw.jpg"
                alt={`${site.name}, ${site.role}`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="rule mt-4 flex items-start justify-between gap-6 pt-3">
              <span className="label label-ink">
                {site.name}
                <br />
                {site.role}
              </span>
              <span className="label shrink-0">{site.location}</span>
            </figcaption>
          </figure>

          <Principle id="whoKeepsUx" className="mt-10" />
        </div>
      </div>

      {/* ---------------- skills ---------------- */}
      <section id="skills" className="mt-[clamp(3.5rem,7vw,6.5rem)]">
        <div className="rule grid gap-10 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="label label-row">Skills</p>
            <p className="label mt-4" style={{ color: "var(--accent)" }}>
              AI-assisted design
            </p>
          </div>

          <div className="lg:col-span-9">
            {/* the focal block — stated first, on its own surface */}
            <div className="panel-block p-[clamp(1.5rem,3vw,2.5rem)]">
              <p className="label label-ink mb-5">AI-assisted design</p>
              <p className="display-m measure-tight">{aiSkills.lead}</p>
              <p className="body-lg measure mt-6" style={{ color: "var(--ink-soft)" }}>
                {aiSkills.body}
              </p>

              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {aiSkills.areas.map((area) => (
                  <div key={area.index}>
                    <span className="meta meta-ink">{area.index}</span>
                    <p className="display-s mt-3">{area.label}</p>
                    <p className="mt-2 text-sm measure" style={{ color: "var(--ink-soft)" }}>
                      {area.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-[clamp(2.5rem,5vw,3.5rem)]">
              <p className="label label-row mb-5">Disciplines</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {site.capabilities.map((c) => (
                  <li key={c} className="display-s" style={{ color: "var(--ink-soft)" }}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[clamp(2.5rem,5vw,3.5rem)]">
              <p className="label label-row mb-5">Tools</p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {toolGroups.map((group) => (
                  <div key={group.label}>
                    <p
                      className="label mb-3"
                      style={group.label === "AI" ? { color: "var(--accent)" } : undefined}
                    >
                      {group.label}
                    </p>
                    <ul className="grid gap-1.5" style={{ color: "var(--ink-soft)" }}>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[clamp(3rem,6vw,5rem)]">
        <div className="rule grid gap-10 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="label label-row mb-3">Clients</p>
            <span className="label">{clients.length} companies</span>
          </div>
          <div className="lg:col-span-9">
            <p className="display-s measure" style={{ color: "var(--ink-soft)" }}>
              {clients.slice(0, 10).join(", ")} and {clients.length - 10} more.
            </p>
            <Link to="/clients" className="label label-ink link-accent mt-6 inline-flex items-center gap-2">
              Full client list
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="mt-[clamp(3.5rem,7vw,6rem)]">
        <div className="rule grid gap-6 pt-6 sm:grid-cols-2">
          <div>
            <p className="label label-row mb-5">Work</p>
            <Link to="/work" className="display-m link-accent">
              Twelve case studies
            </Link>
          </div>
          <div>
            <p className="label label-row mb-5">Contact</p>
            <a href={`mailto:${site.email}`} className="display-m link-accent">
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
