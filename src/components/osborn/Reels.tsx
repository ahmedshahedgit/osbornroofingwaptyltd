import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play, ExternalLink } from "lucide-react";
import { reels, business } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * REELS — cards are driven entirely by `reels` in src/data/site.ts.
 * A card with a `url` becomes a live link; without one it stays a
 * clearly-marked placeholder.
 */
export function Reels() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="reels" aria-labelledby="reels-heading" className="relative bg-ink-soft">
      <div className="mx-auto max-w-[100rem] px-5 py-28 md:px-8 md:py-40">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow">Reels</p>
            <motion.h2
              id="reels-heading"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease }}
              className="display-xl mt-6"
            >
              In <span className="text-brass">motion</span>
            </motion.h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-relaxed text-bone/70">
            Short clips from the roof. Reel links will be added here as they are supplied.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:gap-6">
          {reels.map((reel, i) => {
            const live = Boolean(reel.url);
            const isActive = active === reel.id;

            return (
              <motion.li
                key={reel.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.09, ease }}
                onHoverStart={() => setActive(reel.id)}
                onHoverEnd={() => setActive(null)}
                className="min-w-0"
              >
                <a
                  href={live ? reel.url : business.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  onFocus={() => setActive(reel.id)}
                  onBlur={() => setActive(null)}
                  aria-label={
                    live ? `Watch ${reel.title} on Facebook` : `${reel.title} — coming soon`
                  }
                  className="group frame relative block aspect-[9/13] w-full bg-ink"
                >
                  {reel.poster ? (
                    <img
                      src={reel.poster}
                      alt={reel.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="burgundy-wash absolute inset-0 opacity-70" />
                  )}
                  <div className="veil absolute inset-0" />

                  <motion.span
                    aria-hidden="true"
                    animate={{
                      scale: isActive && !reduced ? 1.12 : 1,
                      opacity: isActive ? 1 : 0.82,
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brass/60 bg-ink/40 backdrop-blur-sm"
                  >
                    <Play className="h-5 w-5 text-brass" />
                  </motion.span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-3 border-t border-brass/30 pt-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-lg font-extrabold uppercase">
                          {reel.title}
                        </h3>
                        <p className="mt-1 text-[0.62rem] font-bold tracking-[0.28em] text-brass uppercase">
                          {live ? "Watch reel" : reel.caption || "Coming soon"}
                        </p>
                      </div>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-bone/60 transition-colors group-hover:text-brass"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
