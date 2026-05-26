import { useInView } from "../hooks";
import { SKILLS } from "../data";
import SectionH2 from "./SectionH2";

export default function Skills() {
  const [ref, vis] = useInView();
  return (
    <section id="skills" ref={ref} className="skills grain" aria-label="Skills">
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>Toolkit</span>
        <SectionH2 vis={vis}>What I work with.</SectionH2>
        <div className="skills-grid">
          {SKILLS.map((g, i) => (
            <div key={g.cat} className={`fu d${i + 1}${vis ? " vis" : ""}`}>
              <h3 className="skills-cat">{g.cat}</h3>
              <div className="skills-chips">
                {g.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
