import { useState, useEffect, useCallback, useRef } from "react";
import { useActiveSection } from "../hooks";
import { RESUME_URL } from "../data";
import { useMotion, setMotion } from "../motion";
import {
  SunIcon,
  MoonIcon,
  GithubIcon,
  LinkedInIcon,
} from "../icons";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const NAV_IDS = NAV_LINKS.map((l) => l.id);

export default function Nav({ dark, setDark, onTermOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);
  const active = useActiveSection(NAV_IDS);
  const motionOn = useMotion();
  const menuBtnRef = useRef(null);
  const overlayRef = useRef(null);

  // Mobile menu: focus the first link, close on Escape, keep Tab inside the
  // menu (plus its toggle button), and return focus to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const btn = menuBtnRef.current;
    overlayRef.current?.querySelector("a[href]")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [btn, ...overlayRef.current.querySelectorAll("a[href]")];
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!items.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={`nav${scrolled ? " nav--scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            ATA
          </a>
          <div className="nav-desktop">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nl${active === link.id ? " nl-active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a href={RESUME_URL} className="nl nl-resume">
              Resume
            </a>
            <button
              className="icobtn"
              onClick={onTermOpen}
              aria-label="Open terminal (press backtick or click here)"
              title="Terminal — Press ` or click"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </button>
            <button
              className="icobtn"
              onClick={() => setMotion(!motionOn)}
              aria-label="Animations"
              aria-pressed={motionOn}
              title={motionOn ? "Animations on (click to turn off)" : "Animations off (click to turn on)"}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {motionOn ? (
                  <>
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </>
                ) : (
                  <polygon points="7 4 20 12 7 20" />
                )}
              </svg>
            </button>
            <button
              className="icobtn"
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              ref={menuBtnRef}
              className="icobtn nav-mob-btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {open ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div
          ref={overlayRef}
          className="mob-overlay"
          role="dialog"
          aria-label="Site menu"
        >
          <nav className="mob-overlay-inner" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="mob-overlay-link"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              className="mob-overlay-link"
              style={{ animationDelay: `${NAV_LINKS.length * 0.06}s` }}
              onClick={closeMenu}
            >
              Resume
            </a>
            <div
              className="mob-overlay-socials"
              style={{ animationDelay: `${(NAV_LINKS.length + 1) * 0.06}s` }}
            >
              <a
                href="https://github.com/ajwadtahmid"
                target="_blank"
                rel="noopener noreferrer"
                className="mob-overlay-social-link"
                aria-label="GitHub"
              >
                <GithubIcon size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/ajwad-tahmid-ayon/"
                target="_blank"
                rel="noopener noreferrer"
                className="mob-overlay-social-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={22} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
