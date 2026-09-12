import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, images } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, reduced ? 1.1 : 1]);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        <motion.img
          src={images.detail}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{ y: imgY, scale: imgScale }}
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-burgundy-deep/45 mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-5 py-28 md:px-8 md:py-44">
        <p className="eyebrow">Get in touch</p>
        <motion.h2
          id="contact-heading"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease }}
          className="display-xl mt-6 max-w-[16ch]"
        >
          Let's talk <span className="text-brass">roofing.</span>
        </motion.h2>

        <div className="mt-16 grid gap-12 border-t border-border pt-10 md:mt-24 md:grid-cols-2 md:gap-20">
          <ul className="grid gap-6">
            <li>
              <a
                href={business.phoneHref}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"
              >
                <Phone className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                    Phone
                  </span>
                  <span className="block truncate text-lg text-bone transition-colors group-hover:text-brass">
                    {business.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={business.emailHref}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"
              >
                <Mail className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                    Email
                  </span>
                  <span className="block truncate text-lg text-bone transition-colors group-hover:text-brass">
                    {business.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={business.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[0.6rem] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                    Messenger
                  </span>
                  <span className="block truncate text-lg text-bone transition-colors group-hover:text-brass">
                    Message on Facebook
                  </span>
                </span>
              </a>
            </li>
            <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[0.6rem] font-bold tracking-[0.3em] text-muted-foreground uppercase">
                  Location
                </span>
                <span className="block text-lg text-bone">{business.location}</span>
              </span>
            </li>
          </ul>

          <div className="flex flex-col justify-between gap-10">
            <p className="display-md max-w-[20ch] text-bone">Quality. Reliability. Safety.</p>
            <div className="flex flex-wrap gap-3">
              <a href={business.phoneHref} className="btn-base btn-primary">
                Call {business.shortName}
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={business.emailHref} className="btn-base btn-ghost">
                Send an email
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
