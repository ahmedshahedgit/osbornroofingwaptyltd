import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { business, images } from "@/data/site";

export function AboutOsborn() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const headingX = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0px", "0px"] : ["-60px", "60px"],
  );
  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? ["0px", "0px"] : ["80px", "-80px"]);

  // The image expands to dominate mid-section, then releases.
  const imgClip = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75],
    reduced
      ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(22% 30% 22% 30%)", "inset(0% 0% 0% 0%)", "inset(8% 12% 8% 12%)"],
  );
  const imgScale = useTransform(scrollYProgress, [0.1, 0.5, 1], [1.14, 1, 1.06]);
  const imgOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.72, 0.95], [0.4, 1, 0.55, 0.35]);

  return (
    <section id="about" ref={ref} aria-labelledby="about-heading" className="relative bg-ink-soft">
      <div className="relative overflow-hidden py-28 md:py-44">
        <motion.div
          style={{ clipPath: imgClip, opacity: imgOpacity }}
          className="absolute inset-x-0 top-1/2 -mt-[38vh] h-[76vh]"
        >
          <motion.img
            src={images.about}
            alt="Roofers working on a pitched metal roof at dusk"
            width={1600}
            height={1200}
            loading="lazy"
            style={{ scale: imgScale }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-0 bg-burgundy-deep/35 mix-blend-multiply" />
        </motion.div>

        <div className="relative mx-auto max-w-[100rem] px-5 md:px-8">
          <p className="eyebrow">About Osborn</p>
          <motion.h2 id="about-heading" style={{ x: headingX }} className="display-xl mt-6">
            About
            <br />
            Osborn
          </motion.h2>

          <motion.div
            style={{ y: copyY }}
            className="mt-24 grid gap-10 md:mt-40 md:grid-cols-2 md:gap-20"
          >
            <p className="display-md max-w-[22ch] text-brass">Built with purpose.</p>
            <div className="space-y-6 border-t border-border pt-8 md:border-t-0 md:pt-0">
              <p className="text-lg leading-relaxed text-bone/85">
                {business.name} is a roofing company based in {business.locality}, working across the
                region.
              </p>
              <p className="text-base leading-relaxed text-bone/70">
                The way we work comes back to three things — quality, reliability and safety. That
                means details finished properly, clear communication from first contact through to
                completion, and safe practice kept part of the job rather than an afterthought.
              </p>
              <ul className="grid gap-3 pt-4">
                {business.brandStatement.map((word) => (
                  <li
                    key={word}
                    className="flex items-center gap-4 border-t border-border pt-3 text-[0.7rem] font-bold tracking-[0.3em] uppercase"
                  >
                    <span className="text-brass">/</span>
                    {word}
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-sm text-muted-foreground">
                Further company information will be added here as it is supplied.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
