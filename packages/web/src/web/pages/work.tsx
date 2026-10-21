import { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/layout";
import { PhaseTabs } from "../components/phase-tabs";
import { Principle } from "../components/principle";
import { countInPhase, projectsInPhase, type Project } from "../data/projects";
import { getPhase, isPhaseId, type PhaseId } from "../data/phases";
import { aiSkills, aiTools } from "../data/site";

function CardText({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <div className="rule mt-5 flex items-start justify-between gap-6 pt-4">
        <div>
          <h2 className="display-s">
            <span className="link-accent">{project.title}</span>
          </h2>
          <p className="label mt-2">{project.client}</p>
        </div>
        <span className="label flex shrink-0 items-center gap-2 pt-2">
          {String(index + 1).padStart(2, "0")}
          <ArrowUpRight size={13} strokeWidth={1.5} />
        </span>
      </div>
      <p className="mt-4 measure" style={{ color: "var(--ink-soft)" }}>
        {project.context.length > 190 ? `${project.context.slice(0, 187).trimEnd()}…` : project.context}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {project.disciplines.map((d) => (
          <li key={d} className="label">
            {d}
          </li>
        ))}
      </ul>
    </>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const wide = index % 3 === 0;
  const plate = wide ? "aspect-[16/10]" : project.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]";

  if (wide) {
    return (
      <Link to={`/work/${project.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="lift overflow-hidden">
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className={`media-zoom w-full object-contain ${plate}`}
            />
          </div>
        </div>
        <div className="lg:col-span-5">
          <CardText project={project} index={index} />
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/work/${project.slug}`} className="group block">
      <div className="lift overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className={`media-zoom w-full object-contain ${plate}`}
        />
      </div>
      <CardText project={project} index={index} />
    </Link>
  );
}

/**
 * The AI-enhanced phase has no published case studies yet. Rather than leave a
 * blank grid — which reads as a broken page and wastes the visitor's click —
 * the phase explains what is coming, where the tools sit in the process, and
 * offers two ways onward. An empty phase becomes a statement of practice
 * instead of a hole.
 *
 * The phase's own name, count and summary are already stated above the panel
 * by the tab strip, so this section adds only what is new: the status of the
 * case studies, and the method behind them.
 */
function PhaseEmpty({ onSwitch }: { onSwitch: (phase: PhaseId) => void }) {
  return (
    <div className="rule mt-14 pt-10">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="display-m mb-6">The first case studies from this phase are being written.</h2>
          <p className="measure" style={{ color: "var(--ink-soft)" }}>
            The method is already running on live engagements. Written case studies — process,
            tooling and outcomes — are added here as they clear client review.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to="/philosophy"
              className="label label-ink link-accent inline-flex items-center gap-2"
            >
              Read the design philosophy
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              className="label label-ink link-accent inline-flex items-center gap-2"
              onClick={() => onSwitch("pre-ai")}
            >
              See pre-AI work
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="label label-row mb-4">Where AI sits in the process</p>
          <div className="grid gap-px sm:grid-cols-2" style={{ background: "var(--hairline)" }}>
            {aiSkills.areas.map((area) => (
              <div key={area.index} className="panel-block p-[clamp(1.25rem,2.5vw,2rem)]">
                <span className="meta meta-ink">{area.index}</span>
                <h3 className="display-s mt-5 mb-3">{area.label}</h3>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {area.body}
                </p>
              </div>
            ))}
          </div>
          <p className="label label-row mt-8 mb-4">Tools</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {aiTools.map((tool) => (
              <li key={tool} className="display-s" style={{ color: "var(--ink-soft)" }}>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, navigate] = useLocation();
  const [discipline, setDiscipline] = useState<string | null>(null);

  // The phase lives in the URL so it is linkable and the back button works.
  // Pre-AI is the default and stays out of the URL to keep it clean.
  const param = searchParams.get("phase");
  const phase: PhaseId = isPhaseId(param) ? param : "pre-ai";

  const inPhase = useMemo(() => projectsInPhase(phase), [phase]);
  const phaseDisciplines = useMemo(
    () => Array.from(new Set(inPhase.flatMap((p) => p.disciplines))).sort(),
    [inPhase],
  );
  const items = useMemo(
    () => (discipline ? inPhase.filter((p) => p.disciplines.includes(discipline)) : inPhase),
    [inPhase, discipline],
  );

  const counts: Record<PhaseId, number> = {
    "pre-ai": countInPhase("pre-ai"),
    "ai-enhanced": countInPhase("ai-enhanced"),
  };

  function setPhase(next: PhaseId) {
    // Disciplines differ per phase, so a filter carried across would silently
    // hide work the visitor just asked to see.
    setDiscipline(null);
    // wouter's setSearchParams always appends "?", so returning to the default
    // phase navigates to the bare path instead of leaving a stray "/work?".
    if (next === "pre-ai") navigate("/work");
    else setSearchParams({ phase: next });
  }

  const current = getPhase(phase);

  return (
    <div className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label label-row enter mb-8">Work</p>
          <h1 className="display-l enter" style={{ animationDelay: "80ms" }}>
            Two phases of design work — the craft that came first, and the AI-enhanced practice
            built on it.
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <p className="measure enter" style={{ color: "var(--ink-soft)", animationDelay: "160ms" }}>
            Every engagement below started with research and documentation, moved through wireframes
            and interactive testing, and finished as hi-fidelity design ready for development.
          </p>
          <Principle id="innovationBalance" className="enter mt-12" style={{ animationDelay: "240ms" }} />
        </div>
      </div>

      {/* phase selector — the primary axis of this page */}
      <div className="rule mt-14 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <PhaseTabs active={phase} counts={counts} onChange={setPhase} />
          <span className="meta">
            {current.label} — {inPhase.length} {inPhase.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <p className="measure mt-6" style={{ color: "var(--ink-soft)" }}>
          {current.body}
        </p>
      </div>

      <div
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-tab-${phase.id}`}
        tabIndex={0}
        className="focus:outline-none"
      >
        {inPhase.length > 0 && (
          <div className="rule mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 pt-6">
            <span className="label">Filter</span>
            <button
              type="button"
              className="chip"
              data-active={discipline === null}
              onClick={() => setDiscipline(null)}
            >
              All ({inPhase.length})
            </button>
            {phaseDisciplines.map((d) => {
              const count = inPhase.filter((p) => p.disciplines.includes(d)).length;
              return (
                <button
                  key={d}
                  type="button"
                  className="chip"
                  data-active={discipline === d}
                  onClick={() => setDiscipline(discipline === d ? null : d)}
                >
                  {d} ({count})
                </button>
              );
            })}
          </div>
        )}

        {items.length === 0 ? (
          <PhaseEmpty onSwitch={setPhase} />
        ) : (
          <div className="mt-14 grid gap-x-12 gap-y-16 md:grid-cols-2">
            {items.map((p, i) => (
              <Reveal
                key={p.slug}
                as="article"
                delay={(i % 2) * 80}
                className={i % 3 === 0 ? "md:col-span-2" : ""}
              >
                <Card project={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
