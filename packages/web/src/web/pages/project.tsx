import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { AskAbout } from "../components/agent-chat";
import { Lightbox } from "../components/lightbox";
import { Reveal } from "../components/layout";
import { getNeighbours, getProject } from "../data/projects";
import { getPhase } from "../data/phases";

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rule grid grid-cols-3 gap-4 py-4">
      <dt className="label pt-1">{label}</dt>
      <dd className="col-span-2 text-sm" style={{ color: "var(--ink)" }}>
        {value}
      </dd>
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const [open, setOpen] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="container-x py-32">
        <p className="label label-row mb-6">Not found</p>
        <h1 className="display-l mb-8">That project doesn&apos;t exist.</h1>
        <Link to="/work" className="link-accent label label-ink">
          Back to all work
        </Link>
      </div>
    );
  }

  const { prev, next } = getNeighbours(project.slug);
  const cover = project.images[0];

  return (
    <div>
      <div className="container-x pt-[clamp(2.5rem,5vw,4.5rem)]">
        <Link to="/work" className="label link-accent inline-flex items-center gap-2">
          <ArrowLeft size={13} strokeWidth={1.5} />
          All work
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="label label-row enter mb-6">{project.client}</p>
            <h1 className="display-l enter" style={{ animationDelay: "80ms" }}>
              {project.title}
            </h1>
            <p
              className="mt-8 measure enter body-lg"
              style={{ color: "var(--ink-soft)", animationDelay: "160ms" }}
            >
              {project.context}
            </p>
            {project.askAbout && (
              <div className="rule mt-8 pt-4 enter" style={{ animationDelay: "220ms" }}>
                <AskAbout
                  label="Ask about this project"
                  prompt={`Walk me through the ${project.title} project.`}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <dl className="rule-strong pt-0">
              <MetaRow label="Client" value={project.client} />
              <MetaRow
                label="Phase"
                value={
                  <Link
                    to={project.phase === "pre-ai" ? "/work" : `/work?phase=${project.phase}`}
                    className="link-accent"
                  >
                    {getPhase(project.phase).label}
                  </Link>
                }
              />
              <MetaRow
                label="Disciplines"
                value={
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.disciplines.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                }
              />
              <MetaRow
                label="Tools"
                value={
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                }
              />
            </dl>
          </div>
        </div>
      </div>

      {/* cover */}
      <div className="container-x mt-14">
        <Reveal>
          <button
            type="button"
            className="group relative block w-full overflow-hidden text-left"
            style={{ background: "var(--panel)" }}
            onClick={() => setOpen(0)}
            aria-label={`Open ${cover.caption} full size`}
          >
            <img src={cover.src} alt={cover.caption} className="media-zoom mx-auto max-h-[78vh] w-auto max-w-full object-contain" />
            <span
              className="label absolute right-5 bottom-5 inline-flex items-center gap-2 px-3 py-2"
              style={{ background: "var(--paper)" }}
            >
              <Maximize2 size={12} strokeWidth={1.5} />
              Expand
            </span>
          </button>
        </Reveal>
      </div>

      {/* tasks */}
      <section className="container-x mt-[clamp(3.5rem,7vw,6.5rem)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="label label-row">Our task</p>
            <h2 className="display-m mt-5">
              What this engagement covered.
            </h2>
          </div>
          <ol className="lg:col-span-8 rule">
            {project.tasks.map((t, i) => (
              <li key={i} className="rule grid grid-cols-[3rem_1fr] gap-4 py-5">
                <span className="meta pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="body-lg">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* gallery */}
      <section className="container-x mt-[clamp(3.5rem,7vw,6.5rem)]">
        <div className="rule flex items-end justify-between gap-6 pt-6 pb-10">
          <div>
            <p className="label label-row mb-4">Screens</p>
            <h2 className="display-m">From wireframe to hi-fidelity.</h2>
          </div>
          <span className="meta">{String(project.images.length).padStart(2, "0")} images</span>
        </div>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {project.images.map((image, i) => (
            <Reveal key={image.src} as="figure" delay={(i % 2) * 70}>
              <button
                type="button"
                className="group block w-full overflow-hidden text-left"
                style={{ background: "var(--panel)" }}
                onClick={() => setOpen(i)}
                aria-label={`Open ${image.caption} full size`}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="media-zoom aspect-[4/3] w-full object-contain"
                />
              </button>
              <figcaption className="rule mt-4 flex items-baseline justify-between gap-4 pt-3">
                <span className="label label-ink">{image.caption}</span>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* prev / next */}
      <section className="container-x mt-[clamp(4rem,8vw,8rem)]">
        <div className="rule grid gap-6 pt-6 sm:grid-cols-2">
          {prev && (
            <Link to={`/work/${prev.slug}`} className="group flex items-start gap-4">
              <ArrowLeft size={15} strokeWidth={1.5} className="mt-2 shrink-0" />
              <span>
                <span className="label block mb-2">Previous</span>
                <span className="display-s link-accent">{prev.title}</span>
              </span>
            </Link>
          )}
          {next && (
            <Link to={`/work/${next.slug}`} className="group flex items-start gap-4 sm:justify-end sm:text-right">
              <span className="sm:order-2">
                <span className="label block mb-2">Next</span>
                <span className="display-s link-accent">{next.title}</span>
              </span>
              <ArrowRight size={15} strokeWidth={1.5} className="mt-2 shrink-0 sm:order-1" />
            </Link>
          )}
        </div>
      </section>

      {open !== null && (
        <Lightbox
          images={project.images}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
