import { useState, useEffect, useLayoutEffect } from "react";
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
import Terminal from "./components/Terminal";

function App() {
  const [dark, setDark] = useState(true);
  const [termOpen, setTermOpen] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
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
      <Nav dark={dark} setDark={setDark} onTermOpen={() => setTermOpen(true)} />
      <NavDots />
      <main>
        <Hero dark={dark} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
    </div>
  );
}

export default App;
