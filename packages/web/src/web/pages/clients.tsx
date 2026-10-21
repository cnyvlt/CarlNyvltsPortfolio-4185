import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/layout";
import { Principle } from "../components/principle";
import { clients } from "../data/site";

export default function ClientsPage() {
  return (
    <div className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label label-row enter mb-8">Clients</p>
          <h1 className="display-l enter" style={{ animationDelay: "80ms" }}>
            Companies I&apos;ve worked with directly or indirectly over 20 years.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <p className="measure enter" style={{ color: "var(--ink-soft)", animationDelay: "160ms" }}>
            Financial services, healthcare, government, mining and resources, travel and enterprise
            software — across Canada, the US and Europe.
          </p>
          <Principle id="humanCompass" className="enter mt-12" style={{ animationDelay: "240ms" }} />
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] rule">
        {clients.map((client, i) => (
          <Reveal key={client} delay={Math.min(i, 8) * 30}>
            <div className="rule row-hover grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4 md:grid-cols-[4rem_1fr]">
              <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              <span className="display-s">{client}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="label mt-6">
        {clients.length} companies — direct and indirect engagements
      </p>

      <section className="mt-[clamp(3.5rem,7vw,6rem)]">
        <div className="rule grid gap-6 pt-6 sm:grid-cols-2">
          <div>
            <p className="label label-row mb-5">See the work</p>
            <Link to="/work" className="display-m link-accent inline-flex items-center gap-3">
              Twelve case studies
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </Link>
          </div>
          <div>
            <p className="label label-row mb-5">Add your project</p>
            <Link to="/contact" className="display-m link-accent">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
