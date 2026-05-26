import { useState, useEffect } from "react";
import { useAmbientSound } from "../hooks";
import { SunIcon, MoonIcon, SpeakerOnIcon, SpeakerOffIcon } from "../icons";

const NAV_LINKS = [
  { label: "About",    href: "#about",    id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills",   href: "#skills",   id: "skills" },
  { label: "Contact",  href: "#contact",  id: "contact" },
  { label: "Resume",   href: "https://drive.google.com/file/d/1KMFSPUUP1jbwa9RSZxjZNKlxFUOfN_5X/view?usp=drive_link", id: null },
];

export default function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [soundOn, toggleSound] = useAmbientSound();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["about", "projects", "skills", "contact"];
    const fn = () => {
      const scrollY = window.scrollY;
      const atBottom = scrollY + window.innerHeight >= document.body.scrollHeight - 40;
      if (atBottom) { setActive("contact"); return; }
      const trigger = window.innerHeight * 0.35;
      let current = "";
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
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`} aria-label="Primary navigation">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">ATA</a>
        <div className="nav-desktop">
          {NAV_LINKS.map((link) => {
            const ext = link.id === null;
            const isActive = link.id !== null && active === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nl${isActive ? " nl-active" : ""}${ext ? " nl-resume" : ""}`}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="nav-actions">
          <button className="icobtn" onClick={toggleSound} title={soundOn ? "Mute ambient" : "Ambient sound"} aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}>
            {soundOn ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
          </button>
          <button className="icobtn" onClick={() => setDark(!dark)} aria-label={dark ? "Light mode" : "Dark mode"}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="icobtn nav-mob-btn" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              {open ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mob-menu">
          {NAV_LINKS.map((link) => {
            const ext = link.id === null;
            return (
              <a key={link.label} href={link.href} className="nav-mob-link" onClick={() => setOpen(false)} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
