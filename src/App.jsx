import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(true);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("lm", !dark);
  }, [dark]);
  return (
    <div className="app-root">
      <div id="scroll-progress" aria-hidden="true" />
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Hero dark={dark} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
