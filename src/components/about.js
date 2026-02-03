import React, { useState, useEffect } from 'react';
import "./about.css";

const titles = ["a Programmer", "a Software Engineer", "a Developer", "a Problem Solver"];

const About = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, 500);

    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about">
      <div className="aboutContent">
        <p className="hello animate-fade-in">
          Hello, my name is
        </p>

        <h1 className="introText animate-fade-in-delay-1">
          <span className="introName">Ajwad</span>
        </h1>

        <div className="titleText animate-fade-in-delay-2">
          <span>I am </span>
          <span className={`cyclingTitle ${fade ? 'fade-in' : 'fade-out'}`}>
            {titles[currentTitle]}
          </span>
        </div>

        <p className="aboutParagraph animate-fade-in-delay-3">
          I'm a Computer Science graduate passionate about crafting elegant solutions
          to complex problems. I specialize in building modern web applications
          with clean, scalable code and intuitive user experiences.
        </p>
      </div>
    </section>
  );
}

export default About;