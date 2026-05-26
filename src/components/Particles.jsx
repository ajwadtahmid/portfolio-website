import { useEffect, useRef } from "react";

// Canvas API cannot resolve CSS variables; these mirror --ac (#2997ff) in dark mode
const acLine = (a) => `rgba(41,151,255,${a})`;
const AC_DOT = "rgba(41,151,255,.15)";

const PARTICLE_COUNT = 55;
const CONNECT_DIST   = 140; // px — max distance to draw a connecting line
const REPULSE_DIST   = 200; // px — mouse repulsion radius
const MAX_VELOCITY   = 0.32;

export default function Particles() {
  const ref = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, width, height;
    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();
    const pts = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * MAX_VELOCITY,
      vy: (Math.random() - 0.5) * MAX_VELOCITY,
      r: Math.random() * 1.4 + 0.4,
    }));
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      pts.forEach((p, i) => {
        // Mouse repulsion
        const mdx = mouseRef.current.x - p.x;
        const mdy = mouseRef.current.y - p.y;
        const distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);
        if (distToMouse < REPULSE_DIST) {
          const force = (REPULSE_DIST - distToMouse) / REPULSE_DIST * 0.08;
          p.vx -= (mdx / distToMouse) * force;
          p.vy -= (mdy / distToMouse) * force;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Draw connections to already-processed particles (each pair drawn exactly once)
        for (let j = 0; j < i; j++) {
          const cdx = p.x - pts[j].x;
          const cdy = p.y - pts[j].y;
          const d = Math.sqrt(cdx * cdx + cdy * cdy);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = acLine((1 - d / CONNECT_DIST) * 0.09);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = AC_DOT;
        ctx.fill();

        // Move + wrap
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
