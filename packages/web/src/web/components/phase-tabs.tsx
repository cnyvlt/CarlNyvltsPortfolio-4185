import { useRef } from "react";
import { phases, type PhaseId } from "../data/phases";

/**
 * The phase selector — the primary axis of /work.
 *
 * A real tablist: every phase is a button, arrow keys move between them, and
 * only the active tab sits in the tab order. The caller owns the active value
 * (it is carried in the URL), so a phase stays linkable and the back button
 * behaves the way a visitor expects.
 *
 * Counts are shown only for phases that actually hold work. A count exists to
 * say how much is behind a tab; a zero says nothing useful, and the phase's own
 * empty state says it far better.
 */
export function PhaseTabs({
  active,
  counts,
  onChange,
}: {
  active: PhaseId;
  counts: Record<PhaseId, number>;
  onChange: (id: PhaseId) => void;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusPhase(index: number) {
    const next = (index + phases.length) % phases.length;
    onChange(phases[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div role="tablist" aria-label="Phase of work" className="flex flex-wrap gap-2">
      {phases.map((phase, i) => {
        const selected = phase.id === active;
        const count = counts[phase.id];

        // Without the aria-label the accessible name runs the label into the
        // count ("Pre-AI Work12"); the count reads better as words anyway.
        return (
          <button
            key={phase.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`phase-tab-${phase.id}`}
            aria-selected={selected}
            aria-controls="phase-panel"
            aria-label={count > 0 ? `${phase.label}, ${count} projects` : phase.label}
            tabIndex={selected ? 0 : -1}
            data-active={selected}
            className="phase-tab"
            onClick={() => onChange(phase.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                focusPhase(i + 1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                focusPhase(i - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                focusPhase(0);
              } else if (event.key === "End") {
                event.preventDefault();
                focusPhase(phases.length - 1);
              }
            }}
          >
            {phase.label}
            {count > 0 && <span className="phase-tab-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
