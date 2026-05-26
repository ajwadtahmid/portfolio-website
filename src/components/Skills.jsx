import { useInView } from "../hooks";
import { SKILLS } from "../data";
import SectionH2 from "./SectionH2";
import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript, SiFlutter, SiKotlin,
  SiReact, SiNodedotjs, SiFlask, SiExpress,
  SiDocker, SiKubernetes, SiLinux, SiMysql, SiApachetomcat, SiApachemaven,
  SiGit, SiGithubactions, SiAndroidstudio,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

const SKILL_ICONS = {
  "Python":          SiPython,
  "C++":             SiCplusplus,
  "Java":            FaJava,
  "JavaScript":      SiJavascript,
  "TypeScript":      SiTypescript,
  "Flutter / Dart":  SiFlutter,
  "Kotlin":          SiKotlin,
  "React":           SiReact,
  "React Native":    SiReact,
  "Node.js":         SiNodedotjs,
  "Flask":           SiFlask,
  "Express":         SiExpress,
  "AWS":             FaAws,
  "Docker":          SiDocker,
  "Kubernetes":      SiKubernetes,
  "Linux":           SiLinux,
  "MySQL":           SiMysql,
  "Apache Tomcat":   SiApachetomcat,
  "Maven":           SiApachemaven,
  "Git":             SiGit,
  "GitHub Actions":  SiGithubactions,
  "Android Studio":  SiAndroidstudio,
};

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
    </section>
  );
}
