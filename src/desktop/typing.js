// Typing sprint: a short run of everyday shell and git lines, typed against the clock.

const POOL = [
  "git status",
  "git log --oneline",
  "git checkout -b feature",
  "git push origin main",
  "git rebase -i main",
  "git stash pop",
  "git diff --staged",
  "ls -la",
  "cd ~/projects",
  "mkdir -p src/components",
  "cat package.json",
  "grep -rn todo src",
  "tail -f app.log",
  "chmod +x deploy.sh",
  "ps aux | grep node",
  "curl -I localhost:8080",
  "ssh deploy@server",
  "npm run build",
  "npm test -- --watch",
  "python -m venv .venv",
  "docker ps -a",
  "docker compose up -d",
  "kubectl get pods",
  "find . -name *.log",
];

export const SPRINT_LENGTH = 6;
const BEST_KEY = "desktop.sprint.best";

export function pickLines(n = SPRINT_LENGTH) {
  const pool = [...POOL];
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

// One typed line against its target: characters right, and characters counted.
export function scoreLine(target, typed) {
  let correct = 0;
  for (let i = 0; i < target.length; i++) if (typed[i] === target[i]) correct++;
  return { correct, total: Math.max(target.length, typed.length) };
}

export function summarize(results, ms) {
  const correct = results.reduce((n, r) => n + r.correct, 0);
  const total = results.reduce((n, r) => n + r.total, 0);
  const minutes = Math.max(ms, 1) / 60000;
  return {
    // The usual convention: five characters count as one word.
    wpm: Math.round(correct / 5 / minutes),
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    seconds: (ms / 1000).toFixed(1),
  };
}

export function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function saveBest(wpm) {
  try {
    localStorage.setItem(BEST_KEY, String(wpm));
  } catch {
    // storage blocked: the score just is not kept
  }
}
