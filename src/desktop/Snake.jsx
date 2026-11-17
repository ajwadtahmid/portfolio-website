import { useCallback, useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronLeft, LuChevronRight, LuChevronUp, LuPause, LuPlay, LuRotateCcw } from "react-icons/lu";

// A grid crawler: steer with the arrow keys, WASD, a swipe or the on-screen pad.
// The rules run on a fixed step; drawing runs every frame and slides the snake
// between cells, so movement is smooth and a turn shows on the very next cell.
const COLS = 24;
const ROWS = 16;
const BEST_KEY = "desktop.snake.best";
const DIRS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
};
// Milliseconds per cell: quicker for every four points.
const stepMs = (score) => Math.max(58, 105 - Math.floor(score / 4) * 5);

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const freshGame = () => {
  const body = [[8, 8], [7, 8], [6, 8]];
  return { body, prev: body, grew: false, dir: [1, 0], queue: [], food: [16, 8], score: 0, t: 1 };
};

function placeFood(body) {
  const taken = new Set(body.map(([x, y]) => `${x},${y}`));
  const free = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!taken.has(`${x},${y}`)) free.push([x, y]);
  return free.length ? free[Math.floor(Math.random() * free.length)] : null;
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export default function Snake({ active }) {
  const canvasRef = useRef(null);
  const boardRef = useRef(null);
  const game = useRef(freshGame());
  const colors = useRef(null);
  const [phase, setPhase] = useState("ready"); // ready | playing | paused | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.width) return;
    if (!colors.current) {
      const css = getComputedStyle(canvas);
      colors.current = {
        board: css.getPropertyValue("--term").trim(),
        food: css.getPropertyValue("--tangerine").trim(),
        body: css.getPropertyValue("--panel-ink-2").trim(),
      };
    }
    const ctx = canvas.getContext("2d");
    const cell = canvas.width / COLS;
    const mid = ([x, y]) => [(x + 0.5) * cell, (y + 0.5) * cell];
    const { body, prev, grew, food, t } = game.current;

    ctx.fillStyle = colors.current.board;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255 255 255 / 0.05)";
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if ((x + y) % 2) ctx.fillRect(x * cell, y * cell, cell, cell);

    if (food) {
      const [fx, fy] = mid(food);
      ctx.fillStyle = colors.current.food;
      ctx.beginPath();
      ctx.arc(fx, fy, cell * 0.34, 0, Math.PI * 2);
      ctx.fill();
    }

    // The body is one thick rounded line: the head slides out of the cell it
    // left, the tail slides out of the cell it is vacating, the middle stays put.
    const last = body.length - 1;
    const head = lerp(mid(prev[0]), mid(body[0]), t);
    const points = [head, ...body.slice(1).map(mid)];
    if (!grew) points.push(lerp(mid(prev[last]), mid(body[last]), t));
    ctx.strokeStyle = colors.current.body;
    ctx.lineWidth = cell * 0.76;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(head[0], head[1], cell * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  // One rule step. Returns false when the snake has crashed.
  const step = useCallback(() => {
    const g = game.current;
    if (g.queue.length) g.dir = g.queue.shift();
    const head = [g.body[0][0] + g.dir[0], g.body[0][1] + g.dir[1]];
    const grows = g.food && head[0] === g.food[0] && head[1] === g.food[1];
    // The tail cell is free to move into unless the snake is about to grow.
    const solid = grows ? g.body : g.body.slice(0, -1);
    if (head[0] < 0 || head[0] >= COLS || head[1] < 0 || head[1] >= ROWS || solid.some(([x, y]) => x === head[0] && y === head[1])) {
      return false;
    }
    g.prev = g.body;
    g.body = [head, ...solid];
    g.grew = Boolean(grows);
    if (grows) {
      g.food = placeFood(g.body);
      g.score += 1;
      setScore(g.score);
      if (!g.food) return false; // board full
    }
    return true;
  }, []);

  // Keep the canvas as sharp as the screen, whatever size the window is.
  useEffect(() => {
    const board = boardRef.current;
    const fit = () => {
      const canvas = canvasRef.current;
      const width = Math.round(board.clientWidth * (window.devicePixelRatio || 1));
      if (!width || canvas.width === width) return;
      canvas.width = width;
      canvas.height = Math.round((width * ROWS) / COLS);
      draw();
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(board);
    return () => observer.disconnect();
  }, [draw]);

  // The frame loop: rules at a fixed step, drawing every frame.
  useEffect(() => {
    if (phase !== "playing") return;
    const g = game.current;
    let raf = 0;
    let last = performance.now();
    let acc = g.t * stepMs(g.score);
    const frame = (now) => {
      acc += Math.min(100, now - last);
      last = now;
      let alive = true;
      while (alive && acc >= stepMs(g.score)) {
        acc -= stepMs(g.score);
        alive = step();
      }
      g.t = alive ? acc / stepMs(g.score) : 1;
      draw();
      if (alive) raf = requestAnimationFrame(frame);
      else setPhase("over");
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, step, draw]);

  const start = useCallback(() => {
    game.current = freshGame();
    setScore(0);
    setPhase("playing");
    draw();
    boardRef.current?.focus({ preventScroll: true });
  }, [draw]);

  const toggle = useCallback(() => {
    setPhase((p) => (p === "playing" ? "paused" : p === "paused" ? "playing" : p));
    boardRef.current?.focus({ preventScroll: true });
  }, []);

  const turn = useCallback((dir) => {
    const g = game.current;
    const last = g.queue[g.queue.length - 1] ?? g.dir;
    // No reversing onto yourself, and at most two turns waiting.
    if (g.queue.length < 2 && (dir[0] !== -last[0] || dir[1] !== -last[1]) && (dir[0] !== last[0] || dir[1] !== last[1])) g.queue.push(dir);
    setPhase((p) => (p === "ready" ? "playing" : p));
  }, []);

  // Pause when another window comes to the front or this one is minimised.
  useEffect(() => {
    if (!active) setPhase((p) => (p === "playing" ? "paused" : p));
  }, [active]);

  useEffect(() => {
    if (phase !== "over" || score <= best) return;
    setBest(score);
    try {
      localStorage.setItem(BEST_KEY, String(score));
    } catch {
      // storage blocked: the best score lasts for this visit only
    }
  }, [phase, score, best]);

  // Keys work anywhere inside the window, not only on the board.
  const onKeyDown = (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const dir = DIRS[e.key] ?? DIRS[e.key.toLowerCase()];
    if (dir) {
      e.preventDefault();
      if (phase === "ready" || phase === "playing") turn(dir);
    } else if (e.key === " " || e.key.toLowerCase() === "p") {
      if (e.target.closest("button")) return; // Space on a button presses that button
      e.preventDefault();
      if (phase === "ready" || phase === "over") start();
      else toggle();
    } else if (e.key === "Enter" && (phase === "ready" || phase === "over")) {
      if (e.target.closest("button")) return;
      e.preventDefault();
      start();
    }
  };

  // Swipe to steer: the turn registers as soon as the finger has moved far enough.
  const swipe = useRef(null);
  const onPointerDown = (e) => {
    swipe.current = [e.clientX, e.clientY];
  };
  const onPointerMove = (e) => {
    if (!swipe.current) return;
    const dx = e.clientX - swipe.current[0];
    const dy = e.clientY - swipe.current[1];
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    swipe.current = [e.clientX, e.clientY];
    if (phase === "ready" || phase === "playing") turn(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)]);
  };
  const endSwipe = () => {
    swipe.current = null;
  };

  const message = {
    ready: "Press Start, or steer, to begin",
    paused: "Paused",
    over: score > 0 && score >= best ? `Game over. New best: ${score}` : `Game over. Score: ${score}`,
  }[phase];

  return (
    <div className="app snake" onKeyDown={onKeyDown}>
      <div className="app-bar snake-bar">
        {phase === "ready" || phase === "over" ? (
          <button className="snake-btn" onClick={start}>
            {phase === "over" ? <LuRotateCcw aria-hidden="true" /> : <LuPlay aria-hidden="true" />}
            {phase === "over" ? "Play again" : "Start"}
          </button>
        ) : (
          <button className="snake-btn" onClick={toggle}>
            {phase === "paused" ? <LuPlay aria-hidden="true" /> : <LuPause aria-hidden="true" />}
            {phase === "paused" ? "Resume" : "Pause"}
          </button>
        )}
        <p className="snake-hint">Arrow keys or WASD to steer · Space to pause</p>
      </div>
      <div className="app-main snake-main">
        <div
          ref={boardRef}
          className="snake-board"
          tabIndex={0}
          role="application"
          aria-label="Snake board. Steer with the arrow keys or W A S D. Space pauses. Enter starts."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endSwipe}
          onPointerCancel={endSwipe}
        >
          <canvas ref={canvasRef} aria-hidden="true" />
          {message && <p className="snake-message">{message}</p>}
        </div>
        <div className="snake-pad" role="group" aria-label="Steer">
          <button className="pad-up" aria-label="Up" onPointerDown={() => turn([0, -1])} onClick={(e) => e.detail === 0 && turn([0, -1])}><LuChevronUp aria-hidden="true" /></button>
          <button className="pad-left" aria-label="Left" onPointerDown={() => turn([-1, 0])} onClick={(e) => e.detail === 0 && turn([-1, 0])}><LuChevronLeft aria-hidden="true" /></button>
          <button className="pad-right" aria-label="Right" onPointerDown={() => turn([1, 0])} onClick={(e) => e.detail === 0 && turn([1, 0])}><LuChevronRight aria-hidden="true" /></button>
          <button className="pad-down" aria-label="Down" onPointerDown={() => turn([0, 1])} onClick={(e) => e.detail === 0 && turn([0, 1])}><LuChevronDown aria-hidden="true" /></button>
        </div>
      </div>
      <p className="app-status">
        <span>
          Score <b>{score}</b>
        </span>
        <span>
          Best <b>{Math.max(best, score)}</b>
        </span>
        <span className="sr-only" role="status">
          {phase === "over" ? message : phase === "paused" ? "Paused" : ""}
        </span>
      </p>
    </div>
  );
}
