import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { images, pillars } from "@/data/site";

/** Offsets give each pillar its own position rather than a card grid. */
const layout = [
  "md:col-start-1 md:col-end-6 md:mt-0",
  "md:col-start-6 md:col-end-11 md:mt-28",
  "md:col-start-3 md:col-end-9 md:mt-16",
];

export function WhyOsborn() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, reduced ? 1.15 : 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 0.22, 0.1]);
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0px", "0px"] : ["70px", "-70px"],
  );
  const titleScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-ink-soft py-28 md:py-40"
    >
      <motion.img
        src={images.about}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1200}
        loading="lazy"
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-burgundy-deep/30 mix-blend-multiply" />

      <div className="relative mx-auto max-w-[100rem] px-5 md:px-8">
        <p className="eyebrow">Proof in motion</p>

        <motion.h2
          id="why-heading"
          style={{ y: titleY, scale: titleScale }}
          className="display-xl mt-8 origin-left"
        >
          Why
          <br />
          <span className="text-burgundy-soft">Osborn</span>
        </motion.h2>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-10 md:gap-0">
          {pillars.map((p, i) => (
            <motion.article
              key={p.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative ${layout[i]}`}
            >
              <div className="rule-brass w-16" />
              <h3 className="display-md mt-5 transition-transform duration-500 group-hover:-translate-y-1 md:group-hover:scale-[1.03] origin-left">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-bone/75">{p.copy}</p>
              <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:opacity-40">
                {p.aside}
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block font-display text-6xl font-extrabold text-bone/5 transition-colors duration-500 group-hover:text-brass/25"
              >
                0{i + 1}
              </span>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9 }}
          className="mt-24 border-t border-border pt-10 text-[0.7rem] font-bold tracking-[0.32em] text-brass uppercase"
        >
          Quality &middot; Reliability &middot; Safety
        </motion.p>
      </div>
    </section>
  );
}
