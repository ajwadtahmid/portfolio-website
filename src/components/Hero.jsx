import { useEffect, useRef, useState } from "react";
import { useTypewriter, useScrollProgress } from "../hooks";
import { ROLES, RESUME_URL, CONTACT_EMAIL } from "../data";
import ScrambleName from "./ScrambleName";
import Particles from "./Particles";
import WaveDivider from "./WaveDivider";

export default function Hero({ dark }) {
  useScrollProgress();
  const role = useTypewriter(ROLES);
  const [emailCopied, setEmailCopied] = useState(false);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch (e) {
      window.open(`mailto:${CONTACT_EMAIL}`);
    }
  };

  useEffect(() => {
    if (!dark) return;
    const fn = () => {
      const s = window.scrollY;
      if (orb1Ref.current) orb1Ref.current.style.translate = `0 ${s * 0.25}px`;
      if (orb2Ref.current) orb2Ref.current.style.translate = `0 ${s * 0.15}px`;
      if (orb3Ref.current) orb3Ref.current.style.translate = `0 ${s * 0.18}px`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [dark]);

  return (
    <section id="hero" className="hero grain" aria-label="Hero section with name, role, and call to action buttons">
      <div className="hero-dots" aria-hidden="true" />
      {dark && (
        <>
          <div ref={orb1Ref} className="orb o1" aria-hidden="true" />
          <div ref={orb2Ref} className="orb o2" aria-hidden="true" />
          <div ref={orb3Ref} className="orb o3" aria-hidden="true" />
          <Particles />
        </>
      )}

      <div className="hero-inner">
        <h1 className="hero-name h1">
          <ScrambleName text="Ajwad Tahmid Ayon" />
        </h1>

        <div
          className="hero-role-row h2"
          aria-live="polite"
          aria-label={`Role: ${role}`}
        >
          <span style={{ color: "var(--t3)" }}>I'm a</span>
          <span className="hero-typed">{role}</span>
          <span className="cr" aria-hidden="true" />
        </div>

        <p className="hero-tagline h3">Products, built with intention.</p>

        <div className="hero-cta h4">
          <button
            onClick={handleEmailCopy}
            className={`btn btn-p${emailCopied ? " copy-btn--copied" : ""}`}
            aria-label="Copy email address to clipboard"
            title={`Copy ${CONTACT_EMAIL}`}
          >
            {emailCopied ? "✓ Copied" : "Email me"}
          </button>
          <a href="#projects" className="btn btn-o">
            View Projects
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-p"
          >
            Resume ↓
          </a>
        </div>
      </div>

      <WaveDivider nextBg="var(--bg2)" />
    </section>
  );
}
