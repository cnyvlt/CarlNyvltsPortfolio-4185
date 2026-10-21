import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/layout";
import { Principle } from "../components/principle";
import { principles } from "../data/principles";
import { aiSkills, aiTools, philosophy } from "../data/site";

/**
 * Design philosophy — the human-first position, argued in full.
 *
 * The site already carries the short lines (data/principles.ts) scattered as
 * marginalia; this page is the argument they belong to. It runs claim →
 * method → principles → where AI sits → the standard, and closes by handing
 * the visitor on to the two phases of work.
 */

/** The headline claim is the site's signature line, so it is not repeated below. */
const creedLines = Object.entries(principles).filter(([key]) => key !== "authorOfPurpose");

export default function PhilosophyPage() {
  return (
    <div>
      {/* ---------------- claim ---------------- */}
      <section className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="label label-row enter mb-8">Design philosophy</p>
            <h1 className="display-xl enter" style={{ animationDelay: "80ms" }}>
              {principles.authorOfPurpose}
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <p className="measure enter body-lg" style={{ color: "var(--ink-soft)", animationDelay: "180ms" }}>
              {philosophy.lead}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- the approach ---------------- */}
      <section className="container-x mt-[clamp(4rem,8vw,7.5rem)]">
        <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label label-row mb-4">The approach</p>
            <h2 className="display-l">How AI is directed, and what stays human.</h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <span className="meta">Four steps, in order</span>
          </div>
        </div>

        <ol>
          {philosophy.creed.map((step) => (
            <Reveal as="li" key={step.index} className="rule">
              <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-12">
                <span className="meta pt-2 md:col-span-1">{step.index}</span>
                <h3 className="display-s md:col-span-4">{step.title}</h3>
                <p className="measure md:col-span-7" style={{ color: "var(--ink-soft)" }}>
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- the principles ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <div className="rule grid gap-6 pt-6 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label label-row mb-4">The principles behind it</p>
            <h2 className="display-l">
              Lines the whole practice answers to — on every page of this site.
            </h2>
          </div>
        </div>

        <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {creedLines.map(([key, line], i) => (
            <Reveal as="li" key={key} delay={(i % 2) * 70}>
              <div className="rule pt-5">
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <p className="principle-epigraph mt-4">{line}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------- where AI sits ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <div className="rule grid gap-6 pt-6 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label label-row mb-4" style={{ color: "var(--accent)" }}>
              AI in the process
            </p>
            <h2 className="display-l">{aiSkills.headline}</h2>
          </div>
        </div>

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

      {/* ---------------- the standard, and the way onward ---------------- */}
      <section className="container-x mt-[clamp(4.5rem,9vw,9rem)]">
        <div className="rule pt-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Principle id="remainInControl" variant="epigraph" />
            </div>
            <div className="lg:col-span-5 lg:pt-14">
              <p className="measure" style={{ color: "var(--ink-soft)" }}>
                The work is published in two phases — twenty years of craft before AI tooling, and
                the AI-enhanced practice built on it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  to="/work"
                  className="label label-ink link-accent inline-flex items-center gap-2"
                >
                  Pre-AI work
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </Link>
                <Link
                  to="/work?phase=ai-enhanced"
                  className="label label-ink link-accent inline-flex items-center gap-2"
                >
                  AI-enhanced work
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </Link>
                <Link
                  to="/contact"
                  className="label label-ink link-accent inline-flex items-center gap-2"
                >
                  Get in touch
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
