import { useCallback, useEffect, useRef, useState } from "react";
import { LuBug, LuRotateCcw, LuX } from "react-icons/lu";

// Bug Hunt: bugs crawl down the desktop towards the taskbar. They sit below the
// windows, so on a desktop they hide behind anything open; move windows aside
// and click (or Tab to a bug and press Enter) to squash them.
const BEST_KEY = "desktop.bughunt.best";
const LIVES = 3;
const SIZE = 44;

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

export default function BugHunt({ desktop, reduced, onStop }) {
  const layerRef = useRef(null);
  const hudRef = useRef(null);
  const bugs = useRef(new Map()); // id -> { x, y, speed, drift, phase, el }
  const nextId = useRef(1);
  const [ids, setIds] = useState([]);
  const [splats, setSplats] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, setBest] = useState(readBest);
  const over = lives <= 0;

  const place = (bug) => {
    if (bug.el) bug.el.style.transform = `translate(${bug.x}px, ${bug.y}px) rotate(${bug.tilt}deg)`;
  };

  const spawn = useCallback(
    (elapsed) => {
      const layer = layerRef.current;
      if (!layer) return;
      const width = layer.clientWidth;
      let x = Math.random() * (width - SIZE);
      if (desktop && Math.random() < 0.65) {
        // Prefer to come in above an open window, so there is something to hide behind.
        const area = layer.getBoundingClientRect();
        const wins = [...layer.parentElement.querySelectorAll(".win:not([hidden])")];
        if (wins.length) {
          const r = wins[Math.floor(Math.random() * wins.length)].getBoundingClientRect();
          x = Math.min(width - SIZE, Math.max(0, r.left - area.left + Math.random() * Math.max(r.width - SIZE, 1)));
        }
      }
      const id = nextId.current++;
      bugs.current.set(id, {
        x,
        y: -SIZE,
        speed: Math.min(150, 52 + elapsed * 0.9) * (0.85 + Math.random() * 0.3), // px per second
        drift: 18 + Math.random() * 26,
        phase: Math.random() * Math.PI * 2,
        tilt: 0,
        el: null,
      });
      setIds((list) => [...list, id]);
    },
    [desktop],
  );

  // The game clock.
  useEffect(() => {
    if (over) return;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let untilSpawn = 600;
    const frame = (now) => {
      const dt = Math.min(50, now - last);
      last = now;
      elapsed += dt / 1000;
      untilSpawn -= dt;
      if (untilSpawn <= 0) {
        spawn(elapsed);
        untilSpawn = Math.max(480, 1500 - elapsed * 22);
      }
      const layer = layerRef.current;
      const floor = layer.clientHeight - SIZE;
      const maxX = layer.clientWidth - SIZE;
      const escaped = [];
      bugs.current.forEach((bug, id) => {
        bug.y += (bug.speed * dt) / 1000;
        const sway = Math.cos(bug.phase + bug.y / 34) * bug.drift;
        bug.x = Math.min(maxX, Math.max(0, bug.x + (sway * dt) / 1000));
        bug.tilt = -sway * 0.9;
        if (bug.y >= floor) escaped.push(id);
        else place(bug);
      });
      if (escaped.length) {
        escaped.forEach((id) => bugs.current.delete(id));
        setIds((list) => list.filter((id) => !escaped.includes(id)));
        setLives((n) => Math.max(0, n - escaped.length));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [over, spawn]);

  useEffect(() => {
    if (!over) return;
    bugs.current.clear();
    setIds([]);
    if (score > best) {
      setBest(score);
      try {
        localStorage.setItem(BEST_KEY, String(score));
      } catch {
        // storage blocked: the best score lasts for this visit only
      }
    }
    hudRef.current?.querySelector("button")?.focus();
  }, [over]); // eslint-disable-line react-hooks/exhaustive-deps

  const squash = (id) => {
    const bug = bugs.current.get(id);
    if (!bug) return;
    const hadFocus = document.activeElement === bug.el;
    bugs.current.delete(id);
    setIds((list) => list.filter((x) => x !== id));
    setScore((n) => n + 1);
    if (!reduced) {
      setSplats((list) => [...list, { id, x: bug.x, y: bug.y }]);
      setTimeout(() => setSplats((list) => list.filter((s) => s.id !== id)), 420);
    }
    // Keyboard players keep their place: move on to the next bug.
    if (hadFocus) requestAnimationFrame(() => (layerRef.current?.querySelector(".bug") ?? hudRef.current?.querySelector("button"))?.focus());
  };

  const restart = () => {
    bugs.current.clear();
    setIds([]);
    setScore(0);
    setLives(LIVES);
  };

  return (
    <>
      <div className="hunt-layer" ref={layerRef}>
        {ids.map((id) => (
          <button
            key={id}
            className="bug"
            aria-label="Squash bug"
            ref={(el) => {
              const bug = bugs.current.get(id);
              if (bug && el) {
                bug.el = el;
                place(bug);
              }
            }}
            onPointerDown={() => squash(id)}
            onClick={() => squash(id)}
          >
            <LuBug aria-hidden="true" />
          </button>
        ))}
        {splats.map((s) => (
          <span key={s.id} className="splat" style={{ left: s.x, top: s.y }} aria-hidden="true" />
        ))}
      </div>
      <div className="hunt-hud" ref={hudRef} role="group" aria-label="Bug Hunt">
        <LuBug aria-hidden="true" />
        {over ? (
          <>
            <p role="status">
              <b>Game over.</b> {score} squashed{score > 0 && score >= best ? ", a new best" : best ? ` · best ${best}` : ""}
            </p>
            <button className="hunt-btn" onClick={restart}>
              <LuRotateCcw aria-hidden="true" /> Play again
            </button>
          </>
        ) : (
          <p>
            <b>{score}</b> squashed · <b>{lives}</b> {lives === 1 ? "life" : "lives"}
            <span className="hunt-hint">{desktop ? " · they hide behind windows" : " · tap them"}</span>
          </p>
        )}
        <button className="hunt-btn hunt-stop" onClick={onStop} aria-label="Stop Bug Hunt" title="Stop Bug Hunt">
          <LuX aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
