import { CONTACT_EMAIL } from "../data";
import { GithubIcon, LinkedInIcon, MailIcon } from "../icons";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/ajwadtahmid",
    icon: <GithubIcon />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ajwad-tahmid-ayon/",
    icon: <LinkedInIcon />,
    external: true,
  },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: <MailIcon /> },
];

export default function Footer() {
  return (
    <footer className="footer grain">
      <div className="footer-inner">
        <nav className="footer-links" aria-label="Profiles and email">
          {LINKS.map(({ label, href, icon, external }) => (
            <a
              key={label}
              href={href}
              className="footer-link"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <p className="footer-text">© 2023 – Present · Ajwad Tahmid Ayon</p>
      </div>
    </footer>
  );
}
