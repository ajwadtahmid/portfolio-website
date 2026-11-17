import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  LuArrowUpRight,
  LuArrowLeft,
  LuMonitor,
  LuBriefcase,
  LuBug,
  LuCheck,
  LuCopy,
  LuFileText,
  LuFolder,
  LuFolderOpen,
  LuGamepad2,
  LuHouse,
  LuKeyboard,
  LuGripVertical,
  LuLayoutGrid,
  LuMail,
  LuMaximize2,
  LuMinimize2,
  LuMinus,
  LuSearch,
  LuTerminal,
  LuUser,
  LuWrench,
  LuX,
} from "react-icons/lu";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PERSON, LINKS, PROJECTS, SKILLS, EXPERIENCE, STATS } from "./content.js";

const WINDOWS = [
  { id: "about", title: "About", Icon: LuUser },
  { id: "projects", title: "Projects", Icon: LuFolderOpen },
  { id: "skills", title: "Skills", Icon: LuWrench },
  { id: "experience", title: "Experience and education", short: "Experience", Icon: LuBriefcase },
  { id: "contact", title: "Contact", Icon: LuMail },
  { id: "terminal", title: "Terminal", Icon: LuTerminal },
  { id: "snake", title: "Snake", Icon: LuGamepad2, group: "Games" },
];

import Calendar from "./Calendar.jsx";
import Snake from "./Snake.jsx";
import BugHunt from "./BugHunt.jsx";
import Boot from "./Boot.jsx";
import { buildFs, resolve, list, complete, commonPrefix, pwd, promptPath, MAN } from "./fs.js";

const FS = buildFs();
import { pickLines, scoreLine, summarize, readBest, saveBest } from "./typing.js";

const ext = { target: "_blank", rel: "noopener noreferrer" };
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = (e) => setMatch(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return match;
}

/* ── A window: draggable by its title bar, movable with the arrow keys ───── */

function Win({ win, desktop, state, z, active, onFocus, onClose, onMin, onMove, onMax, onSnap, children }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(null); // "left" | "right" while dragging at an edge
  const { id, title, Icon } = win;

  const rects = () => ({ area: ref.current.parentElement.getBoundingClientRect(), r: ref.current.getBoundingClientRect() });
  const place = (x, y) => {
    const { area, r } = rects();
    onMove(id, { x: clamp(x, 120 - r.width, area.width - 120), y: clamp(y, 0, area.height - 44) });
  };

  const onPointerDown = (e) => {
    if (!desktop || state.max || e.button !== 0 || e.target.closest("button")) return;
    const { area, r } = rects();
    const dx = e.clientX - r.left;
    const dy = e.clientY - r.top;
    setDragging(true);
    // Dragging to the left or right edge snaps the window to that half.
    const edge = (ev) => (ev.clientX - area.left < 14 ? "left" : area.right - ev.clientX < 14 ? "right" : null);
    const move = (ev) => {
      place(ev.clientX - area.left - dx, ev.clientY - area.top - dy);
      setHint(edge(ev));
    };
    const up = (ev) => {
      setDragging(false);
      setHint(null);
      if (edge(ev)) onSnap(id, edge(ev));
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onMoveKey = (e) => {
    const step = e.shiftKey ? 96 : 24;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!d || state.max) return;
    e.preventDefault();
    const { area, r } = rects();
    place(r.left - area.left + d[0], r.top - area.top + d[1]);
  };

  return (
    <>
    {hint && <div className={`snap-hint snap-${hint}`} aria-hidden="true" />}
    <section
      ref={ref}
      hidden={state.min}
      id={`win-${id}`}
      className={`win win-${id}${active ? " is-active" : ""}${state.max ? " is-max" : ""}${dragging ? " is-dragging" : ""}`}
      style={desktop ? { zIndex: z, ...(!state.max && state.size ? state.size : {}), ...(state.pos && !state.max ? { left: state.pos.x, top: state.pos.y } : {}) } : undefined}
      aria-labelledby={`win-${id}-title`}
      tabIndex={-1}
      onPointerDownCapture={() => onFocus(id)}
      onFocusCapture={() => onFocus(id)}
    >
      <header className="win-bar" onPointerDown={onPointerDown} onDoubleClick={() => desktop && onMax(id)}>
        {desktop && (
          <button
            className="win-ctl win-move"
            aria-label={`Move the ${title} window with the arrow keys`}
            onKeyDown={onMoveKey}
          >
            <LuGripVertical aria-hidden="true" />
          </button>
        )}
        <Icon className="win-icon" aria-hidden="true" />
        <h2 id={`win-${id}-title`}>{title}</h2>
        {(
          <div className="win-ctls">
            <button className="win-ctl" aria-label={`Minimise ${title}`} onClick={() => onMin(id)}>
              <LuMinus aria-hidden="true" />
            </button>
            <button hidden={!desktop} className="win-ctl" aria-label={state.max ? `Restore ${title}` : `Maximise ${title}`} onClick={() => onMax(id)}>
              {state.max ? <LuMinimize2 aria-hidden="true" /> : <LuMaximize2 aria-hidden="true" />}
            </button>
            <button className="win-ctl win-close" aria-label={`Close ${title}`} onClick={() => onClose(id)}>
              <LuX aria-hidden="true" />
            </button>
          </div>
        )}
      </header>
      <div className="win-body">{children}</div>
    </section>
    </>
  );
}

const StatusBar = ({ children }) => <p className="app-status">{children}</p>;

/* ── Apps ─────────────────────────────────────────────────────────────────── */

function AboutApp({ copied, copyEmail }) {
  return (
    <div className="app">
      <div className="app-main about">
        <h1>{PERSON.name}</h1>
        <p className="about-role">{PERSON.role}</p>
        <p className="about-tagline">{PERSON.tagline}</p>
        <div className="cta">
          <a className="btn btn-primary" href={LINKS.resume} {...ext}>
            <LuFileText aria-hidden="true" /> Resume (PDF)
          </a>
          <button className="btn" onClick={copyEmail}>
            {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
            {copied ? "Email copied" : "Copy email"}
          </button>
          <a className="btn" href={LINKS.github} {...ext}>
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <a className="btn" href={LINKS.linkedin} {...ext}>
            <FaLinkedinIn aria-hidden="true" /> LinkedIn
          </a>
        </div>
        <dl className="facts">
          <div>
            <dt>Degree</dt>
            <dd>
              {PERSON.degree}, {PERSON.schoolShort} ({PERSON.gradYear})
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>
              {PERSON.location}. {PERSON.relocation}.
            </dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{PERSON.status}</dd>
          </div>
        </dl>
        {PERSON.about.map((p) => (
          <p key={p} className="about-p">
            {p}
          </p>
        ))}
      </div>
      <StatusBar>
        {STATS.map((s) => (
          <span key={s.label}>
            <b>{s.value}</b> {s.label}
          </span>
        ))}
      </StatusBar>
    </div>
  );
}

// A small file manager: filter by name, type or technology.
function ProjectsApp({ request }) {
  const [selected, setSelected] = useState(null);
  const heading = useRef(null);
  useEffect(() => { if (request) { setSelected(request.id); setQuery(""); } }, [request]);
  useEffect(() => { if (selected) heading.current?.focus(); }, [selected]);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = PROJECTS.filter((p) => !q || `${p.name} ${p.tag} ${p.tech.join(" ")}`.toLowerCase().includes(q));
  const project = PROJECTS.find((p) => p.id === selected);
  if (project) return <div className="app">
    <div className="app-bar"><button className="project-back" onClick={() => { setSelected(null); requestAnimationFrame(() => document.getElementById(`project-open-${project.id}`)?.focus()); }}><LuArrowLeft aria-hidden="true" /> Back to projects</button></div>
    <div className="app-main project-placeholder"><h3 ref={heading} tabIndex={-1}>{project.name}</h3>{/* Project detail content can be added here later. */}</div>
  </div>;
  return (
    <div className="app">
      <div className="app-bar">
        <p className="path">
          <LuFolder aria-hidden="true" /> ~/projects
        </p>
        <label className="filter">
          <LuSearch aria-hidden="true" />
          <span className="sr-only">Filter projects</span>
          <input
            type="search"
            placeholder="Filter by name or technology"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>
      <div className="app-main">
        <ul className="files">
          {shown.map((p) => (
            <li key={p.id} onClick={(e) => { if (!e.target.closest("a, button")) setSelected(p.id); }}>
              <div className="file-name">
                <h3><button className="project-open" id={`project-open-${p.id}`} onClick={() => setSelected(p.id)}>{p.name}</button></h3>
                <p>{p.tag}</p>
              </div>
              <div className="file-body">
                <p>{p.desc}</p>
                <ul className="chips" aria-label={`${p.name} tech stack`}>
                  {p.tech.map((t) => (
                    <li key={t}>
                      <button onClick={() => setQuery(t.split(" / ")[0])} aria-label={`Filter projects by ${t}`}>
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <a className="file-link" href={p.gh} {...ext}>
                Repository<span className="sr-only">: {p.name}</span> <LuArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        {!shown.length && (
          <p className="empty">
            Nothing in ~/projects matches “{query.trim()}”.{" "}
            <button className="text-btn" onClick={() => setQuery("")}>
              Clear the filter
            </button>
          </p>
        )}
      </div>
      <StatusBar>
        <span role="status">
          {q ? `${shown.length} of ${PROJECTS.length} items match “${query.trim()}”` : `${PROJECTS.length} items`}
        </span>
        {q && (
          <button className="text-btn" onClick={() => setQuery("")}>
            Clear filter
          </button>
        )}
        <a href={LINKS.github} {...ext}>
          All repos on GitHub <LuArrowUpRight aria-hidden="true" />
        </a>
      </StatusBar>
    </div>
  );
}

function SkillsApp() {
  const [cat, setCat] = useState("All");
  const groups = cat === "All" ? SKILLS : SKILLS.filter((g) => g.cat === cat);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="app">
      <div className="app-bar app-tabs" role="group" aria-label="Skill category">
        {["All", ...SKILLS.map((g) => g.cat)].map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="app-main">
        <dl className="skills">
          {groups.map((g) => (
            <div key={g.cat}>
              <dt>{g.cat}</dt>
              <dd>
                <ul className="chips">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <StatusBar>
        <span role="status">
          {total} skills{cat === "All" ? ` in ${SKILLS.length} categories` : ` in ${cat}`}
        </span>
      </StatusBar>
    </div>
  );
}

function ExperienceApp() {
  return (
    <div className="app">
      <div className="app-main">
        <ol className="exp">
          {EXPERIENCE.map((e) => (
            <li key={e.id}>
              <p className="exp-when">
                {e.from} – {e.to}
                <span>{e.kind}</span>
              </p>
              <h3>{e.role}</h3>
              <p className="exp-org">
                {e.org} · {e.location}
                {e.gpa && <> · GPA {e.gpa}</>}
              </p>
              {e.description && <p className="exp-note">{e.description}</p>}
              {e.highlights && <p className="exp-note">{e.highlights.join(" · ")}</p>}
            </li>
          ))}
        </ol>
      </div>
      <StatusBar>
        <span>{EXPERIENCE.length} entries, newest first</span>
      </StatusBar>
    </div>
  );
}

function ContactApp({ copied, copyEmail }) {
  return (
    <div className="app">
      <div className="app-main">
        <ul className="contact">
          <li>
            <a href={`mailto:${LINKS.email}`}>
              <LuMail aria-hidden="true" />
              <span>
                <b>Email</b>
                {LINKS.email}
              </span>
            </a>
            <button className="copy" onClick={copyEmail} aria-label="Copy email address">
              {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
            </button>
          </li>
          <li>
            <a href={LINKS.github} {...ext}>
              <FaGithub aria-hidden="true" />
              <span>
                <b>GitHub</b>
                {LINKS.githubLabel}
              </span>
            </a>
          </li>
          <li>
            <a href={LINKS.linkedin} {...ext}>
              <FaLinkedinIn aria-hidden="true" />
              <span>
                <b>LinkedIn</b>
                {LINKS.linkedinLabel}
              </span>
            </a>
          </li>
          <li>
            <a href={LINKS.resume} {...ext}>
              <LuFileText aria-hidden="true" />
              <span>
                <b>Resume</b>
                {PERSON.site}/resume
              </span>
            </a>
          </li>
        </ul>
      </div>
      <StatusBar>
        <span>{copied ? "Email copied" : `${PERSON.location}. ${PERSON.relocation}.`}</span>
      </StatusBar>
    </div>
  );
}

/* ── Terminal: every command from the live site, plus `open` and `resume` ─── */

const PROMPT = "visitor@ajwad:~$";
const APPS = ["about", "projects", "skills", "experience", "contact", "snake"];
// The live site's command list (src/components/Terminal.jsx), then the two additions.
const COMMANDS = [
  "help", "neofetch", "whoami", "skills", "projects", "contact", "date", "top", "ping", "rm", "hack", "clear",
  "exit", "quit", "sudo", "vim", "nano", "coffee", "git", "node", "python", "matrix", "hire me", "uci",
  "open", "resume", "type", "snake", "bughunt", "ls", "cd", "cat", "pwd", "man",
];

const edu = EXPERIENCE.find((e) => e.type === "education");
const freelance = EXPERIENCE.find((e) => e.type === "freelance");
const firstOf = (cat, n) => SKILLS.find((g) => g.cat === cat)?.items.slice(0, n).join(" · ") ?? "";

const neofetchInfo = () => [
  "visitor@ajwad",
  "-------------------------",
  "OS       Portfolio v1.0",
  `Host     ${PERSON.site}`,
  "Kernel   React 19 + Vite 8",
  "Shell    bash",
  "Uptime   Since 2023",
  "-------------------------",
  `Lang     ${firstOf("Languages", 5)}`,
  `Frame    ${firstOf("Frameworks", 4)}`,
  `Infra    ${firstOf("Infrastructure", 4)}`,
  "-------------------------",
  `Projects ${PROJECTS.length} shipped`,
  `Commits  ${STATS[0].value}`,
];
const NEOFETCH_ART = [
  "+---------------------+",
  "| o o o               |",
  "| $ whoami            |",
  "| > Ajwad Tahmid Ayon |",
  "| $ _                 |",
  "+---------------------+",
];

const OUTPUT = {
  help: () => `Available commands:
  whoami      About Ajwad
  neofetch    System info
  skills      Technical skills
  projects    Projects built
  contact     Get in touch
  clear       Clear terminal
  exit        Close terminal

On this desktop:
  open <app>  Open an app: ${APPS.join(", ")}
  resume      Open the resume (PDF)

Files:
  ls, cd, cat, pwd   Look around, e.g. cat projects/fabflix/README.md
  man <command>      What a command does; 'man tiling' lists window shortcuts

Games:
  type        Typing sprint, here in the terminal
  snake       Open Snake
  bughunt     Squash the bugs crawling over the desktop`,
  whoami: () => `${PERSON.name}
  ${edu.role} · ${PERSON.schoolShort} (${edu.to})
  ${freelance.role} · ${PERSON.status}
  ${PERSON.location} · ${PERSON.relocation}`,
  skills: () => SKILLS.map((g) => `${(g.cat + ":").padEnd(20)}${g.items.join(" · ")}`).join("\n"),
  projects: () =>
    PROJECTS.map((p, i) => `[${i}] ${p.name.padEnd(18)}${p.desc.length > 52 ? p.desc.slice(0, 52) + "…" : p.desc}`).join("\n"),
  contact: () => `Email     ${LINKS.email}
GitHub    ${LINKS.githubLabel}
LinkedIn  ${LINKS.linkedinLabel}`,
  date: () => new Date().toLocaleString(),
  top: () => `PID    COMMAND              CPU   MEM
42     react.exe            99%   1200M
1337   caffeine.service     0.5%  50M
9999   imposter_syndrome    99%   0M
8888   node server.js       45%   500M`,
  hack: () => `Initializing protocol...
████████████████████ 100%
Bypassing firewall...
████████████████████ 100%
Stealing source code...
████████████████████ 100%
Transferring data...
████████████████████ 100%
Mission accomplished. 🔓`,
  sudo: () => "sudo: you are not in the sudoers file. This incident will be reported.",
  vim: () => "You're in vim now. Good luck getting out. (hint: try :q!)",
  nano: () => "Opening nano... just kidding. Run 'open contact' instead.",
  coffee: () => "Error: coffee not found. Please refill and try again.",
  git: () => "fatal: not a git repository (or any of the parent directories): .git",
  node: () => "Welcome to Node.js. Type .exit to quit. (hint: you can't)",
  python: () => 'Python 3.12.0 — Type "help", "copyright", or "license" for more information.',
  matrix: () => "Wake up, visitor. The portfolio goes deeper than you think.",
  "hire me": () => "Great choice. Run 'contact' for details.",
  uci: () => "University of California, Irvine · B.S. Computer Science · Class of 2025 · Go Anteaters!",
  "rm -rf /": () => "rm: cannot remove '/': Permission denied",
};

// Web addresses and email addresses in terminal output are real links.
function Linkified({ text }) {
  const parts = text.split(/((?:https?:\/\/|github\.com\/|linkedin\.com\/)\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((part, i) => {
    if (/^(https?:\/\/|github\.com\/|linkedin\.com\/)/.test(part)) {
      const href = part.startsWith("http") ? part : `https://${part.startsWith("linkedin") ? "www." : ""}${part}`;
      return <a key={i} href={href} {...ext}>{part.replace(/^https?:\/\/(www\.)?/, "")}</a>;
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    return part;
  });
}

// A sprint line with each character marked right, wrong or still to type.
function SprintLine({ target, typed, done = false }) {
  const length = Math.max(target.length, typed.length);
  return Array.from({ length }, (_, i) => {
    const want = target[i];
    const got = typed[i];
    const state = got === undefined ? (done ? "miss" : "todo") : got === want ? "ok" : "bad";
    return (
      <span key={i} className={`sprint-${state}`}>
        {want ?? got}
      </span>
    );
  });
}

function Terminal({ desktop, reduced, onOpen, onExit, onHunt, sprintRequest }) {
  const [lines, setLines] = useState([{ type: "out", text: "Welcome to Ajwad's terminal. Type 'help' for commands." }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const introTimers = useRef([]);
  const [cwd, setCwd] = useState([]);
  const prompt = `visitor@ajwad:${promptPath(cwd)}$`;
  // Typing sprint: null, or { lines, index, results, startedAt }
  const [sprint, setSprint] = useState(null);
  const print = (...out) => setLines((l) => [...l, ...out]);

  const startSprint = useCallback(() => {
    introTimers.current.forEach(clearTimeout);
    setInput("");
    setSprint({ lines: pickLines(), index: 0, results: [], startedAt: null });
    const best = readBest();
    print({
      type: "out",
      text: `Typing sprint: type each line exactly, then press Enter. The clock starts on your first key.\nEscape quits.${best ? ` Best so far: ${best} wpm.` : ""}`,
    });
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const submitSprintLine = (typed) => {
    const target = sprint.lines[sprint.index];
    const results = [...sprint.results, scoreLine(target, typed)];
    const out = [{ type: "sprint", text: typed, target }];
    if (results.length < sprint.lines.length) {
      setSprint({ ...sprint, index: sprint.index + 1, results });
    } else {
      const { wpm, accuracy, seconds } = summarize(results, Date.now() - (sprint.startedAt ?? Date.now()));
      const best = readBest();
      // Only a reasonably accurate run can set the record.
      const record = accuracy >= 90 && wpm > best;
      if (record) saveBest(wpm);
      out.push({
        type: "out",
        text: `Done in ${seconds}s: ${wpm} wpm, ${accuracy}% accuracy.${record ? " New best!" : best ? ` Best: ${best} wpm.` : ""}${accuracy < 90 ? " (90% accuracy or better sets a record.)" : ""}\nRun 'type' to go again.`,
      });
      setSprint(null);
    }
    print(...out);
  };

  const quitSprint = () => {
    setSprint(null);
    setInput("");
    print({ type: "out", text: "Sprint cancelled." });
  };

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      setHistory((h) => [raw, ...h]);
      setHi(-1);
      if (cmd === "clear") return setLines([]);
      if (cmd === "exit" || cmd === "quit") return onExit();
      let text;
      if (cmd === "neofetch") {
        const info = neofetchInfo();
        // The boxed logo needs room; narrow screens get the plain list.
        text = desktop
          ? info.map((l, i) => `${(NEOFETCH_ART[i] ?? "").padEnd(26)}${l}`).join("\n")
          : info.join("\n");
      } else if (cmd === "type" || cmd === "sprint") {
        setLines((l) => [...l, { type: "in", text: raw, prompt }]);
        return startSprint();
      } else if (cmd === "pwd") {
        text = pwd(cwd);
      } else if (cmd === "ls" || cmd.startsWith("ls ")) {
        const arg = raw.trim().split(/\s+/).slice(1).find((a) => !a.startsWith("-")) ?? "";
        const found = resolve(FS, cwd, arg);
        if (!found?.node) text = `ls: ${arg}: No such file or directory`;
        else text = found.node.type === "file" ? found.path[found.path.length - 1] : list(found.node).join("    ");
      } else if (cmd === "cd" || cmd.startsWith("cd ")) {
        const arg = raw.trim().split(/\s+/)[1] ?? "~";
        const found = resolve(FS, cwd, arg);
        if (!found?.node) text = `cd: ${arg}: No such file or directory`;
        else if (found.node.type !== "dir") text = `cd: ${arg}: Not a directory`;
        else {
          setCwd(found.path);
          text = "";
        }
      } else if (cmd === "cat" || cmd.startsWith("cat ")) {
        const arg = raw.trim().split(/\s+/)[1];
        const found = arg && resolve(FS, cwd, arg);
        if (!arg) text = "usage: cat <file>";
        else if (!found?.node) text = `cat: ${arg}: No such file or directory`;
        else text = found.node.type === "dir" ? `cat: ${arg}: Is a directory` : found.node.text;
      } else if (cmd === "man" || cmd.startsWith("man ")) {
        const topic = cmd.split(/\s+/)[1];
        text = !topic ? "What manual page do you want? Try: man ls" : (MAN[topic] ?? `No manual entry for ${topic}`);
      } else if (cmd === "bughunt") {
        onHunt();
        text = "Bug Hunt started. They hide behind windows.";
      } else if (cmd === "snake") {
        onOpen("snake");
        text = "Opened snake.";
      } else if (cmd === "resume") {
        window.open(LINKS.resume, "_blank", "noopener");
        text = `Opening ${PERSON.site}${LINKS.resume}`;
      } else if (cmd === "open" || cmd.startsWith("open ")) {
        const app = cmd.split(/\s+/)[1];
        if (APPS.includes(app)) {
          onOpen(app);
          text = `Opened ${app}.`;
        } else {
          text = `usage: open <${APPS.join("|")}>`;
        }
      } else if (cmd === "ping" || cmd.startsWith("ping ")) {
        const target = cmd.split(/\s+/)[1] || "localhost";
        text =
          target === "ajwad" || target === PERSON.site
            ? `PING ajwad.com (127.0.0.1): 64 bytes\n--- ajwad.com statistics ---\nrtt min/avg/max = 1/1/2 ms\nmood = building`
            : `PING ${target}: Host unreachable`;
      } else {
        text = OUTPUT[cmd]?.() ?? `command not found: ${cmd.split(" ")[0]}. Type 'help' for available commands.`;
      }
      setLines((l) => [...l, { type: "in", text: raw, prompt }, ...(text ? [{ type: "out", text }] : [])]);
    },
    [desktop, onExit, onOpen, onHunt, startSprint, cwd, prompt],
  );

  // First open: type `whoami` and run it (printed at once when motion is reduced).
  useEffect(() => {
    const timers = (introTimers.current = []);
    const word = "whoami";
    if (desktop) inputRef.current?.focus({ preventScroll: true });
    if (sprintRequest) return;
    if (reduced) {
      timers.push(setTimeout(() => run(word), 0));
    } else {
      [...word].forEach((_, i) => timers.push(setTimeout(() => setInput(word.slice(0, i + 1)), 500 + i * 95)));
      timers.push(
        setTimeout(() => {
          setInput("");
          run(word);
        }, 500 + word.length * 95 + 260),
      );
    }
    return () => timers.forEach(clearTimeout);
    // Runs once per mount: the intro must not replay when props change.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // The desktop's Typing sprint icon (or Start menu entry) asks for a run.
  useEffect(() => {
    if (sprintRequest) startSprint();
  }, [sprintRequest, startSprint]);

  useEffect(() => {
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines, sprint]);

  const onKeyDown = (e) => {
    if (sprint) {
      if (e.key === "Enter") {
        submitSprintLine(input);
        setInput("");
      } else if (e.key === "Escape") {
        e.preventDefault();
        quitSprint();
      } else if (e.key === "Tab" || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); // no completion or history while the clock runs
      }
      return;
    }
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "Tab" && input.trim()) {
      e.preventDefault();
      // Paths complete after cd, ls and cat; command names complete everywhere else.
      const pathArg = input.match(/^\s*(cd|ls|cat)\s+(\S*)$/i);
      if (pathArg) {
        const options = complete(FS, cwd, pathArg[2], { dirsOnly: pathArg[1].toLowerCase() === "cd" });
        if (options.length) setInput(`${pathArg[1]} ${options.length === 1 ? options[0] : commonPrefix(options)}`);
        if (options.length > 1) {
          const names = options.map((o) => o.slice(o.lastIndexOf("/", o.length - 2) + 1));
          setLines((l) => [...l, { type: "in", text: input, prompt }, { type: "out", text: names.join("    ") }]);
        }
        return;
      }
      const partial = input.toLowerCase().trimStart();
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) setLines((l) => [...l, { type: "in", text: input, prompt }, { type: "out", text: matches.join("    ") }]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hi + 1, history.length - 1);
      setHi(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(hi - 1, -1);
      setHi(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <div className="term" ref={logRef} onClick={() => !window.getSelection()?.toString() && inputRef.current?.focus()}>
      <div role="log" aria-label="Terminal output">
        {lines.map((line, i) => (
          <div key={i} className={`term-line term-${line.type}`}>
            {line.type === "in" && <span className="term-prompt">{line.prompt ?? PROMPT} </span>}
            {line.type === "sprint" ? <SprintLine target={line.target} typed={line.text} done /> : <Linkified text={line.text} />}
          </div>
        ))}
      </div>
      {sprint && (
        <p className="term-line term-target" aria-live="polite">
          <span className="sr-only">
            Line {sprint.index + 1} of {sprint.lines.length}: {sprint.lines[sprint.index]}
          </span>
          <span aria-hidden="true">
            <SprintLine target={sprint.lines[sprint.index]} typed={input} />
          </span>
        </p>
      )}
      <div className="term-line term-entry">
        <label className="term-prompt" htmlFor="term-input">
          {sprint ? `sprint ${sprint.index + 1}/${sprint.lines.length} >` : prompt}
        </label>
        <input
          id="term-input"
          ref={inputRef}
          aria-label={sprint ? "Type the line shown above" : "Terminal command"}
          value={input}
          onChange={(e) => {
            if (sprint && !sprint.startedAt && e.target.value) setSprint({ ...sprint, startedAt: Date.now() });
            setInput(e.target.value);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

/* ── Start menu ───────────────────────────────────────────────────────────── */

function StartMenu({ onOpen, onProject, onSprint, onHunt, copyEmail, onClose }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    inputRef.current?.focus();
    return () => {
      // Hand focus back only if the menu's action did not move it somewhere else.
      requestAnimationFrame(() => {
        if (!document.activeElement || document.activeElement === document.body) opener?.focus?.();
      });
    };
  }, []);

  const items = useMemo(
    () => [
      ...WINDOWS.map((w) => ({ id: w.id, group: w.group ?? "Apps", label: w.short ?? w.title, Icon: w.Icon, run: () => onOpen(w.id) })),
      { id: "typing", group: "Games", label: "Typing sprint", keywords: "terminal type speed wpm", Icon: LuKeyboard, run: onSprint },
      { id: "bughunt", group: "Games", label: "Bug Hunt", keywords: "bugs squash game", Icon: LuBug, run: onHunt },
      ...PROJECTS.map((p) => ({ id: `project-${p.id}`, group: "Projects", label: p.name, keywords: `${p.tag} ${p.tech.join(" ")}`, Icon: LuFolderOpen, run: () => onProject(p.id) })),
      { id: "resume", group: "Links", label: "Resume (PDF)", Icon: LuFileText, href: LINKS.resume },
      { id: "github", group: "Links", label: "GitHub", Icon: FaGithub, href: LINKS.github },
      { id: "linkedin", group: "Links", label: "LinkedIn", Icon: FaLinkedinIn, href: LINKS.linkedin },
      { id: "email", group: "Links", label: "Copy email address", Icon: LuCopy, run: copyEmail },
      { id: "site", group: "Links", label: "Standard site", keywords: "exit main home leave", Icon: LuHouse, run: () => window.location.assign(LINKS.site) },
    ],
    [onOpen, onProject, onSprint, onHunt, copyEmail],
  );
  const q = query.trim().toLowerCase();
  const shown = items.filter((it) => (!q ? it.group !== "Projects" : it.label.toLowerCase().includes(q) || it.id.includes(q) || it.keywords?.toLowerCase().includes(q)));
  const active = Math.min(index, Math.max(shown.length - 1, 0));

  const run = (item) => {
    onClose();
    if (item.href) window.open(item.href, "_blank", "noopener");
    else item.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (shown.length) setIndex((active + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (shown[active]) run(shown[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      <div className="start-scrim" onMouseDown={onClose} />
      <div className="start" role="dialog" aria-label="Start menu">
        <div className="start-id">
          <p className="start-name">{PERSON.name}</p>
          <p>
            {PERSON.role} · {PERSON.status}
          </p>
        </div>
        <div className="start-search">
          <LuSearch aria-hidden="true" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="start-list"
            aria-activedescendant={shown[active] ? `start-${shown[active].id}` : undefined}
            aria-label="Search apps, projects and links"
            placeholder="Search apps, projects and links"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <ul id="start-list" ref={listRef} role="listbox" aria-label="Apps, projects and links">
          {shown.map((item, i) => (
            <li
              key={item.id}
              id={`start-${item.id}`}
              role="option"
              aria-selected={i === active}
              data-heading={i === 0 || shown[i - 1].group !== item.group ? item.group : undefined}
              onMouseMove={() => setIndex(i)}
              onClick={() => run(item)}
            >
              <item.Icon aria-hidden="true" />
              {item.label}
              {item.href && <LuArrowUpRight className="start-ext" aria-hidden="true" />}
            </li>
          ))}
          {!shown.length && (
            <li className="start-empty" role="option" aria-selected="false" aria-disabled="true">
              Nothing called “{query.trim()}” here.
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

/* ── Clock ────────────────────────────────────────────────────────────────── */

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  const day = now.toLocaleDateString([], { weekday: "short" });
  const [h, m] = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).split(":");
  return (
    <time className="clock" dateTime={now.toISOString()}>
      {day} {h}
      <span className="clock-colon" aria-hidden="true">:</span>
      <span className="sr-only">:</span>
      {m}
    </time>
  );
}

/* ── Desktop ──────────────────────────────────────────────────────────────── */

// Where the desktop icons end, so tiled windows never cover them.
const iconsRight = (area) => {
  const icons = area.querySelector(".icons");
  return icons ? Math.ceil(icons.getBoundingClientRect().right - area.getBoundingClientRect().left) + 12 : 12;
};
// CSS resizing writes inline sizes on a window; keep those in step with ours.
const sizeWin = (id, size) => {
  const el = document.getElementById(`win-${id}`);
  if (!el) return;
  el.style.width = size ? `${size.width}px` : "";
  el.style.height = size ? `${size.height}px` : "";
};

const initialWins = () =>
  Object.fromEntries(WINDOWS.map((w) => [w.id, { open: false, min: false, pos: null, max: false }]));

export default function App() {
  const desktop = useMedia("(min-width: 1000px) and (min-height: 620px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [wins, setWins] = useState(initialWins);
  const [order, setOrder] = useState(() => WINDOWS.map((w) => w.id).filter((id) => id !== "about").concat("about"));
  const [start, setStart] = useState(false);
  const [projectRequest, setProjectRequest] = useState(null);
  const [sprintRequest, setSprintRequest] = useState(0);
  const [hunt, setHunt] = useState(false);
  // The boot log shows once per browser session, and never with reduced motion.
  const [booting, setBooting] = useState(() => {
    try {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem("desktop.booted");
    } catch {
      return false;
    }
  });
  const endBoot = useCallback(() => {
    try {
      sessionStorage.setItem("desktop.booted", "1");
    } catch {
      // storage blocked: the log simply shows again next time
    }
    setBooting(false);
  }, []);
  const desktopSnapshot = useRef(null);
  const [copied, setCopied] = useState(false);
  const pendingFocus = useRef(null);

  const patch = useCallback((id, change) => setWins((w) => ({ ...w, [id]: { ...w[id], ...change } })), []);
  const focusWin = useCallback((id) => setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((x) => x !== id), id])), []);
  const openWin = useCallback(
    (id) => {
      patch(id, { open: true, min: false });
      focusWin(id);
      pendingFocus.current = id;
    },
    [patch, focusWin],
  );
  const closeWin = useCallback((id) => patch(id, { open: false, min: false, max: false }), [patch]);
  const minWin = useCallback((id) => patch(id, { min: true }), [patch]);
  const moveWin = useCallback((id, pos) => patch(id, { pos }), [patch]);
  const closeTerminal = useCallback(() => closeWin("terminal"), [closeWin]);

  const visible = (id) => wins[id].open;
  const active = [...order].reverse().find((id) => wins[id].open && !wins[id].min);

  // Move keyboard focus into a window that was just opened or restored.
  useLayoutEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    const el = document.getElementById(`win-${id}`);
    if (!el) return;
    if (id === "terminal" && (desktop || sprintRequest)) {
      el.querySelector("input")?.focus({ preventScroll: true });
      return;
    }
    // Snake takes the keys straight away.
    (id === "snake" ? (el.querySelector(".snake-board") ?? el) : el).focus({ preventScroll: true });
    if (!desktop) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });

  // Taskbar and desktop icons: open, bring forward, or (if already in front) minimise.
  const launch = useCallback(
    (id, { toggle = false } = {}) => {
      if (toggle && wins[id].open && !wins[id].min && active === id) minWin(id);
      else openWin(id);
    },
    [wins, active, minWin, openWin],
  );

  const openProject = useCallback((id) => {
    setProjectRequest({ id, at: Date.now() });
    openWin("projects");
  }, [openWin]);
  const openSprint = useCallback(() => {
    setSprintRequest(Date.now());
    openWin("terminal");
  }, [openWin]);
  // Bug Hunt needs something to hide behind: open two apps if the desktop is bare.
  const startHunt = useCallback(() => {
    if (desktop && !Object.values(wins).some((w) => w.open && !w.min)) {
      openWin("projects");
      openWin("about");
    }
    setHunt(true);
  }, [desktop, wins, openWin]);
  const showDesktop = () => {
    const shown = Object.keys(wins).filter((id) => wins[id].open && !wins[id].min);
    if (shown.length) {
      desktopSnapshot.current = shown;
      setWins((w) => Object.fromEntries(Object.entries(w).map(([id, state]) => [id, shown.includes(id) ? { ...state, min: true } : state])));
    } else {
      const restore = desktopSnapshot.current || [];
      setWins((w) => Object.fromEntries(Object.entries(w).map(([id, state]) => [id, state.open && restore.includes(id) ? { ...state, min: false } : state])));
      desktopSnapshot.current = null;
    }
  };

  const tidy = useCallback(() => {
    const area = document.getElementById("workspace");
    const ids = WINDOWS.map((w) => w.id).filter((id) => wins[id].open && !wins[id].min);
    if (!desktop || !area || !ids.length) return;

    // Tile only the windows currently on screen; leave closed/minimized apps alone.
    const gap = 12;
    const left = iconsRight(area); // Keep the desktop shortcuts accessible.
    const columns = Math.ceil(Math.sqrt(ids.length));
    const rows = Math.ceil(ids.length / columns);
    const width = Math.floor((area.clientWidth - left - gap * columns) / columns);
    const height = Math.floor((area.clientHeight - gap * (rows + 1)) / rows);
    const layout = Object.fromEntries(ids.map((id, i) => [id, {
      pos: { x: left + (i % columns) * (width + gap), y: gap + Math.floor(i / columns) * (height + gap) },
      size: { width, height },
      max: false,
    }]));
    // Native CSS resizing writes inline dimensions; explicitly reset those as well.
    ids.forEach((id) => {
      const el = document.getElementById(`win-${id}`);
      if (el) { el.style.width = `${width}px`; el.style.height = `${height}px`; }
    });
    setWins((w) => Object.fromEntries(Object.entries(w).map(([id, state]) => [id, layout[id] ? { ...state, ...layout[id] } : state])));
  }, [desktop, wins]);

  // Snap a window to the left or right half of the space beside the icons.
  const snapWin = useCallback(
    (id, side) => {
      const area = document.getElementById("workspace");
      if (!desktop || !area) return;
      const gap = 12;
      const left = iconsRight(area);
      const width = Math.floor((area.clientWidth - left - gap * 2) / 2);
      const layout = {
        pos: { x: side === "left" ? left : left + width + gap, y: gap },
        size: { width, height: area.clientHeight - gap * 2 },
        max: false,
      };
      sizeWin(id, layout.size);
      patch(id, layout);
    },
    [desktop, patch],
  );
  const restoreWin = useCallback(
    (id) => {
      sizeWin(id, null);
      patch(id, { pos: null, size: undefined, max: false });
    },
    [patch],
  );

  // Alt+Shift+arrows tile the window in front; Alt+Shift+T tiles them all.
  useEffect(() => {
    const onKey = (e) => {
      if (!desktop || !e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
      const act =
        e.code === "KeyT"
          ? tidy
          : !active
            ? null
            : { ArrowLeft: () => snapWin(active, "left"), ArrowRight: () => snapWin(active, "right"), ArrowUp: () => patch(active, { max: true }), ArrowDown: () => restoreWin(active) }[e.key];
      if (!act) return;
      e.preventDefault();
      e.stopPropagation();
      act();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [desktop, active, tidy, snapWin, restoreWin, patch]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  }, []);

  // Ctrl+Space opens the Start menu from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        setStart((s) => !s);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const winProps = (id) => ({
    win: WINDOWS.find((w) => w.id === id),
    desktop,
    state: wins[id],
    z: order.indexOf(id) + 1,
    active: active === id,
    onFocus: focusWin,
    onClose: closeWin,
    onMin: minWin,
    onMove: moveWin,
    onSnap: snapWin,
    onMax: (wid) => patch(wid, { max: !wins[wid].max }),
  });

  return (
    <div className="os" data-mode={desktop ? "desktop" : "stack"}>
      <a className="skip-link" href="#workspace">
        Skip to content
      </a>

      <header className="topbar"><p><strong>{PERSON.name}</strong><span>{PERSON.role}</span></p><div className="topbar-links"><a className="tray-resume tray-site" href={LINKS.site}><LuHouse aria-hidden="true" /> Standard site</a><a className="tray-resume" href={LINKS.resume} {...ext}><LuFileText aria-hidden="true" /> Resume</a></div></header>
      <header className="taskbar">
        <div className="start-wrap">
          <button
            className="start-btn"
            aria-haspopup="dialog"
            aria-expanded={start}
            aria-keyshortcuts="Control+Space"
            onClick={() => setStart((s) => !s)}
          >
            <span className="start-mark" aria-hidden="true">
              ATA
            </span>
            Start
          </button>
          {start && (
            <StartMenu
              onOpen={launch}
              onProject={openProject}
              onSprint={openSprint}
              onHunt={startHunt}
              copyEmail={copyEmail}
              onClose={() => setStart(false)}
            />
          )}
        </div>
        <button className="taskbar-search" aria-label="Search apps and projects" title="Search apps and projects" onClick={() => setStart(true)}><LuSearch aria-hidden="true" /></button>
        <nav className="tasks" aria-label="Apps">
          {WINDOWS.filter(({ id }) => wins[id].open).map(({ id, title, short, Icon }) => (
            <button
              key={id}
              className="task"
              aria-label={title}
              aria-pressed={wins[id].open && !wins[id].min}
              data-running={(desktop && wins[id].open) || undefined}
              data-active={active === id || undefined}
              onClick={() => launch(id, { toggle: true })}
            >
              <Icon aria-hidden="true" />
              <span>{short ?? title}</span>
            </button>
          ))}
        </nav>
        <div className="tray">
          {desktop && <button className="taskbar-search" aria-label="Tile all windows" title="Tile all windows (Alt+Shift+T)" aria-keyshortcuts="Alt+Shift+T" onClick={tidy}><LuLayoutGrid aria-hidden="true" /></button>}
          <Calendar blocked={start}><Clock /></Calendar>
          <button className="show-desktop" aria-label={active ? "Show desktop" : "Restore windows"} title={active ? "Show desktop" : "Restore windows"} onClick={showDesktop}><LuMonitor aria-hidden="true" /></button>
        </div>
      </header>

      <main className="desktop" id="workspace" tabIndex={-1}>
        {(
          <ul className="icons" aria-label="Desktop icons">
            {WINDOWS.map(({ id, title, short, Icon }) => (
              <li key={id}>
                <button
                  className="icon"
                  onClick={() => launch(id)}
                  title={`Open ${title}`}
                >
                  <span className={`icon-tile icon-tile-${id}`}>
                    <Icon aria-hidden="true" />
                  </span>
                  {short ?? title}
                </button>
              </li>
            ))}
            <li>
              <button className="icon" onClick={openSprint} title="Start a typing sprint in the terminal">
                <span className="icon-tile icon-tile-typing">
                  <LuKeyboard aria-hidden="true" />
                </span>
                Typing sprint
              </button>
            </li>
            <li>
              <button className="icon" onClick={startHunt} title="Start Bug Hunt on the desktop">
                <span className="icon-tile icon-tile-bughunt">
                  <LuBug aria-hidden="true" />
                </span>
                Bug Hunt
              </button>
            </li>
            <li>
              <a className="icon" href={LINKS.resume} {...ext}>
                <span className="icon-tile icon-tile-doc">
                  <LuFileText aria-hidden="true" />
                </span>
                Resume.pdf
              </a>
            </li>
          </ul>
        )}

        {hunt && <BugHunt desktop={desktop} reduced={reduced} onStop={() => setHunt(false)} />}

        {visible("about") && (
          <Win {...winProps("about")}>
            <AboutApp copied={copied} copyEmail={copyEmail} />
          </Win>
        )}
        {visible("projects") && (
          <Win {...winProps("projects")}>
            <ProjectsApp request={projectRequest} />
          </Win>
        )}
        {visible("skills") && (
          <Win {...winProps("skills")}>
            <SkillsApp />
          </Win>
        )}
        {visible("experience") && (
          <Win {...winProps("experience")}>
            <ExperienceApp />
          </Win>
        )}
        {visible("contact") && (
          <Win {...winProps("contact")}>
            <ContactApp copied={copied} copyEmail={copyEmail} />
          </Win>
        )}
        {visible("terminal") && (
          <Win {...winProps("terminal")}>
            <Terminal desktop={desktop} reduced={reduced} onOpen={openWin} onExit={closeTerminal} onHunt={startHunt} sprintRequest={sprintRequest} />
          </Win>
        )}
        {visible("snake") && (
          <Win {...winProps("snake")}>
            <Snake active={active === "snake" && !wins.snake.min} />
          </Win>
        )}
      </main>

      {booting && <Boot onDone={endBoot} />}

      <p className="sr-only" role="status">
        {copied ? "Email address copied to the clipboard." : ""}
      </p>
    </div>
  );
}
