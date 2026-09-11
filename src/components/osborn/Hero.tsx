import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Phone } from "lucide-react";
import { business, images } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-22%"]);
  const textFade = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(18% 12% 18% 12%)", opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 1.5, ease }}
        className="absolute inset-0"
      >
        <motion.img
          src={images.hero}
          alt="Dark metal roof on a modern home, late afternoon light across the ridge"
          width={1920}
          height={1280}
          fetchPriority="high"
          style={{ y: imageY, scale: imageScale }}
          className="h-full w-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="absolute inset-0 bg-burgundy-deep/25 mix-blend-multiply" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textFade }}
        className="relative mx-auto w-full max-w-[100rem] px-5 pt-32 pb-14 md:px-8 md:pb-20"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease }}
          className="eyebrow"
        >
          {business.brandStatement.join(" | ")}
        </motion.p>

        <h1 className="display-xl mt-6 max-w-[18ch]">
          {["Roofing that", "stands above."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.6 + i * 0.12, duration: 1, ease }}
              >
                {i === 1 ? (
                  <>
                    stands <span className="text-brass">above.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease }}
          className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
        >
          <p className="max-w-[46ch] text-base leading-relaxed text-bone/80 md:text-lg">
            Roofing services from {business.locality}, built around quality, reliability and safety.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-base btn-primary">
              Get in touch
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={business.phoneHref} className="btn-base btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Osborn
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 text-[0.65rem] font-bold tracking-[0.3em] text-muted-foreground uppercase"
        >
          {business.location}
        </motion.p>
      </motion.div>
    </section>
  );
}
