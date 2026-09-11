/**
 * Single source of truth for Osborn Roofing WA Pty Ltd content.
 * Replace placeholder project / reel / before-after entries here — no
 * component changes required.
 */

import heroRoof from "@/assets/hero-roof.jpg";
import detailRoof from "@/assets/detail-roof.jpg";
import aboutRoof from "@/assets/about-roof.jpg";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export const business = {
  name: "Osborn Roofing WA Pty Ltd",
  shortName: "Osborn Roofing WA",
  brandStatement: ["Quality", "Reliability", "Safety"] as const,
  location: "Busselton, WA, Australia, 6820",
  locality: "Busselton, WA",
  phone: "+61 407 655 550",
  phoneHref: "tel:+61407655550",
  email: "osbornroofingwa@icloud.com",
  emailHref: "mailto:osbornroofingwa@icloud.com",
  messenger: "https://www.facebook.com/messages/t/osbornroofingwa/",
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Reels", href: "#reels" },
  { label: "Contact", href: "#contact" },
];

export const images = {
  hero: heroRoof,
  detail: detailRoof,
  about: aboutRoof,
};

/** Pillars — wording kept descriptive, no factual claims. */
export const pillars = [
  {
    id: "quality",
    title: "Quality",
    copy: "Attention to the details that finish the work properly.",
    aside: "Flashings, capping and fixings set out with care.",
  },
  {
    id: "reliability",
    title: "Reliability",
    copy: "Clear, dependable service from start to finish.",
    aside: "You know who is turning up and what happens next.",
  },
  {
    id: "safety",
    title: "Safety",
    copy: "Safety remains part of the work, from site to finish.",
    aside: "Access, edge protection and a tidy site every day.",
  },
];

/**
 * PROJECTS — placeholder entries.
 * Replace `title`, `location`, `note` and `image` with real project details
 * once they are available. Leave a field as an empty string to hide it.
 */
export type Project = {
  id: string;
  title: string;
  location: string;
  note: string;
  image: string;
  alt: string;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Project One",
    location: "",
    note: "Project details to be added.",
    image: project01,
    alt: "Metal roof on a coastal home at dusk",
    placeholder: true,
  },
  {
    id: "p2",
    title: "Project Two",
    location: "",
    note: "Project details to be added.",
    image: project02,
    alt: "Tiled pitched roof with ridge capping under a dark sky",
    placeholder: true,
  },
  {
    id: "p3",
    title: "Project Three",
    location: "",
    note: "Project details to be added.",
    image: project03,
    alt: "Long metal roof sheeting with clean flashings in low light",
    placeholder: true,
  },
];

/**
 * REELS — empty placeholders until real Facebook Reels are supplied.
 * Add `url` (Reel link) and optionally `poster` to make a card live.
 */
export type Reel = {
  id: string;
  title: string;
  caption: string;
  url: string;
  poster: string;
};

export const reels: Reel[] = [
  { id: "r1", title: "Reel One", caption: "Coming soon", url: "", poster: "" },
  { id: "r2", title: "Reel Two", caption: "Coming soon", url: "", poster: "" },
  { id: "r3", title: "Reel Three", caption: "Coming soon", url: "", poster: "" },
];

/** BEFORE & AFTER — replace with real paired Osborn images. */
export const beforeAfter = {
  before: { src: beforeImg, alt: "Weathered roof before roofing work (placeholder image)" },
  after: { src: afterImg, alt: "Restored metal roof after roofing work (placeholder image)" },
  placeholder: true,
};
