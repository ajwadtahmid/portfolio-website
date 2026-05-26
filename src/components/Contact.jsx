import { useState } from "react";
import { useInView } from "../hooks";
import { GithubIcon, LinkedInIcon, MailIcon } from "../icons";
import { CONTACT_EMAIL } from "../data";
import SectionH2 from "./SectionH2";

const SOCIALS = [
  {
    icon: <GithubIcon />,
    label: "GitHub",
    href: "https://github.com/ajwadtahmid",
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ajwad-tahmid-ayon/",
  },
  {
    icon: <MailIcon />,
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    isEmail: true,
  },
];

export default function Contact() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [st, setSt] = useState("idle");
  const [copyState, setCopyState] = useState("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2200);
    } catch (e) {
      setCopyState("failed");
      setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  const send = (e) => {
    e.preventDefault();
    setSt("sending");
    const sub = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.msg}`,
    );
    setTimeout(() => {
      window.open(`mailto:${CONTACT_EMAIL}?subject=${sub}&body=${body}`);
      setSt("done");
    }, 700);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="contact grain"
      aria-label="Contact"
    >
      <div style={{ maxWidth: "30rem", margin: "0 auto" }}>
        <span className={`sb${vis ? " vis" : ""}`}>Contact</span>
        <SectionH2 vis={vis}>Let's talk.</SectionH2>
        <p className={`contact-sub fu d1${vis ? " vis" : ""}`}>
          Have a role or project in mind? The form below opens your email client
          with everything pre-filled.
        </p>
        {st === "done" ? (
          <div className="glass contact-done">
            <p className="contact-done-check">✓</p>
            <p className="contact-done-title">Opening your email client…</p>
            <p className="contact-done-sub">
              Message is pre-filled. Just hit send!
            </p>
          </div>
        ) : (
          <form
            onSubmit={send}
            className={`contact-form fu d2${vis ? " vis" : ""}`}
            noValidate
          >
            <div>
              <label className="sr" htmlFor="fn">
                Name
              </label>
              <input
                id="fn"
                required
                type="text"
                placeholder="Your name"
                className="fi"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="sr" htmlFor="fe">
                Email
              </label>
              <input
                id="fe"
                required
                type="email"
                placeholder="Email address"
                className="fi"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="sr" htmlFor="fm">
                Message
              </label>
              <textarea
                id="fm"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="fi contact-textarea"
                value={form.msg}
                onChange={(e) =>
                  setForm((f) => ({ ...f, msg: e.target.value }))
                }
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                disabled={st === "sending"}
                className="btn btn-p"
              >
                {st === "sending" ? "Opening…" : "Send Message →"}
              </button>
            </div>
          </form>
        )}
        <div className={`contact-socials fu d3${vis ? " vis" : ""}`}>
          {SOCIALS.map(({ icon, label, href, isEmail }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {icon}
                <span>{label}</span>
              </a>
              {isEmail && (
                <button
                  onClick={copyEmail}
                  className="copy-btn"
                  title="Copy email address"
                  style={{
                    color: copyState === "copied" ? "#34d399" : copyState === "failed" ? "#f87171" : "var(--t3)",
                    borderColor: copyState === "copied" ? "rgba(52,211,153,.3)" : copyState === "failed" ? "rgba(248,113,113,.3)" : "var(--bd)",
                  }}
                >
                  {copyState === "copied" ? "✓ Copied" : copyState === "failed" ? "Failed" : "Copy"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
