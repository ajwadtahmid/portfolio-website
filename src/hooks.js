import { useState, useEffect, useRef } from "react";

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
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  useEffect(() => {
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
    // words/ms/pause are static call-site values; re-running would restart the animation
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return txt;
}

export function useCountUp(end, dur = 1300, shouldStart = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // dur is a stable default; including it would restart the count on unrelated re-renders
  }, [shouldStart, end]); // eslint-disable-line react-hooks/exhaustive-deps
  return n;
}

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const fn = () => {
      if (bar)
        bar.style.width =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100 +
          "%";
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
}

// Shared scroll-based active-section tracker used by Nav and NavDots.
// ids: ordered section IDs top→bottom. defaultId: active value before any section is passed.
// ids and defaultId are mount-time constants; the eslint-disable is intentional.
export function useActiveSection(ids, defaultId = "") {
  const [active, setActive] = useState(defaultId);
  useEffect(() => {
    const fn = () => {
      const scrollY = window.scrollY;
      const atBottom = scrollY + window.innerHeight >= document.body.scrollHeight - 40;
      if (atBottom) { setActive(ids[ids.length - 1]); return; }
      const trigger = window.innerHeight * 0.35;
      let current = defaultId;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - trigger <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

export function useAmbientSound() {
  const ctxRef = useRef(null),
    gainRef = useRef(null);
  const [on, setOn] = useState(false);
  const toggle = () => {
    if (!ctxRef.current) {
      try {
        if (!window.AudioContext) return;
        const ctx = new AudioContext();
        ctxRef.current = ctx;
        const buf = ctx.createBuffer(1, 2 * ctx.sampleRate, ctx.sampleRate);
        const d = buf.getChannelData(0);
        let last = 0;
        // Brown-ish noise: leaky integrator over white noise, amplitude boosted, then lowpass filtered below
        for (let i = 0; i < d.length; i++) {
          const w = Math.random() * 2 - 1;
          d[i] = (last + 0.02 * w) / 1.02;
          last = d[i];
          d[i] *= 3.5;
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        const flt = ctx.createBiquadFilter();
        flt.type = "lowpass";
        flt.frequency.value = 700;
        const gn = ctx.createGain();
        gn.gain.value = 0;
        src.connect(flt);
        flt.connect(gn);
        gn.connect(ctx.destination);
        src.start();
        gainRef.current = gn;
        gn.gain.setTargetAtTime(0.022, ctx.currentTime, 0.5);
        setOn(true);
      } catch (e) {
        console.warn("Ambient audio unavailable:", e);
      }
    } else {
      const gn = gainRef.current,
        ctx = ctxRef.current;
      if (on) {
        gn.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
        setOn(false);
      } else {
        gn.gain.setTargetAtTime(0.022, ctx.currentTime, 0.3);
        setOn(true);
      }
    }
  };
  return [on, toggle];
}
