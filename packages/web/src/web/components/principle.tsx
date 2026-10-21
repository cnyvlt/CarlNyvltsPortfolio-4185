import { principles, type PrincipleKey } from "../data/principles";

/**
 * One visual family, three placements — see data/principles.ts.
 *
 *   motto     the quiet line under the nav, on every page
 *   epigraph  the sign-off above the footer columns
 *   margin    a handwritten aside in a page's margin
 *
 * Every placement is labelled with the same `Guiding principle` kicker so a
 * visitor reads it as one deliberate system rather than stray quotations.
 */
export function Principle({
  id,
  variant = "margin",
  className = "",
  style,
}: {
  id: PrincipleKey;
  variant?: "motto" | "epigraph" | "margin";
  className?: string;
  style?: React.CSSProperties;
}) {
  const line = principles[id];

  if (variant === "motto") {
    return (
      <p className={`principle-motto ${className}`} style={style}>
        {line}
      </p>
    );
  }

  if (variant === "epigraph") {
    return (
      <div className={className} style={style}>
        <p className="label label-row mb-5">Guiding principle</p>
        <p className="principle-epigraph measure-tight">{line}</p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <p className="label label-row mb-4">Guiding principle</p>
      <p className="principle-margin">{line}</p>
    </div>
  );
}
