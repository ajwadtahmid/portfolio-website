import React from 'react';
import "./experience.css";

const Experience = () => {
  return (
    <section id="experience">
        <span className="expSectionTitle">Relevant Experience</span>
        <div className="experienceSection">
            <div className="expSection">
                <h1 className="expHeading">Computer Science Major @ University of California, Irvine</h1>
                <p className="expExtra">Degree Type: Bachelor's in Computer Science <span className="duration">Expected Graduation: Spring 2025</span></p> 
                <p className="expDesc">Relevant Coursework: Data Structure Implementation and Analysis, Information Retrieval, 
                  Human Computer Interaction, Introduction to Data Management, Intro to Software Engineering</p>
            </div>
            <div className="expSection">
                <h1 className="expHeading">Regulatory Affairs Assistant @ NHK Laboratories Inc.</h1>
                <p className="expExtra">Santa Fe Springs, CA <span className="duration">February 2020 - September 2023</span></p> 
                <ul className="expDescList">
                  <li>Managed customer complaints and led investigations for over 100 cases to ensure customer satisfaction.</li>
                  <li>Collaboratively facilitated and supported over 30 external regulatory audits, working closely with relevant 
                    departments to enhance pre-audit preparations and ensure the smooth progression of audit procedures.</li>
                  <li>Skillfully planned and spearheaded over 20 internal audits, showcasing a strong command of audit methodologies.</li>
                  <li>Developed and maintained 70+ Operating Procedures, ensuring compliance with current and new regulations.</li>
                  <li>Devised several data-driven spreadsheets with relevant information, complemented by thorough trend analysis.</li>
                  <li>Led presentations during the Annual Management Review, delivering insights to upper management.</li>
                </ul>
            </div>
            <div className="expSection">
                <h1 className="expHeading">Volunteer @ South Asian Network</h1>
                <p className="expExtra">Artesia, CA <span className="duration">May 2022 - August 2022</span></p>
                <ul className="expDescList">
                  <li>Assisted over 75 immigrants in US citizenship applications, through form completion and informational support.</li>
                  <li>Shared welfare opportunities and mental health support with communities through posters and handouts.</li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Experience;