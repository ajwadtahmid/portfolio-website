import { useRef } from "react";
import { useInView } from "../hooks";
import { EXPERIENCE } from "../data";
import SectionH2 from "./SectionH2";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

const TYPE_ICONS  = { education: FaGraduationCap, work: FaBriefcase, freelance: FaCode };
const TYPE_LABELS = { education: "Education", work: "Work", freelance: "Freelance" };

function ExpCard({ item, vis }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  * 2 - 1;
    const y = (e.clientY - r.top)  / r.height * 2 - 1;
    el.style.transform   = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateZ(6px)`;
    el.style.boxShadow   = "0 20px 60px var(--shadow), 0 0 80px var(--glow)";
    el.style.transition  = "transform .08s ease, box-shadow .08s ease";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = "";
    el.style.boxShadow  = "";
    el.style.transition = "transform .5s var(--ease), box-shadow .5s ease";
  };
  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass gb exp-card"
    >
      <div>
        <span className={`sb${vis ? " vis" : ""}`} style={{ fontSize: "0.73rem", marginBottom: 6 }}>
          {TYPE_LABELS[item.type]}
        </span>
        <p className="exp-org">{item.org}</p>
        <p className="exp-role">{item.role}</p>
      </div>
      {item.note && <p className="exp-note">{item.note}</p>}
      <div className="exp-chips">
        <span className="tech-chip">{item.period}</span>
        <span className="tech-chip">{item.location}</span>
      </div>
    </article>
  );
}

export default function Experience() {
  const [ref, vis] = useInView();
  return (
    <section id="experience" ref={ref} className="exp grain" aria-label="Experience">
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>Experience</span>
        <SectionH2 vis={vis}>Where I've been.</SectionH2>
        <div className="exp-timeline">
          {EXPERIENCE.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const Icon = TYPE_ICONS[item.type];
            return (
              <div
                key={i}
                className={`exp-item exp-item--${side} fu d${Math.min(i + 1, 4)}${vis ? " vis" : ""}`}
              >
                <div className="exp-node" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <ExpCard item={item} vis={vis} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
