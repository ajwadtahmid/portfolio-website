import { useRef } from "react";
import { GithubIcon } from "../icons";

const MAX_DELAY_CLASS = 4; // matches .d1–.d4 in App.css

export default function ProjectCard({ p, i, vis }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * 2 - 1;
    const y = (e.clientY - r.top) / r.height * 2 - 1;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateZ(6px)`;
    el.style.boxShadow = "0 20px 60px var(--shadow), 0 0 80px var(--glow)";
    el.style.transition = "transform .08s ease,box-shadow .08s ease";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
    el.style.transition = "transform .5s var(--ease),box-shadow .5s ease";
  };
  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`gb glass project-card fu d${Math.min(i + 1, MAX_DELAY_CLASS)}${vis ? " vis" : ""}`}>
      <div>
        <span className={`sb${vis ? " vis" : ""}`} style={{ fontSize: "0.73rem", marginBottom: 6 }}>
          {p.tag}
        </span>
        <h3 className="project-name">{p.name}</h3>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-tech">
        {p.tech.map((t) => (
          <span key={t} className="tech-chip">
            {t}
          </span>
        ))}
      </div>
      <a href={p.gh} target="_blank" rel="noopener noreferrer" className="project-gh">
        <GithubIcon /> View on GitHub
      </a>
    </article>
  );
}
