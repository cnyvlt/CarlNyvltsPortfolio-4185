import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { ProjectImage } from "../data/projects";

interface LightboxProps {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export function Lightbox({ images, index, onClose, onIndex }: LightboxProps) {
  const current = images[index];

  const step = useCallback(
    (dir: 1 | -1) => {
      onIndex((index + dir + images.length) % images.length);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, step]);

  if (!current) return null;

  return (
    <dialog
      open
      aria-label={current.caption}
      className="fixed inset-0 z-50 m-0 h-full w-full max-w-none border-0 p-0"
      style={{ background: "#111110" }}
    >
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div className="pointer-events-none relative flex h-full flex-col">
        <div className="container-x pointer-events-auto flex items-center justify-between py-5">
          <span className="label" style={{ color: "rgba(242,241,238,0.7)" }}>
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="p-1 transition-opacity hover:opacity-70"
            style={{ color: "var(--paper)" }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-[var(--gutter)] pb-4">
          <img
            src={current.src}
            alt={current.caption}
            className="max-h-[74vh] w-auto max-w-full object-contain"
            style={{ background: "var(--surface)" }}
          />
        </div>

        <div
          className="container-x flex items-center justify-between gap-6 py-5"
          style={{ borderTop: "1px solid rgba(242,241,238,0.16)" }}
        >
          <span className="text-sm" style={{ color: "rgba(242,241,238,0.8)" }}>
            {current.caption}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="p-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--paper)" }}
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="p-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--paper)" }}
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
