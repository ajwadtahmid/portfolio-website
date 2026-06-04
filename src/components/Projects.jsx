import { useInView } from "../hooks";
import { PROJECTS } from "../data";
import SectionH2 from "./SectionH2";
import ProjectCard from "./ProjectCard";
import WaveDivider from "./WaveDivider";

export default function Projects() {
  const [ref, vis] = useInView();
  return (
    <section
      id="projects"
      ref={ref}
      className="projects grain"
      aria-label="Projects section featuring shipped applications with descriptions and links"
    >
      <div className="section-inner-lg">
        <span className={`sb${vis ? " vis" : ""}`}>Work</span>
        <SectionH2 vis={vis}>Things I've built.</SectionH2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} vis={vis} />
          ))}
        </div>
        <div className={`projects-more fu d4${vis ? " vis" : ""}`}>
          <a
            href="https://github.com/ajwadtahmid"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-more-link"
          >
            Browse all repos on GitHub →
          </a>
        </div>
      </div>
      <WaveDivider nextBg="var(--bg2)" />
    </section>
  );
}
