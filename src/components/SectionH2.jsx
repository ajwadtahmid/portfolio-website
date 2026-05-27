export default function SectionH2({ children, vis }) {
  return (
    <div className="wipe-wrap">
      <h2 className={`wipe-inner${vis ? " vis" : ""}`}>{children}</h2>
    </div>
  );
}
