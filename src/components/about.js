import React from 'react'
import "./about.css"

const About = () => {
  return (
    <section id="about">
        <div className="aboutContent">
            <span className="hello">Hello,<br/></span>
            <span className="introText">I'm <span className="introName">Ajwad</span><br/></span>
            <p className="aboutParagraph">....</p>
        </div>
    </section>
  )
}

export default About;