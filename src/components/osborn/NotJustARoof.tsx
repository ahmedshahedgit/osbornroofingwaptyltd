import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { business, images } from "@/data/site";

/**
 * Signature cinematic typography section.
 * Layers move at different speeds and compose into one visual moment
 * before handing off to WHY OSBORN.
 */
export function NotJustARoof() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const k = reduced ? 0 : 1;
  const t = (a: number, b: number) => [a * k, b * k];

  const notX = useTransform(scrollYProgress, [0, 1], t(-140, 90).map((v) => `${v}px`));
  const justX = useTransform(scrollYProgress, [0, 1], t(160, -110).map((v) => `${v}px`));
  const roofY = useTransform(scrollYProgress, [0, 1], t(120, -70).map((v) => `${v}px`));
  const roofScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1 + 0.08 * k, 1 + 0.02 * k]);

  const imgClip = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(28% 34% 28% 34%)", "inset(0% 0% 0% 0%)"],
  );
  const imgY = useTransform(scrollYProgress, [0, 1], t(-60, 60).map((v) => `${v}px`));
  const imgOpacity = useTransform(scrollYProgress, [0.02, 0.3, 0.9, 1], [0.25, 0.75, 0.75, 0.4]);

  const wordsOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.85], [0, 1, 1]);
  const wordsY = useTransform(scrollYProgress, [0.35, 0.7], t(60, 0).map((v) => `${v}px`));

  return (
    <section
      ref={ref}
      aria-label="Not just a roof"
      className="relative overflow-hidden bg-ink py-28 md:py-44"
    >
      <motion.div
        style={{ clipPath: imgClip, y: imgY, opacity: imgOpacity }}
        className="absolute inset-x-4 top-1/2 -mt-[32vh] h-[64vh] md:inset-x-16"
      >
        <img
          src={images.detail}
          alt="Close detail of metal roof capping and fixings"
          width={1600}
          height={1200}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-burgundy-deep/40 mix-blend-multiply" />
      </motion.div>

      <div className="relative mx-auto max-w-[100rem] px-5 md:px-8">
        <p className="eyebrow">What's above matters</p>

        <div className="mt-10 space-y-1 md:space-y-2">
          <motion.h2 style={{ x: notX }} className="display-xl">
            Not
          </motion.h2>
          <motion.p
            style={{ x: justX }}
            className="display-lg text-right text-bone/45 md:text-center"
          >
            Just a
          </motion.p>
          <motion.p
            style={{ y: roofY, scale: roofScale }}
            className="display-xl origin-left text-brass"
          >
            Roof
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: wordsOpacity, y: wordsY }}
          className="mt-16 grid gap-8 border-t border-border pt-10 md:mt-24 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-16"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {business.brandStatement.map((word) => (
              <li
                key={word}
                className="text-[0.7rem] font-bold tracking-[0.3em] text-bone/70 uppercase"
              >
                {word}
              </li>
            ))}
          </ul>
          <p className="display-md max-w-[24ch] text-bone md:justify-self-end md:text-right">
            Quality in the details.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
