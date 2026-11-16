import { useEffect, useRef, lazy, Suspense } from "react";
import { useTypewriter, useScrollProgress } from "../hooks";
import { useMotion } from "../motion";
import { ROLES, RESUME_URL, CONTACT_EMAIL } from "../data";
import ScrambleName from "./ScrambleName";
// Decorative canvas: keep it out of the first-paint bundle
const Particles = lazy(() => import("./Particles"));
import WaveDivider from "./WaveDivider";

export default function Hero({ dark }) {
  useScrollProgress();
  const role = useTypewriter(ROLES);
  const motionOn = useMotion();
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const orbs = [orb1Ref, orb2Ref, orb3Ref];
    if (!dark || !motionOn) {
      orbs.forEach((r) => r.current && (r.current.style.translate = ""));
      return;
    }
    // One frame-batched write per scroll burst, and none once the hero is gone
    let raf = 0;
    const apply = () => {
      raf = 0;
      const s = window.scrollY;
      if (s > window.innerHeight * 1.5) return;
      if (orb1Ref.current) orb1Ref.current.style.translate = `0 ${s * 0.25}px`;
      if (orb2Ref.current) orb2Ref.current.style.translate = `0 ${s * 0.15}px`;
      if (orb3Ref.current) orb3Ref.current.style.translate = `0 ${s * 0.18}px`;
    };
    const fn = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      cancelAnimationFrame(raf);
    };
  }, [dark, motionOn]);

  return (
    <section id="hero" className="hero grain" aria-labelledby="hero-title">
      <div className="hero-dots" aria-hidden="true" />
      {dark && (
        <>
          <div ref={orb1Ref} className="orb o1" aria-hidden="true" />
          <div ref={orb2Ref} className="orb o2" aria-hidden="true" />
          <div ref={orb3Ref} className="orb o3" aria-hidden="true" />
          {motionOn && (
            <Suspense fallback={null}>
              <Particles />
            </Suspense>
          )}
        </>
      )}

      <div className="hero-inner">
        <h1 id="hero-title" className="hero-name h1">
          <ScrambleName text="Ajwad Tahmid Ayon" />
        </h1>

        <div className="hero-role-row h2">
          <span style={{ color: "var(--t3)" }}>I'm a</span>
          {/* The typed text changes every few ms; hide it from assistive tech
              and give it one static, complete description instead. */}
          <span className="hero-typed" aria-hidden="true">
            {role}
          </span>
          <span className="sr">
            {ROLES.map((r) => r.replace(/\.$/, "")).join(", ")}
          </span>
          <span className="cr" aria-hidden="true" />
        </div>

        <p className="hero-tagline h3">Products, built with intention.</p>

        <div className="hero-cta h4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-p">
            Email me
          </a>
          <a href="#projects" className="btn btn-o">
            View Projects
          </a>
          <a href={RESUME_URL} className="btn btn-o">
            Resume ↓
          </a>
        </div>
      </div>

      <WaveDivider nextBg="var(--bg2)" />
    </section>
  );
}
