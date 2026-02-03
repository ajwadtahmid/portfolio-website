import React from 'react';
import "./projects.css";
import githubIcon from "../img/github.png";

const projects = [
  {
    title: "Fabflix",
    description: "Developed and deployed a scalable web application on AWS using Apache Tomcat servers, with HTTPS enabled via Let's Encrypt. Containerized with Docker and deployed to Kubernetes cluster. Features secure authentication, Google reCAPTCHA, and fuzzy search.",
    technologies: ["Java", "AWS", "Docker", "JavaScript", "HTML", "Kubernetes", "MySQL"],
    github: "https://github.com/uci-jherold2-2025spring-cs122b/2025-spring-cs-122b-ajwad-122b",
    live: null
  },
  {
    title: "SpydrNotes",
    description: "Feature-rich note-taking app using the MERN stack. Implemented scalable backend API with Node.js and Express.js, JWT-based authentication, and responsive React frontend with reusable components.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/ajwadtahmid/SpydrNotes",
    live: null
  },
  {
    title: "Search Engine",
    description: "Implemented text preprocessing (tokenization and lemmatization) to improve search efficiency. Built TF-IDF scoring, HTML tag analysis, bigram index, cosine similarity and PageRank algorithm. Designed user-friendly GUI with spell check.",
    technologies: ["Python", "NLP", "TF-IDF", "Inverted Index", "PageRank"],
    github: "https://github.com/ajwadtahmid/CompSci121",
    live: null
  },
  {
    title: "Portfolio Website",
    description: "Responsive personal portfolio website built with React. Features dark/light mode toggle, smooth animations, and modern UI design showcasing my projects and experience.",
    technologies: ["React", "CSS", "JavaScript"],
    github: "https://github.com/ajwadtahmid/portfolio-website",
    live: null
  },
  {
    title: "Sentiment AI: IMDb Review Classification",
    description: "Performed sentiment analysis on 50k IMDb reviews using a pre-trained BERT model. Achieved ~94% accuracy in classifying reviews as positive or negative. Additionally, applied BERT embeddings with K-means clustering to group reviews by semantic similarity and visualize clusters with t-SNE.",
    technologies: ["Python", "BERT", "NLP", "Machine Learning", "K-means"],
    github: "https://github.com/ajwadtahmid/CompSci178Project",
    live: null
  },
  {
    title: "VAE-Based Movie Recommender",
    description: "Built a personalized movie recommendation system using a Variational Autoencoder (VAE) to capture user preferences from 81k IMDb ratings. Enhanced recommendations with Thompson Sampling for exploration-exploitation balance",
    technologies: ["Python", "VAE", "Machine Learning", "PyTorch", "Thompson Sampling"],
    github: "https://github.com/ajwadtahmid/CompSci179Project",
    live: null
  }


];

const Projects = () => {
  return (
    <section id="projects">
      <div className="projectContainer">
        <div className="projectHeader">
          <h2 className="projectSectionTitle">Projects</h2>
        </div>

        <div className="projectGrid">
          {projects.map((project, index) => (
            <div key={index} className="projectCard">
              <div className="projectCardTop">
                <h3 className="projectTitle">{project.title}</h3>
                <div className="projectLinks">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="projectLink" aria-label="View on GitHub">
                    <img src={githubIcon} alt="GitHub" className="projectLinkIcon" />
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="projectLink" aria-label="View live site">
                      <span className="externalLinkIcon">🔗</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="projectDescription">{project.description}</p>

              <div className="projectTechnologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="projectTech">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;