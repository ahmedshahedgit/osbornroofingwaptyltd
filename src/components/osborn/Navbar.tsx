import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { business, navLinks } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-ink/88 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8"
      >
        <a href="#hero" className="min-w-0" aria-label={`${business.name} — home`}>
          <Wordmark />
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[0.7rem] font-bold tracking-[0.22em] text-bone/75 uppercase transition-colors hover:text-brass"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-base btn-primary !px-6 !py-3">
            Get in touch
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={business.phoneHref}
            aria-label={`Call ${business.shortName} on ${business.phone}`}
            className="grid h-10 w-10 place-items-center border border-border text-bone/80 transition-colors hover:text-brass"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center border border-border text-bone transition-colors hover:text-brass"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[4.6rem] bottom-0 bg-ink/98 lg:hidden"
          >
            <ul className="flex flex-col px-5 pt-6">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.45 }}
                  className="border-b border-border"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-3xl font-extrabold uppercase"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pt-8">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-base btn-primary w-full"
              >
                Get in touch
              </a>
              <p className="mt-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {business.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
