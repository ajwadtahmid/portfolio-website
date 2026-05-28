import { useState, useEffect, useRef, useCallback } from "react";
import { SKILLS, PROJECTS, CONTACT_EMAIL, STATS, EXPERIENCE } from "../data";

const PROMPT = "visitor@ajwad:~$";


const ALL_COMMANDS = [
  "help",
  "neofetch",
  "whoami",
  "skills",
  "projects",
  "contact",
  "date",
  "top",
  "ping",
  "rm",
  "hack",
  "clear",
  "exit",
  "quit",
  "sudo",
  "vim",
  "nano",
  "coffee",
  "git",
  "node",
  "python",
  "matrix",
  "hire me",
  "uci",
];

// ── Dynamic builders ──────────────────────────────────────────────────────────

function buildNeofetch() {
  const langs =
    SKILLS.find((g) => g.cat === "Languages")
      ?.items.slice(0, 5)
      .join(" · ") ?? "";
  const frames =
    SKILLS.find((g) => g.cat === "Frameworks")
      ?.items.slice(0, 4)
      .join(" · ") ?? "";
  const infra =
    SKILLS.find((g) => g.cat === "Infrastructure")
      ?.items.slice(0, 4)
      .join(" · ") ?? "";
  const commitStat = STATS.find((s) =>
    s.label.toLowerCase().includes("commit"),
  );
  const commits = commitStat ? `${commitStat.end}${commitStat.suf}` : "1000+";
  return `\
╭─────────────────────╮   visitor@ajwad
│ ● ● ●               │   ─────────────────────────
│ $ whoami            │   OS       Portfolio v1.0
│ > Ajwad Tahmid Ayon │   Host     ajwadtahmid.com
│ $  _                │   Kernel   React 19 + Vite 8
╰─────────────────────╯   Shell    bash
                          Uptime   Since 2023
                          ─────────────────────────
                          Lang     ${langs}
                          Frame    ${frames}
                          Infra    ${infra}
                          ─────────────────────────
                          Projects ${PROJECTS.length} shipped
                          Commits  ${commits}`;
}

function buildWhoami() {
  const edu = EXPERIENCE.find((e) => e.type === "education");
  const freelance = EXPERIENCE.find((e) => e.type === "freelance");
  return `Ajwad Tahmid Ayon
  ${edu ? `${edu.role} · ${edu.org.replace("University of California, Irvine", "UC Irvine")} (${edu.period.split("–")[1]?.trim()})` : ""}
  ${freelance?.role ?? "Developer"} · Open to opportunities
  Southern California · Open to relocation`;
}

function buildSkills() {
  return SKILLS.map((g) => `${(g.cat + ":").padEnd(20)}${g.items.join(" · ")}`).join("\n");
}

function buildProjects() {
  return PROJECTS.map((p, i) => {
    const name = p.name.padEnd(18);
    const desc = p.desc.length > 52 ? p.desc.slice(0, 52) + "…" : p.desc;
    return `[${i}] ${name}${desc}`;
  }).join("\n");
}

function buildContact() {
  return [
    `Email     ${CONTACT_EMAIL}`,
    `GitHub    github.com/ajwadtahmid`,
    `LinkedIn  linkedin.com/in/ajwad-tahmid-ayon`,
  ].join("\n");
}

function buildDate() {
  return new Date().toLocaleString();
}

function buildTop() {
  return `PID    COMMAND              CPU   MEM
42     react.exe            99%   1200M
1337   caffeine.service     0.5%  50M
9999   imposter_syndrome    99%   0M
8888   node server.js       45%   500M`;
}

function buildHack() {
  return `Initializing protocol...
████████████████████ 100%
Bypassing firewall...
████████████████████ 100%
Stealing source code...
████████████████████ 100%
Transferring data...
████████████████████ 100%
Mission accomplished. 🔓`;
}

// ── Static outputs (easter eggs, system commands) ─────────────────────────────

const STATIC_OUTPUTS = {
  help: `Available commands:
  whoami      About Ajwad
  neofetch    System info
  skills      Technical skills
  projects    Projects built
  contact     Get in touch
  clear       Clear terminal
  exit        Close terminal`,
  sudo: `sudo: you are not in the sudoers file. This incident will be reported.`,
  vim: `You're in vim now. Good luck getting out. (hint: try :q!)`,
  nano: `Opening nano... just kidding. Use the contact form instead.`,
  coffee: `Error: coffee not found. Please refill and try again.`,
  git: `fatal: not a git repository (or any of the parent directories): .git`,
  node: `Welcome to Node.js. Type .exit to quit. (hint: you can't)`,
  python: `Python 3.12.0 — Type "help", "copyright", or "license" for more information.`,
  matrix: `Wake up, visitor. The portfolio goes deeper than you think.`,
  "hire me": `Great choice. Run 'contact' for details.`,
  uci: `University of California, Irvine · B.S. Computer Science · Class of 2025 · Go Anteaters!`,
  "rm -rf /": `rm: cannot remove '/': Permission denied`,
};

// ── Icons ─────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
    <line
      x1="1"
      y1="1"
      x2="5"
      y2="5"
      stroke="rgba(0,0,0,0.55)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="1"
      x2="1"
      y2="5"
      stroke="rgba(0,0,0,0.55)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MaximizeIcon = ({ maximized }) => (
  <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
    {maximized ? (
      <path
        d="M2,1 L6,1 L6,5 M1,2 L5,2 L5,6 L1,6 Z"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ) : (
      <path
        d="M4,1 L6,1 L6,3 M1,4 L1,6 L3,6 M5.5,1.5 L1.5,5.5"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )}
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function Terminal({ onClose }) {
  const [history, setHistory] = useState([
    {
      type: "output",
      text: "Welcome to Ajwad's terminal. Type 'help' for commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      setCmdHistory((h) => [raw, ...h]);
      setHistIdx(-1);

      if (cmd === "clear") {
        setHistory([]);
        return;
      }
      if (cmd === "exit" || cmd === "quit") {
        onClose();
        return;
      }

      // Handle commands with arguments
      if (cmd === "rm -rf /") {
        const response = STATIC_OUTPUTS["rm -rf /"];
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: response },
        ]);
        return;
      }

      if (cmd === "ping" || cmd.startsWith("ping ")) {
        const target = cmd.split(" ")[1] || "localhost";
        const response =
          target === "ajwad" || target === "ajwadtahmid.com"
            ? `PING ajwad.com (127.0.0.1): 64 bytes\n--- ajwad.com statistics ---\nrtt min/avg/max = 1/1/2 ms\nmood = building`
            : `PING ${target}: Host unreachable`;
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: response },
        ]);
        return;
      }

      // Dynamic outputs
      const dynamic = {
        neofetch: buildNeofetch(),
        whoami: buildWhoami(),
        skills: buildSkills(),
        projects: buildProjects(),
        contact: buildContact(),
        date: buildDate(),
        top: buildTop(),
        hack: buildHack(),
      };

      const response =
        dynamic[cmd] ??
        STATIC_OUTPUTS[cmd] ??
        `command not found: ${cmd.split(" ")[0]}. Type 'help' for available commands.`;

      setHistory((h) => [
        ...h,
        { type: "input", text: raw },
        { type: "output", text: response },
      ]);
    },
    [onClose],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase().trimStart();
      if (!partial) return;
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory((h) => [
          ...h,
          { type: "input", text: input },
          { type: "output", text: matches.join("    ") },
        ]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  };

  return (
    <div className="term-overlay" onClick={onClose}>
      <div
        className={`term-window${maximized ? " term-window--max" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="term-titlebar">
          <div className="term-traffic">
            <button
              className="term-btn term-btn--red"
              onClick={onClose}
              aria-label="Close"
            >
              {" "}
              <CloseIcon />
            </button>
            <button
              className="term-btn term-btn--yellow"
              onClick={() => setMinimized((m) => !m)}
              aria-label={minimized ? "Restore" : "Minimize"}
            >
              {" "}
            </button>
            <button
              className="term-btn term-btn--green"
              onClick={() => setMaximized((m) => !m)}
              aria-label="Maximise"
            >
              {" "}
              <MaximizeIcon maximized={maximized} />
            </button>
          </div>
          <span className="term-title">visitor@ajwad — bash</span>
          <span className="term-hint">esc to close</span>
        </div>

        {!minimized && (
          <div className="term-body" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={`tl tl--${line.type}`}>
                {line.type === "input" && (
                  <span className="term-prompt">{PROMPT}&nbsp;</span>
                )}
                <span className="term-text">{line.text}</span>
              </div>
            ))}
            <div className="tl tl--input">
              <span className="term-prompt">{PROMPT}&nbsp;</span>
              <input
                ref={inputRef}
                className="term-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
}
