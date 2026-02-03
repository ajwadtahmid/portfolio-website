import React, { useRef } from 'react';
import "./contact.css";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_4bj7t2y', 'template_kkzwpbp', form.current, 'J8GkK4AS_sBls7ANj')
            .then((result) => {
                console.log(result.text);
                e.target.reset();
                alert("Email Sent!");
            }, (error) => {
                console.log(error.text);
                alert("Failed to send email. Please try again.");
            });
    };

    return (
        <section id="contact" className="contactPage">
            <div className="contactWrapper">
                <h1 className="contactPageTitle">Contact Me</h1>
                <span className="contactDesc">You can use the form below to contact me</span>

                <form className="contactForm" ref={form} onSubmit={sendEmail}>
                    <input className="name" type="text" placeholder="Your Name" name="from_name" required />
                    <input className="email" type="email" placeholder="Your Email" name="from_email" required />
                    <textarea className="messageBody" placeholder="Your Message" rows="5" name="message" required></textarea>
                    <button className="submitButton" type="submit">Send Message</button>

                    <div className="links">
                        <a href="mailto:ayonat@uci.edu" className="linkItem">
                            <div className="linkIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/ajwad-tahmid-ayon/" target="_blank" rel="noopener noreferrer" className="linkItem">
                            <div className="linkIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </div>
                        </a>

                        <a href="https://github.com/ajwadtahmid" target="_blank" rel="noopener noreferrer" className="linkItem">
                            <div className="linkIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;