import { useActiveSection } from "../hooks";

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "skills",     label: "Skills" },
  { id: "contact",    label: "Contact" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function NavDots() {
  const active = useActiveSection(SECTION_IDS, "hero");

  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`nd${active === id ? " nd--active" : ""}`}
          aria-label={label}
          data-label={label}
        />
      ))}
    </nav>
  );
}
