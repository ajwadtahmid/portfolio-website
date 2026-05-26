import { useInView } from "../hooks";
import { STATS, ABOUT_PILLS } from "../data";
import SectionH2 from "./SectionH2";
import StatCard from "./StatCard";

export default function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" ref={ref} className="about grain" aria-label="About">
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>About</span>
        <SectionH2 vis={vis}>Building apps people actually enjoy using.</SectionH2>
        <div className={`about-grid fu d1${vis ? " vis" : ""}`}>
          <div className="about-bio">
            <p>
              I'm a Computer Science graduate with an unhealthy obsession with open source and emerging tech. I love solving complex problems and building products that don't make people want to throw their phone.
            </p>
            <p>Outside the terminal, you'll catch me gaming, exploring new technology, or enjoying nature on the trail.</p>
          </div>
          <div className="about-stats">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} go={vis} />
            ))}
          </div>
        </div>
        <div className="about-pills">
          {ABOUT_PILLS.map(({ Icon, text }, i) => (
            <span key={i} className={`tp fu d${i + 2}${vis ? " vis" : ""}`}>
              <Icon />
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
