// Content for the desktop view. Projects, skills, experience and stats come
// straight from the main site's data file, so the two views cannot drift apart.
import {
  PROJECTS as SITE_PROJECTS,
  SKILLS,
  EXPERIENCE as SITE_EXPERIENCE,
  STATS as SITE_STATS,
  CONTACT_EMAIL,
  RESUME_URL,
} from "../data";

export { SKILLS };

export const PERSON = {
  name: "Ajwad Tahmid Ayon",
  shortName: "Ajwad",
  role: "Software Engineer",
  tagline: "Products, built with intention.",
  status: "Open to opportunities",
  location: "Southern California",
  relocation: "Open to relocation",
  degree: "B.S. Computer Science",
  school: "University of California, Irvine",
  schoolShort: "UC Irvine",
  gradYear: "2025",
  site: "ajwadtahmid.com",
  about: [
    "I'm a Computer Science graduate who believes technology should solve real problems, and solve them well. I'm experienced across full-stack web, mobile, and machine learning, and I take pride in the craft. Clean code, thoughtful design, and reliability aren't nice-to-haves; they're fundamental.",
    "Outside the terminal, you'll catch me gaming, exploring new technology, or enjoying nature on the trail.",
  ],
};

export const LINKS = {
  email: CONTACT_EMAIL,
  github: "https://github.com/ajwadtahmid",
  githubLabel: "github.com/ajwadtahmid",
  linkedin: "https://www.linkedin.com/in/ajwad-tahmid-ayon/",
  linkedinLabel: "linkedin.com/in/ajwad-tahmid-ayon",
  resume: RESUME_URL,
  site: "/",
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const KIND = { freelance: "Freelance", education: "Education", work: "Work" };

export const PROJECTS = SITE_PROJECTS.map((p) => ({ ...p, id: slug(p.name) }));

// Newest first, as on the site.
export const EXPERIENCE = SITE_EXPERIENCE.map((e) => {
  const [from, to] = e.period.split("–").map((s) => s.trim());
  return { ...e, id: slug(e.org), kind: KIND[e.type], from, to };
});

export const STATS = SITE_STATS.map((s) => ({
  value: `${s.end}${s.suf}`,
  label: s.label.toLowerCase().replace("github", "GitHub"),
}));
