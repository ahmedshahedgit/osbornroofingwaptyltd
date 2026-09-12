import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/osborn/Navbar";
import { Hero } from "@/components/osborn/Hero";
import { NotJustARoof } from "@/components/osborn/NotJustARoof";
import { WhyOsborn } from "@/components/osborn/WhyOsborn";
import { Projects } from "@/components/osborn/Projects";
import { AboutOsborn } from "@/components/osborn/AboutOsborn";
import { Reels } from "@/components/osborn/Reels";
import { BeforeAfter } from "@/components/osborn/BeforeAfter";
import { ContactCta } from "@/components/osborn/ContactCta";
import { Footer } from "@/components/osborn/Footer";

const title = "Osborn Roofing WA | Roofing in Busselton, WA";
const description =
  "Osborn Roofing WA Pty Ltd — roofing services from Busselton, Western Australia, built around quality, reliability and safety.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-bone">
      <Navbar />
      <main>
        <Hero />
        <NotJustARoof />
        <WhyOsborn />
        <Projects />
        <AboutOsborn />
        <Reels />
        <BeforeAfter />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
