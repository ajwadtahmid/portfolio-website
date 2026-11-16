import { useState, useEffect, useRef } from "react";
import { useMotion } from "./motion";

export function useInView(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          o.disconnect();
        }
      },
      { threshold: t },
    );
    o.observe(el);
    return () => o.disconnect();
    // t is a mount-time constant; re-running would create a duplicate observer
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, vis];
}

export function useTypewriter(words, ms = 80, pause = 2700) {
  const [txt, setTxt] = useState("");
  const motionOn = useMotion();
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  useEffect(() => {
    if (!motionOn) return;
    let id;
    const run = () => {
      const w = words[wordIndex.current % words.length];
      let delay = ms;
      if (!isDeleting.current) {
        if (charIndex.current < w.length) {
          charIndex.current++;
          setTxt(w.slice(0, charIndex.current));
        } else {
          isDeleting.current = true;
          delay = pause;
        }
      } else {
        if (charIndex.current > 0) {
          charIndex.current--;
          setTxt(w.slice(0, charIndex.current));
          delay = ms / 2;
        } else {
          isDeleting.current = false;
          wordIndex.current++;
          delay = 220;
        }
      }
      id = setTimeout(run, delay);
    };
    id = setTimeout(run, 900);
    return () => clearTimeout(id);
    // words/ms/pause are static call-site values; only the motion setting restarts it
  }, [motionOn]); // eslint-disable-line react-hooks/exhaustive-deps
  // Motion off: no cycling, show the first role as plain static text
  return motionOn ? txt : words[0];
}

export function useCountUp(end, dur = 1300, shouldStart = false) {
  const [n, setN] = useState(0);
  const motionOn = useMotion();
  useEffect(() => {
    if (!shouldStart || !motionOn) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // dur is a stable default; including it would restart the count on unrelated re-renders
  }, [shouldStart, end, motionOn]); // eslint-disable-line react-hooks/exhaustive-deps
  return motionOn ? n : end;
}

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    // One frame-batched write per scroll burst, using transform (no layout)
    let raf = 0;
    const draw = () => {
      raf = 0;
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const fn = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      cancelAnimationFrame(raf);
    };
  }, []);
}

// Shared scroll-based active-section tracker used by Nav and NavDots.
// ids: ordered section IDs top→bottom. defaultId: active value before any section is passed.
// ids and defaultId are mount-time constants; the eslint-disable is intentional.
export function useActiveSection(ids, defaultId = "") {
  const [active, setActive] = useState(defaultId);
  useEffect(() => {
    const inBand = new Set();
    let atBottom = false;
    const update = () => {
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      let current = defaultId;
      for (const id of ids) if (inBand.has(id)) current = id;
      setActive(current);
    };
    // IntersectionObserver instead of scroll + layout reads: a thin band 35%
    // down the viewport; the last section crossing it is the active one.
    const band = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id),
        );
        update();
      },
      { rootMargin: "-35% 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) band.observe(el);
    });
    // Footer in view means the page bottom: the last section stays active
    const end = new IntersectionObserver(([e]) => {
      atBottom = e.isIntersecting;
      update();
    });
    const footer = document.querySelector("footer");
    if (footer) end.observe(footer);
    return () => {
      band.disconnect();
      end.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

export function useCardTilt() {
  const ref = useRef(null);
  const motionOn = useMotion();
  const onMove = (e) => {
    const el = ref.current;
    if (!el || !motionOn) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateZ(6px)`;
    el.style.boxShadow = "0 20px 60px var(--shadow), 0 0 80px var(--glow)";
    el.style.transition = "transform .08s ease, box-shadow .08s ease";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
    el.style.transition = "transform .5s var(--ease), box-shadow .5s ease";
  };
  return { ref, onMove, onLeave };
}
