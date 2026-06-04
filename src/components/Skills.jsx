import { useInView } from "../hooks";
import { SKILLS } from "../data";
import SectionH2 from "./SectionH2";
import WaveDivider from "./WaveDivider";
import {
  SiC,
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiDart,
  SiFlutter,
  SiKotlin,
  SiReact,
  SiNodedotjs,
  SiFlask,
  SiExpress,
  SiPytorch,
  SiHuggingface,
  SiSocketdotio,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiMysql,
  SiPostgresql,
  SiApachetomcat,
  SiApachemaven,
  SiGit,
  SiGithubactions,
  SiAndroidstudio,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

const SKILL_ICONS = {
  C: SiC,
  Python: SiPython,
  "C++": SiCplusplus,
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML: SiHtml5,
  CSS: SiCss,
  Dart: SiDart,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  React: SiReact,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  Flask: SiFlask,
  Express: SiExpress,
  PyTorch: SiPytorch,
  HuggingFace: SiHuggingface,
  "Socket.io": SiSocketdotio,
  AWS: FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Linux: SiLinux,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Apache Tomcat": SiApachetomcat,
  Maven: SiApachemaven,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  "Android Studio": SiAndroidstudio,
};

export default function Skills() {
  const [ref, vis] = useInView();
  return (
    <section id="skills" ref={ref} className="skills grain" aria-label="Skills section with technologies and tools organized by category">
      <div className="section-inner">
        <span className={`sb${vis ? " vis" : ""}`}>Toolkit</span>
        <SectionH2 vis={vis}>What I work with.</SectionH2>
        <div className="skills-grid">
          {SKILLS.map((g, i) => (
            <div key={g.cat} className={`fu d${i + 1}${vis ? " vis" : ""}`}>
              <h3 className="skills-cat">{g.cat}</h3>
              <div className="skills-chips">
                {g.items.map((item) => {
                  const Icon = SKILL_ICONS[item];
                  return (
                    <span key={item} className="chip">
                      {Icon && <Icon size={13} aria-hidden="true" />}
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveDivider nextBg="var(--bg3)" />
    </section>
  );
}
