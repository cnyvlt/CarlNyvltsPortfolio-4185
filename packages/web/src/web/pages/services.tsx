import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { AskAbout } from "../components/agent-chat";
import { Reveal } from "../components/layout";
import { Principle } from "../components/principle";
import { aiTools, process, services, site } from "../data/site";

export default function ServicesPage() {
  return (
    <div className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label label-row enter mb-8">Services</p>
          <h1 className="display-l enter" style={{ animationDelay: "80ms" }}>
            User experience, usability testing, interaction design and user interface design.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <p className="measure enter" style={{ color: "var(--ink-soft)", animationDelay: "160ms" }}>
            Work is scoped per engagement and can start at any point in the sequence — a single
            usability pass, or the full journey from research to development-ready design.
          </p>
          <Principle id="empathyCompass" className="enter mt-12" style={{ animationDelay: "240ms" }} />
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] rule">
        {services.map((s, i) => (
          <Reveal key={s.index} delay={i * 50}>
            <article className="rule grid gap-6 py-[clamp(1.75rem,3.5vw,3rem)] lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="meta meta-ink">{s.index}</span>
                <h2 className="display-m mt-4">{s.title}</h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="measure body-lg" style={{ color: "var(--ink-soft)" }}>
                  {s.body}
                </p>
                <AskAbout
                  className="mt-5"
                  label="Ask about this service"
                  prompt={`Tell me about Carl's ${s.title} service.`}
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <section className="mt-[clamp(3.5rem,7vw,6rem)]">
        <div className="rule flex flex-wrap items-end justify-between gap-6 pt-6 pb-10">
          <div>
            <p className="label label-row mb-4">Process</p>
            <h2 className="display-m measure">
              Research, documentation, defining users, wireframing, interactive testing, hi-fidelity
              design.
            </h2>
          </div>
          <span className="label">Six stages</span>
        </div>
        <ol className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--hairline)" }}>
          {process.map((step) => (
            <li key={step.index} className="panel-block p-7">
              <span className="meta meta-ink">{step.index}</span>
              <p className="display-s mt-8">{step.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="tools" className="mt-[clamp(3.5rem,7vw,6rem)]">
        <div className="rule grid gap-8 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label label-row mb-5">Tools</p>
            <p className="label mb-3" style={{ color: "var(--accent)" }}>
              AI
            </p>
            <p className="display-s measure" style={{ color: "var(--ink-soft)" }}>
              {aiTools.join(" · ")}
            </p>
            <p className="label mt-7 mb-3">Design &amp; build</p>
            <p className="display-s measure" style={{ color: "var(--ink-soft)" }}>
              Sketch, Photoshop, Illustrator, Invision, Figma, Balsamiq, Axure RP, HTML, CSS,
              Bootstrap, WordPress and ServiceNow.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label label-row mb-5">Start a project</p>
            <Link to="/contact" className="display-m link-accent inline-flex items-center gap-3">
              Get in touch
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </Link>
            <p className="mt-4">
              <a href={`mailto:${site.email}`} className="link-accent" style={{ color: "var(--ink-soft)" }}>
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
