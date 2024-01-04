import React, { useState } from 'react';
import "./navbar.css";
import logo from "../img/logo.png";
import menu from "../img/menu.png"
import {Link} from "react-scroll";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className='navbar'>
        <img src={logo} alt="logo" className="logo" />
        <div className="desktopMenu">
          <Link activeClass="active" to="about" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItems">About</Link>
          <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItems">Experience</Link>
          <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItems">Projects</Link>
          <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0} duration={500} className="desktopMenuListItems">Contact</Link>
        </div>
        <button className="resumeButton" onClick={()=>{
          window.location.href = 'https://drive.google.com/file/d/1cyJHayonPkxvddUaYh3OO-6FM4Bv4Z_U/view?usp=sharing';}}>My Resume</button>
        <img src={menu} alt="Menu" className="mobMenu" onClick={()=>setShowMenu(!showMenu)}/>
        <div className="mobileMenu" style={{display:showMenu? "flex":"none"}}>
          <Link activeClass="active" to="about" spy={true} smooth={true} offset={-50} duration={500} className="mobileMenuListItems" onClick={()=>setShowMenu(false)}>About</Link>
          <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-50} duration={500} className="mobileMenuListItems" onClick={()=>setShowMenu(false)}>Experience</Link>
          <Link activeClass="active" to="projects" spy={true} smooth={true} offset={-50} duration={500} className="mobileMenuListItems" onClick={()=>setShowMenu(false)}>Projects</Link>
          <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0} duration={500} className="mobileMenuListItems" onClick={()=>setShowMenu(false)}>Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar;