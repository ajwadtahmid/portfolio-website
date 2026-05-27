import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "skills",     label: "Skills" },
  { id: "contact",    label: "Contact" },
];

export default function NavDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const fn = () => {
      const scrollY = window.scrollY;
      const atBottom = scrollY + window.innerHeight >= document.body.scrollHeight - 40;
      if (atBottom) { setActive("contact"); return; }
      const trigger = window.innerHeight * 0.35;
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - trigger <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
