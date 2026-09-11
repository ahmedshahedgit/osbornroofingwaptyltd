import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { projects, type Project } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectLayer({
  project,
  index,
  total,
  progress,
  reduced,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;

  // Each layer slides up and clips into view over the previous one.
  const clip = useTransform(
    progress,
    [Math.max(0, start - span * 0.55), start],
    index === 0 ? ["inset(0% 0 0 0)", "inset(0% 0 0 0)"] : ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - span * 0.55), start],
    index === 0 ? ["0%", "0%"] : reduced ? ["0%", "0%"] : ["12%", "0%"],
  );
  const scale = useTransform(progress, [start, end], [1.08, reduced ? 1.08 : 1]);
  const captionOpacity = useTransform(
    progress,
    [start, start + span * 0.3, end - span * 0.1, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );

  return (
    <motion.div style={{ clipPath: clip, y }} className="absolute inset-0">
      <motion.img
        src={project.image}
        alt={project.alt}
        width={1600}
        height={1200}
        loading="lazy"
        style={{ scale }}
        className="h-full w-full object-cover"
      />
      <div className="veil absolute inset-0" />
      <div className="absolute inset-0 bg-burgundy-deep/20 mix-blend-multiply" />

      <motion.div
        style={{ opacity: captionOpacity }}
        className="absolute inset-x-0 bottom-0 p-5 md:p-10"
      >
        <div className="flex items-end justify-between gap-4 border-t border-brass/30 pt-5">
          <div className="min-w-0">
            <h3 className="display-md truncate">{project.title}</h3>
            {project.location ? (
              <p className="mt-2 text-[0.7rem] font-bold tracking-[0.28em] text-brass uppercase">
                {project.location}
              </p>
            ) : null}
            {project.note ? (
              <p className="mt-2 max-w-[42ch] text-sm text-bone/70">{project.note}</p>
            ) : null}
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 font-display text-2xl font-extrabold text-bone/50 md:text-4xl"
          >
            0{index + 1}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0px", "0px"] : ["0px", "-160px"],
  );
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.15]);

  return (
    <section id="projects" ref={ref} aria-labelledby="projects-heading" className="relative bg-ink">
      <div className="mx-auto max-w-[100rem] px-5 pt-24 md:px-8 md:pt-36">
        <p className="eyebrow">Projects in motion</p>
        <motion.h2
          id="projects-heading"
          style={{ y: headingY, opacity: headingOpacity }}
          className="display-xl mt-6"
        >
          Projects
        </motion.h2>
      </div>

      {/* Scroll distance drives the stacked reveals. */}
      <div className="relative" style={{ height: `${projects.length * 100}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="frame absolute inset-4 md:inset-10">
            {projects.map((p, i) => (
              <ProjectLayer
                key={p.id}
                project={p}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-[100rem] px-5 pb-24 text-sm text-muted-foreground md:px-8 md:pb-36"
      >
        Project names, locations and descriptions will be added as real project information becomes
        available.
      </motion.p>
    </section>
  );
}
