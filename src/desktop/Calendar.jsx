import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Calendar({ children, blocked }) {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(() => new Date());
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const root = useRef(null), trigger = useRef(null), panel = useRef(null);
  useEffect(() => { if (blocked) setOpen(false); }, [blocked]);
  useEffect(() => {
    if (!open) return;
    setToday(new Date()); panel.current?.focus();
    const dismiss = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", dismiss); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", key); };
  }, [open]);
  const offset = month.getDay(), days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return <div className="calendar-root" ref={root} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
    <button className="clock-button" ref={trigger} aria-label="Open calendar" aria-expanded={open} aria-controls={open ? "desktop-calendar" : undefined} onClick={() => setOpen((v) => !v)}>{children}</button>
    {open && <section className="calendar-popover" id="desktop-calendar" ref={panel} tabIndex={-1} aria-label="Calendar">
      <p className="calendar-today">{today.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
      <div className="calendar-nav"><button aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><LuChevronLeft aria-hidden="true" /></button><h2 aria-live="polite">{month.toLocaleDateString([], { month: "long", year: "numeric" })}</h2><button aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><LuChevronRight aria-hidden="true" /></button></div>
      <table className="calendar-grid" aria-label={month.toLocaleDateString([], { month: "long", year: "numeric" })}><thead><tr>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <th key={d} scope="col"><abbr title={d}>{d.slice(0, 2)}</abbr></th>)}</tr></thead><tbody>{Array.from({ length: Math.ceil((offset + days) / 7) }, (_, week) => <tr key={week}>{Array.from({ length: 7 }, (_, day) => { const n = week * 7 + day - offset + 1; const current = n === today.getDate() && month.getMonth() === today.getMonth() && month.getFullYear() === today.getFullYear(); return <td key={day} aria-current={current ? "date" : undefined}>{n > 0 && n <= days ? n : ""}</td>; })}</tr>)}</tbody></table>
      <button className="calendar-reset" onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}>Back to today</button>
    </section>}
  </div>;
}

