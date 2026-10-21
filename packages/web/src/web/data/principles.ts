/**
 * Guiding principles — Carl's position on AI and human-centered design.
 *
 * These are distributed across the interface rather than gathered in one place:
 *   · the masthead motto under the nav (every page)
 *   · the epigraph above the footer columns (every page)
 *   · one marginal note per interior page, matched to that page's subject
 *
 * Wording is kept verbatim here so the copy lives in one file and the
 * placement of any line can be changed without hunting through pages.
 */
export const principles = {
  /** The site's signature line — the masthead motto. */
  authorOfPurpose:
    "In every AI-driven design, the human hand must be the author of purpose.",
  /** The closing sign-off above the footer. */
  remainInControl:
    "AI is a tool, but human-centered design is the principle that ensures we remain in control.",
  /** Asks the question the whole practice answers. */
  whoKeepsUx: "When AI starts designing, who keeps UX consistent?",
  /** Empathy first — the research and process stages. */
  empathyCompass:
    "The best AI solutions emerge when empathy is the compass and design leads the way.",
  /** Craft — functionality and meaning held together. */
  innovationBalance:
    "True innovation balances seamless functionality with meaningful design, even in an AI-powered world.",
  /** The compass line, for the client-facing pages. */
  humanCompass:
    "AI is a powerful tool, but human-centered design is the compass that points the way.",
} as const;

export type PrincipleKey = keyof typeof principles;
