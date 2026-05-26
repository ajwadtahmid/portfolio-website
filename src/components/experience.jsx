import React from 'react';
import "./experience.css";

const experiences = [
  {
    type: "education",
    title: "Bachelor of Science in Computer Science",
    company: "University of California, Irvine",
    period: "September 2023 - June 2025",
    location: "Irvine, CA",
    description: "GPA: 3.78 | Relevant coursework: Design and Analysis of Algorithms, Information Retrieval, Intro to Artificial Intelligence, Machine Learning and Data Mining, Formal Language and Automata",
    technologies: ["Algorithms", "AI", "Machine Learning", "Data Mining"]
  },
  {
    type: "work",
    title: "Regulatory Affairs Assistant",
    company: "NHK Laboratories Inc.",
    period: "February 2020 - September 2023",
    location: "Santa Fe Springs, CA",
    description: "Managed customer complaints and led investigations for over 100 cases. Facilitated and supported over 30 external regulatory audits. Planned and spearheaded over 20 internal audits. Drafted and maintained 70+ Operating Procedures.",
    technologies: ["Auditing", "Compliance", "Quality Management", "Data Analysis"]
  },
  {
    type: "work",
    title: "Volunteer",
    company: "South Asian Network",
    period: "May 2022 - August 2022",
    location: "Artesia, CA",
    description: "Assisted over 75 immigrants in US citizenship applications through form completion and informational support. Shared welfare opportunities and mental health support with communities.",
    technologies: ["Community Service", "Customer Support"]
  }
];

const Experience = () => {
  return (
    <section id="experience">
      <div className="expContainer">
        <div className="expHeader">
          <h2 className="expSectionTitle">Experience</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
              <div className="timeline-dot"></div>

              <div className="expCard">
                <div className="expCardHeader">
                  <div className="expIcon">
                    {exp.type === 'work' ? '💼' : '🎓'}
                  </div>
                  <span className="expPeriod">{exp.period}</span>
                </div>

                <h3 className="expTitle">{exp.title}</h3>
                <p className="expCompany">{exp.company}</p>
                <p className="expLocation">{exp.location}</p>
                <p className="expDescription">{exp.description}</p>

                <div className="expTechnologies">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="techTag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;