import React from 'react'
import "./projects.css"

const Projects = () => {
  return (
    <section id="projects">
        <div className="projectSection">
          <h1 className="projectSectionTitle">Projects</h1>
          <div className="projectBars">
            <a href="https://github.com/ajwadtahmid/portfolio-website" className="projectBar" target="_blank" rel="noopener noreferrer">
              <div className="projectBarTitle">
                <h2>Portfolio Website</h2>
              </div>
              <div className="projectBarDesc">
                <p>Used HTML, CSS, JavaScript and React to create the website you are viewing right now</p>
              </div>
            </a>
          </div>
          <div className="projectBars">
            <a href="https://github.com/ajwadtahmid/TipCalculator" className="projectBar" target="_blank" rel="noopener noreferrer">
              <div className="projectBarTitle">
                <h2>Tip Calculator (Android)</h2>
              </div>
              <div className="projectBarDesc">
                <p> Created a tip calcuator in kotlin that updates result in real time.</p>
              </div>
            </a>
          </div>
        </div>
    </section>
  )
}

export default Projects