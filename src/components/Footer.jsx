import { useInView } from "../hooks";

export default function Footer() {
  const [ref, vis] = useInView();
  return (
    <footer className="footer grain">
      <div ref={ref} className={`footer-inner fu d1${vis ? " vis" : ""}`}>
        <p className="footer-text">
          © 2023 - Present. Ajwad Tahmid Ayon. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
