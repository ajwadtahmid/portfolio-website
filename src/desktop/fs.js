// A small read-only file system for the terminal, built from the site's content.
// Paths are arrays of names below the home directory; names match case-insensitively.
import { PERSON, LINKS, PROJECTS, SKILLS, EXPERIENCE } from "./content.js";

export const HOME = "/home/visitor";

const file = (text) => ({ type: "file", text });
const dir = (children) => ({ type: "dir", children });
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function buildFs() {
  return dir({
    "about.md": file(
      [`# ${PERSON.name}`, `${PERSON.role} · ${PERSON.degree}, ${PERSON.schoolShort} (${PERSON.gradYear})`, `${PERSON.location}. ${PERSON.relocation}.`, "", ...PERSON.about].join("\n"),
    ),
    "contact.txt": file(`Email     ${LINKS.email}\nGitHub    ${LINKS.githubLabel}\nLinkedIn  ${LINKS.linkedinLabel}`),
    "resume.pdf": file("resume.pdf is a PDF, not text. Run 'resume' to open it."),
    projects: dir(
      Object.fromEntries(
        PROJECTS.map((p) => [
          p.id,
          dir({ "README.md": file([`# ${p.name}`, p.tag, "", p.desc, "", `Stack: ${p.tech.join(", ")}`, `Repo:  ${p.gh}`].join("\n")) }),
        ]),
      ),
    ),
    skills: dir(Object.fromEntries(SKILLS.map((g) => [`${slug(g.cat)}.txt`, file(g.items.join("\n"))]))),
    experience: dir(
      Object.fromEntries(
        EXPERIENCE.map((e) => [
          `${e.id}.md`,
          file(
            [`# ${e.role}`, `${e.org} · ${e.location}`, `${e.from} – ${e.to}`, e.gpa && `GPA ${e.gpa}`, e.description, e.highlights?.join(" · ")]
              .filter(Boolean)
              .join("\n"),
          ),
        ]),
      ),
    ),
  });
}

const childName = (node, name) => Object.keys(node.children).find((k) => k.toLowerCase() === name.toLowerCase());

// Resolve a typed path against the current directory. Returns { path, node } or null.
export function resolve(root, cwd, input = "") {
  let raw = input.trim();
  let path = [...cwd];
  if (raw === "" ) return { path, node: nodeAt(root, path) };
  if (raw.toLowerCase().startsWith(HOME)) raw = "~" + raw.slice(HOME.length);
  if (raw.startsWith("~") || raw.startsWith("/")) {
    path = [];
    raw = raw.slice(1);
  }
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      path.pop();
      continue;
    }
    const here = nodeAt(root, path);
    if (!here || here.type !== "dir") return null;
    const name = childName(here, part);
    if (!name) return null;
    path.push(name);
  }
  return { path, node: nodeAt(root, path) };
}

function nodeAt(root, path) {
  let node = root;
  for (const name of path) node = node?.children?.[name];
  return node ?? null;
}

export const pwd = (cwd) => [HOME, ...cwd].join("/");
export const promptPath = (cwd) => (cwd.length ? `~/${cwd.join("/")}` : "~");

// Directory listing: folders first (with a trailing slash), then files.
export function list(node) {
  const names = Object.keys(node.children);
  const dirs = names.filter((n) => node.children[n].type === "dir").map((n) => `${n}/`);
  const files = names.filter((n) => node.children[n].type === "file");
  return [...dirs, ...files];
}

// Tab completion for a partly typed path: every way the last segment could finish.
export function complete(root, cwd, partial, { dirsOnly = false } = {}) {
  const cut = partial.lastIndexOf("/") + 1;
  const base = partial.slice(0, cut);
  const stem = partial.slice(cut).toLowerCase();
  const found = resolve(root, cwd, base || ".");
  if (!found?.node || found.node.type !== "dir") return [];
  return Object.entries(found.node.children)
    .filter(([name, node]) => name.toLowerCase().startsWith(stem) && (!dirsOnly || node.type === "dir"))
    .map(([name, node]) => `${base}${name}${node.type === "dir" ? "/" : ""}`);
}

export const commonPrefix = (items) =>
  items.reduce((a, b) => {
    let i = 0;
    while (i < a.length && a[i].toLowerCase() === b[i]?.toLowerCase()) i++;
    return a.slice(0, i);
  });

export const MAN = {
  ls: "ls [path]\n  List a directory. Folders end with a slash.",
  cd: "cd [path]\n  Change directory. No path, or ~, goes home. '..' goes up one level.",
  cat: "cat <file>\n  Print a file, for example: cat projects/fabflix/README.md",
  pwd: "pwd\n  Print the current directory.",
  man: "man <command>\n  Show what a command does.",
  open: "open <app>\n  Open a desktop app in a window.",
  resume: "resume\n  Open the resume (PDF) in a new tab.",
  type: "type\n  Typing sprint: six shell lines against the clock. Escape quits.",
  snake: "snake\n  Open Snake. Arrow keys or WASD steer, Space pauses.",
  bughunt: "bughunt\n  Start Bug Hunt: squash the bugs before they reach the taskbar.\n  They hide behind windows, so move the windows out of the way.",
  tiling: "Window shortcuts (the window in front):\n  Alt+Shift+Left / Right   Snap to the left or right half\n  Alt+Shift+Up             Maximise\n  Alt+Shift+Down           Back to its normal size\n  Alt+Shift+T              Tile every open window\n  Dragging a window to the left or right edge snaps it too.",
};
