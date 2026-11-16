import { useInView } from "../hooks";
import { EXPERIENCE } from "../data";
import SectionH2 from "./SectionH2";
import WaveDivider from "./WaveDivider";

const TYPE_LABELS = {
  education: "Education",
  work: "Work",
  freelance: "Freelance",
};

export default function Experience() {
  const [ref, vis] = useInView();
  return (
    <section
      id="experience"
      ref={ref}
      className="exp grain"
      aria-labelledby="experience-title"
    >
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>Experience</span>
        <SectionH2 id="experience-title" vis={vis}>
          Where I've been.
        </SectionH2>
        <ol className="exp-list">
          {EXPERIENCE.map((item, i) => {
            const facts = [item.role, item.location];
            if (item.gpa) facts.push(`GPA ${item.gpa}`);
            const note = item.highlights?.join(" · ") ?? item.description;
            return (
              <li
                key={item.org}
                className={`exp-row fu d${Math.min(i + 1, 4)}${vis ? " vis" : ""}`}
              >
                <div className="exp-when">
                  <span className="exp-type">{TYPE_LABELS[item.type]}</span>
                  <span className="exp-period">{item.period}</span>
                </div>
                <div className="exp-what">
                  <h3 className="exp-org">{item.org}</h3>
                  <p className="exp-role">{facts.join(" · ")}</p>
                  {note && <p className="exp-note">{note}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <WaveDivider nextBg="var(--bg2)" />
    </section>
  );
}
