import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

/** Draggable before/after comparison. Works with mouse, touch and keyboard. */
export function BeforeAfter() {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="relative overflow-hidden bg-ink"
    >
      <div className="mx-auto max-w-[100rem] px-5 py-28 md:px-8 md:py-40">
        <p className="eyebrow">Before &amp; after</p>
        <motion.h2
          id="before-after-heading"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
          className="display-lg mt-6 max-w-[20ch]"
        >
          Drag to <span className="text-brass">compare</span>
        </motion.h2>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease }}
          className="mt-12 md:mt-20"
        >
          <div
            ref={frameRef}
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
            className="frame relative aspect-[4/5] w-full touch-none select-none md:aspect-[16/9]"
          >
            <img
              src={beforeAfter.after.src}
              alt={beforeAfter.after.alt}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src={beforeAfter.before.src}
                alt={beforeAfter.before.alt}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/25" />
            </div>

            <span className="pointer-events-none absolute top-4 left-4 border border-brass/40 bg-ink/70 px-3 py-2 text-[0.6rem] font-bold tracking-[0.28em] text-bone uppercase">
              Before
            </span>
            <span className="pointer-events-none absolute top-4 right-4 border border-brass/40 bg-ink/70 px-3 py-2 text-[0.6rem] font-bold tracking-[0.28em] text-brass uppercase">
              After
            </span>

            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-brass"
              style={{ left: `${pos}%` }}
            />
            <button
              type="button"
              role="slider"
              aria-label="Before and after comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                e.stopPropagation();
                dragging.current = true;
              }}
              className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-brass bg-ink/80 text-brass backdrop-blur-sm"
              style={{ left: `${pos}%` }}
            >
              <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {beforeAfter.placeholder
              ? "Placeholder images. Real paired before and after photos will replace these."
              : "Drag the handle, or use the arrow keys, to compare."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
