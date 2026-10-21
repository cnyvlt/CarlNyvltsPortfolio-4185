import { useEffect, useRef, useState } from "react";

/**
 * The hand-drawing clip, kept as a faint chalk animation behind the page.
 *
 * Three gates before it loads at all, because it is decoration and should never
 * cost anyone anything:
 *   · `prefers-reduced-motion` — the site already stops animating there
 *   · below `md` — phones pay for data, and at this weight it is barely legible
 *   · save-data / 2G connections
 *
 * It also fades in only once it can actually play, so there is no pop.
 */
export function ChalkBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const evaluate = () =>
      setEnabled(
        !reduce.matches &&
          wide.matches &&
          !conn?.saveData &&
          !/^(slow-)?2g$/.test(conn?.effectiveType ?? ""),
      );

    evaluate();
    reduce.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      reduce.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, []);

  if (!enabled) return null;
  return <ChalkVideo />;
}

function ChalkVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Set muted as a property before play() — the attribute alone is not
    // reliable enough to satisfy autoplay policies.
    el.muted = true;
    const played = el.play();
    if (played && typeof played.catch === "function") played.catch(() => {});
  }, []);

  return (
    <div className="chalk-backdrop" data-ready={ready} aria-hidden="true">
      <video
        ref={ref}
        src="/texture/chalk-hand.mp4"
        aria-label="Pencil animation of a hand arranging interface cards"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
      />
    </div>
  );
}
