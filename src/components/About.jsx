import { useInView } from "../hooks";
import { STATS, ABOUT_PILLS } from "../data";
import { GraduationCapIcon, MapPinIcon } from "../icons";
import SectionH2 from "./SectionH2";
import StatCard from "./StatCard";
import WaveDivider from "./WaveDivider";

const PILL_ICONS = {
  graduation: GraduationCapIcon,
  location: MapPinIcon,
};

export default function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" ref={ref} className="about grain" aria-label="About">
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>About</span>
        <SectionH2 vis={vis}>
          Building apps people actually enjoy using.
        </SectionH2>
        <div className={`about-grid fu d1${vis ? " vis" : ""}`}>
          <div className="about-bio">
            <p>
              I'm a Computer Science graduate who believes technology should
              solve real problems, and solve them well. I'm experienced across
              full-stack web, mobile, and machine learning, and I take pride in
              the craft. Clean code, thoughtful design, and reliability aren't
              nice-to-haves; they're fundamental.
            </p>
            <p>
              Outside the terminal, you'll catch me gaming, exploring new
              technology, or enjoying nature on the trail.
            </p>
          </div>
          <div className="about-stats">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} go={vis} />
            ))}
          </div>
        </div>
        <div className="about-pills">
          {ABOUT_PILLS.map(({ icon, text }, i) => {
            const Icon = PILL_ICONS[icon];
            return (
              <span key={i} className={`tp fu d${i + 2}${vis ? " vis" : ""}`}>
                {Icon && <Icon />}
                <span>{text}</span>
              </span>
            );
          })}
        </div>
      </div>
      <WaveDivider nextBg="var(--bg1)" />
    </section>
  );
}
