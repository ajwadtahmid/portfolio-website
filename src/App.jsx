import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NavDots from "./components/NavDots";
// The terminal is an opt-in easter egg: load it on first open, not up front
const Terminal = lazy(() => import("./components/Terminal"));

function App() {
  // index.html sets the "lm" class before paint (saved choice, else the OS setting)
  const [dark, setDark] = useState(
    () => !document.documentElement.classList.contains("lm"),
  );
  // Only an explicit toggle is saved, so an untouched visitor keeps following the OS
  const chooseTheme = (isDark) => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // storage blocked: the choice still applies for this visit
    }
    setDark(isDark);
  };
  const [termOpen, setTermOpen] = useState(false);

  useLayoutEffect(() => {
    // Start at the top, unless the URL deep-links to a section (/#projects).
    // The browser's own hash jump runs before React renders, so do it here.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lm", !dark);
  }, [dark]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        setTermOpen(false);
        return;
      }
      if (e.key === "`") {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        setTermOpen((t) => !t);
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    <div className="app-root">
      <div id="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav
        dark={dark}
        setDark={chooseTheme}
        onTermOpen={() => setTermOpen(true)}
      />
      <NavDots />
      <main id="main" tabIndex={-1}>
        <Hero dark={dark} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {termOpen && (
        <Suspense fallback={null}>
          <Terminal onClose={() => setTermOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
