/* Paths use two symmetric cubic beziers to mimic a sine wave —
   start y == end y so the duplicate tiles seamlessly during animation. */
const BACK  = "M0,52 C180,72 540,72 720,52 C900,32 1260,32 1440,52 L1440,80 L0,80 Z";
const FRONT = "M0,46 C180,22 540,22 720,46 C900,68 1260,68 1440,46 L1440,80 L0,80 Z";

export default function WaveDivider({ nextBg }) {
  return (
    <div className="wave-div" aria-hidden="true">
      <div className="wave-track wave-track--slow">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d={BACK}  fill={nextBg} fillOpacity="0.45" /></svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d={BACK}  fill={nextBg} fillOpacity="0.45" /></svg>
      </div>
      <div className="wave-track wave-track--fast">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d={FRONT} fill={nextBg} /></svg>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d={FRONT} fill={nextBg} /></svg>
      </div>
    </div>
  );
}
