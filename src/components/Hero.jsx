import { useEffect, useRef } from "react";
import { useTypewriter, useScrollProgress } from "../hooks";
import { ROLES } from "../data";
import ScrambleName from "./ScrambleName";
import Particles from "./Particles";

export default function Hero({ dark }) {
  useScrollProgress();
  const role = useTypewriter(ROLES);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

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
    <section id="hero" className="hero grain" aria-label="Introduction">
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

        <p className="hero-tagline h3">
          I build scalable applications that solve real problems — and that
          people actually enjoy using.
        </p>

        <div className="hero-cta h4">
          <a href="#projects" className="btn btn-p">
            View Projects
          </a>
          <a href="#contact" className="btn btn-o">
            Contact Me
          </a>
        </div>
      </div>

    </section>
  );
}
