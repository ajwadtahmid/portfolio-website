import React, { useState } from 'react';
import "./navbar.css";
import menu from "../img/menu.png"
import { Link } from "react-scroll";

const Navbar = ({ darkMode, toggleTheme }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className='navbar'>
      <button
        className="logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        A
      </button>

      <div className="desktopMenu">
        <Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItems">About</Link>
        <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItems">Experience</Link>
        <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItems">Projects</Link>
        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItems">Contact</Link>
        <a href="https://drive.google.com/file/d/1KMFSPUUP1jbwa9RSZxjZNKlxFUOfN_5X/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="desktopMenuListItems">Resume</a>
      </div>

      {/* Theme toggle button only */}
      <button className="themeToggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      <img src={menu} alt="Menu" className="mobMenu" onClick={() => setShowMenu(!showMenu)} />
      <div className="mobileMenu" style={{ display: showMenu ? "flex" : "none" }}>
        <Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={500} className="mobileMenuListItems" onClick={() => setShowMenu(false)}>About</Link>
        <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-100} duration={500} className="mobileMenuListItems" onClick={() => setShowMenu(false)}>Experience</Link>
        <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-100} duration={500} className="mobileMenuListItems" onClick={() => setShowMenu(false)}>Projects</Link>
        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-100} duration={500} className="mobileMenuListItems" onClick={() => setShowMenu(false)}>Contact</Link>
        <a href="https://drive.google.com/file/d/1KMFSPUUP1jbwa9RSZxjZNKlxFUOfN_5X/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mobileMenuListItems" onClick={() => setShowMenu(false)}>Resume</a>
        <button className="mobileMenuListItems" onClick={toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;