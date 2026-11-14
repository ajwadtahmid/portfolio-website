export default function SectionH2({ children, vis, id }) {
  return (
    <div className="wipe-wrap">
      <h2 id={id} className={`wipe-inner${vis ? " vis" : ""}`}>
        {children}
      </h2>
    </div>
  );
}
