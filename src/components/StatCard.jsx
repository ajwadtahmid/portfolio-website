import { useCountUp } from "../hooks";

export default function StatCard({ end, suf, label, go }) {
  const n = useCountUp(end, 1300, go);
  return (
    <div className="sc">
      <div className="stat-num">
        {n}
        {suf}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
