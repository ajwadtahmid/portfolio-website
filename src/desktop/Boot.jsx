import { useEffect } from "react";
import { PROJECTS, SKILLS } from "./content.js";

// A short boot log, shown once per browser session. Any key or click skips it.
// It is never mounted when the visitor prefers reduced motion (see App.jsx).
const LINE_MS = 130;
const skills = SKILLS.reduce((n, g) => n + g.items.length, 0);
const LINES = [
  "ajwad-os 1.0 (portfolio build)",
  "[  OK  ] Mounted /home/visitor",
  "[  OK  ] Started window manager",
  `[  OK  ] Loaded ${PROJECTS.length} projects`,
  `[  OK  ] Loaded ${skills} skills in ${SKILLS.length} categories`,
  "[  OK  ] Started terminal service",
  "[  OK  ] Started games: snake, typing sprint, bug hunt",
  "[  OK  ] Reached target: desktop",
  "Welcome, visitor.",
];

export default function Boot({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, LINES.length * LINE_MS + 550);
    const skip = (e) => {
      e.preventDefault();
      onDone();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  return (
    <div className="boot" aria-hidden="true">
      <pre>
        {LINES.map((line, i) => (
          <span key={i} style={{ animationDelay: `${i * LINE_MS}ms` }}>
            {line.startsWith("[") ? (
              <>
                [<b>  OK  </b>]{line.slice(8)}
              </>
            ) : (
              line
            )}
            {"\n"}
          </span>
        ))}
      </pre>
      <p>Press any key to skip</p>
    </div>
  );
}
