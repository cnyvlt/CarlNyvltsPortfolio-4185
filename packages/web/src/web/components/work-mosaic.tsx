import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

/**
 * "Selected work" — a tight, full-bleed, gap-free mosaic of mixed tile sizes.
 *
 * Every tile is a link to its case study: client and title are set on the
 * image, and each carries an explicit "View project" affordance that inverts
 * on hover. Tile geometry is hand-placed on a 12-column base so the seams
 * stagger between columns the way a masonry does, and every column lands
 * flush at row 13.
 */

type Tile = {
  slug: string;
  col: number;
  span: number;
  row: number;
  rows: number;
  /** narrow tiles: tighter padding, smaller title */
  tight?: boolean;
};

/* columns are 4 / 3 / 3 / 2 of the 12 — one wide, two medium, one narrow.
   Wide covers get the wide tiles; the three phone-mock covers take the narrow
   column, where the crop does them least harm. */
const MOSAIC: Tile[] = [
  { slug: "microsoft-ramp", col: 1, span: 4, row: 1, rows: 5 },
  { slug: "county-of-san-mateo", col: 1, span: 4, row: 6, rows: 4 },
  { slug: "process-flow", col: 1, span: 4, row: 10, rows: 3 },

  { slug: "eadvisor-aviso", col: 5, span: 3, row: 1, rows: 3 },
  { slug: "qtrade-factset", col: 5, span: 3, row: 4, rows: 5 },
  { slug: "personal-investment-plan", col: 5, span: 3, row: 9, rows: 4 },

  { slug: "snapelp", col: 8, span: 3, row: 1, rows: 4 },
  { slug: "ezlandlords", col: 8, span: 3, row: 5, rows: 3 },
  { slug: "cokinetic", col: 8, span: 3, row: 8, rows: 5 },

  { slug: "west-coast-inns", col: 11, span: 2, row: 1, rows: 4, tight: true },
  { slug: "poets-pathway", col: 11, span: 2, row: 5, rows: 4, tight: true },
  { slug: "qtrade-mobile-menu", col: 11, span: 2, row: 9, rows: 4, tight: true },
];

/* Deep enough at the foot of the tile to hold paper-white type over a light
   screenshot, then gone by the upper third so the artwork stays clean. */
const scrim =
  "linear-gradient(to top, rgba(20,19,17,0.97) 0%, rgba(20,19,17,0.93) 28%, rgba(20,19,17,0.7) 46%, rgba(20,19,17,0.28) 62%, rgba(20,19,17,0) 78%)";

function TileBody({
  slug,
  index,
  tight = false,
}: {
  slug: string;
  index: number;
  tight?: boolean;
}) {
  const project = projects.find((p) => p.slug === slug)!;
  return (
    <>
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        className="media-zoom absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: scrim }} aria-hidden />

      <div
        className={`relative flex h-full flex-col justify-end ${tight ? "p-4" : "p-5 lg:p-6"}`}
      >
        {/* 0.85 rather than 0.7 — measured over the scrim, 0.7 fell to ~4:1 and
            the meta line has to stay AA against a live screenshot */}
        <span className="meta" style={{ color: "rgba(244,241,234,0.85)" }}>
          {String(index + 1).padStart(2, "0")}
          {!tight && ` — ${project.client}`}
        </span>
        <h3
          className={tight ? "mt-1.5" : "display-s mt-2"}
          style={{
            color: "var(--paper)",
            fontFamily: tight ? "var(--font-display)" : undefined,
            fontSize: tight ? "1.0625rem" : undefined,
            lineHeight: tight ? 1.15 : undefined,
          }}
        >
          {project.title}
        </h3>

        <span
          className={`mt-3 inline-flex items-center gap-2 self-start border px-3 py-2 text-[var(--paper)] transition-colors duration-200 group-hover:border-[var(--paper)] group-hover:bg-[var(--paper)] group-hover:text-[var(--ink)] ${
            tight ? "mt-2.5 px-2.5 py-1.5" : ""
          }`}
          style={{ borderColor: "rgba(244,241,234,0.5)" }}
        >
          <span className="label" style={{ color: "inherit" }}>
            View project
          </span>
          <ArrowUpRight size={12} strokeWidth={1.6} />
        </span>
      </div>
    </>
  );
}

export function WorkMosaic() {
  return (
    <>
      {/* small screens — plain two-up, no masonry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden">
        {MOSAIC.map((t, i) => (
          <Link
            key={t.slug}
            to={`/work/${t.slug}`}
            className="group relative block h-[16rem] overflow-hidden sm:h-[18rem]"
          >
            <TileBody slug={t.slug} index={i} tight={t.tight} />
          </Link>
        ))}
      </div>

      {/* the mosaic — full-bleed, no gutters, mixed tile sizes, with a 130px
          paper spine running the full height on the left */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: "130px 1fr", gap: 0 }}>
        <div className="relative overflow-hidden" aria-hidden>
          <img
            src="/texture/spine-paper.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gridAutoRows: "5rem",
            gap: 0,
          }}
        >
          {MOSAIC.map((t, i) => (
            <Link
              key={t.slug}
              to={`/work/${t.slug}`}
              className="group relative block overflow-hidden"
              style={{
                gridColumn: `${t.col} / span ${t.span}`,
                gridRow: `${t.row} / span ${t.rows}`,
              }}
            >
              <TileBody slug={t.slug} index={i} tight={t.tight} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
