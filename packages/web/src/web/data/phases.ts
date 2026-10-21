/**
 * The two phases of the practice.
 *
 * Carl's work divides in two: twenty years of craft delivered without AI
 * tooling, and the current phase where AI tools run through the whole process.
 * That split is the spine of /work — a visitor should always be able to tell
 * which phase they are looking at and move between them.
 *
 * Labels, summaries and empty-state copy live here so the wording stays in one
 * place; the projects themselves carry only a `phase` id.
 */

export type PhaseId = "pre-ai" | "ai-enhanced";

export interface Phase {
  id: PhaseId;
  /** Tab and heading label. */
  label: string;
  /** One-line summary, set under the phase heading. */
  summary: string;
  /** Longer statement, shown when the phase is the active view. */
  body: string;
}

export const phases: Phase[] = [
  {
    id: "pre-ai",
    label: "Pre-AI Work",
    summary: "Twenty years of craft, delivered before AI tooling.",
    body: "Research, documentation, wireframes, interactive testing and hi-fidelity design — the full process, run by hand. This is the foundation the AI-enhanced work is built on, and the standard it is held to.",
  },
  {
    id: "ai-enhanced",
    label: "AI-Enhanced Work",
    summary: "AI across the whole process, human judgement at the end.",
    body: "Projects where AI tools widen the range of what gets explored — ideation, content, prototyping and visual direction — with the designer deciding what actually ships.",
  },
];

export const phaseIds = phases.map((p) => p.id);

export function getPhase(id: PhaseId): Phase {
  const phase = phases.find((p) => p.id === id);
  if (!phase) throw new Error(`Unknown phase: ${id}`);
  return phase;
}

/** Narrows an arbitrary URL value to a real phase id. */
export function isPhaseId(value: string | null | undefined): value is PhaseId {
  return value === "pre-ai" || value === "ai-enhanced";
}
