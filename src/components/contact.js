import React, { useRef } from 'react';
import "./contact.css"
import github from "../img/github.png"
import linkedin from "../img/linkedin.png"
import gmail from "../img/gmail.png"
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs.sendForm('service_4bj7t2y', 'template_kkzwpbp', form.current, 'J8GkK4AS_sBls7ANj')
          .then((result) => {
              console.log(result.text);
              e.target.reset();
              alert("Email Sent!")
          }, (error) => {
              console.log(error.text);
          });
      };    
    return (
    <section className="contactPage">
        <div id='contact'>
            <h1 className="contactPageTitle">Contact Me</h1><br/>
            <span className="np">You can use the form below to contact me</span>
            <form className="contactForm" ref={form} onSubmit={sendEmail}>
                <input className="name" type="text" placeholder="Your Name" name="from_name" />
                <input className="email" type="email" placeholder="Your Email" name="from_email" />
                <textarea className="messageBody" placeholder="Your Message" rows="5" name="message"></textarea>
                <button className="submitButton" value="Send" type="submit">Submit</button>
                <div className="links">
                    <a href="mailto:ayonat@uci.edu">
                        <img src={gmail} alt="Email" className="linkIcon" href="https://github.com/ajwadtahmid" /> </a>
                    <a href="https://www.linkedin.com/in/ajwad-tahmid-ayon/">
                        <img src={linkedin} alt="Linkedin" className="linkIcon"/> </a>
                    <a href="https://github.com/ajwadtahmid">
                        <img src={github} alt="Github" className="linkIcon"/> </a>
                </div>
            </form>
        </div>
    </section>
  );
}

export default Contact;