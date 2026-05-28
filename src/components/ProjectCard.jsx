import { useCardTilt } from "../hooks";
import { GithubIcon } from "../icons";

const MAX_DELAY_CLASS = 4; // matches .d1–.d4 in App.css

export default function ProjectCard({ p, i, vis }) {
  const { ref, onMove, onLeave } = useCardTilt();
  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`gb glass project-card fu d${Math.min(i + 1, MAX_DELAY_CLASS)}${vis ? " vis" : ""}`}
    >
      <div>
        <span
          className={`sb${vis ? " vis" : ""}`}
          style={{ fontSize: "0.73rem", marginBottom: 6 }}
        >
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
      <a
        href={p.gh}
        target="_blank"
        rel="noopener noreferrer"
        className="project-gh"
      >
        <GithubIcon /> View on GitHub
      </a>
    </article>
  );
}
