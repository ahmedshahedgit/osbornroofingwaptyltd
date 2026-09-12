import { ArrowUp } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { business, navLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-ink-soft">
      <div className="mx-auto max-w-[100rem] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="min-w-0">
            <Wordmark />
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-bone/65">
              Roofing services from {business.locality}, built around quality, reliability and
              safety.
            </p>
          </div>

          <nav aria-label="Footer" className="min-w-0">
            <ul className="grid gap-3 sm:grid-cols-2 md:gap-x-14">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.68rem] font-bold tracking-[0.24em] text-bone/70 uppercase transition-colors hover:text-brass"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 grid gap-6 border-t border-border pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0 space-y-2">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              &copy; {year} {business.name}
            </p>
            <p className="text-xs text-muted-foreground">{business.location}</p>
          </div>
          <a
            href="#hero"
            className="inline-flex w-fit items-center gap-3 border border-border px-4 py-3 text-[0.62rem] font-bold tracking-[0.26em] text-bone/75 uppercase transition-colors hover:border-brass hover:text-brass"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
