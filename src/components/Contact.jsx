import { useState } from "react";
import { useInView } from "../hooks";
import { GithubIcon, LinkedInIcon, MailIcon } from "../icons";
import { CONTACT_EMAIL } from "../data";
import { validate } from "../contactValidation";
import SectionH2 from "./SectionH2";
import WaveDivider from "./WaveDivider";

const SOCIALS = [
  { icon: <GithubIcon />,   label: "GitHub",   href: "https://github.com/ajwadtahmid" },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/in/ajwad-tahmid-ayon/" },
];

const FIELD_IDS = { name: "fn", email: "fe", msg: "fm" };

export default function Contact() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: "", email: "", msg: "", trap: "" });
  const [errors, setErrors] = useState({});
  const [st, setSt] = useState("idle"); // idle | sending | done | error
  const [copyState, setCopyState] = useState("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2200);
  };

  const setField = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  // Submits to Netlify Forms (the static copy of this form is in index.html)
  const send = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstBad = Object.keys(FIELD_IDS).find((k) => found[k]);
    if (firstBad) {
      document.getElementById(FIELD_IDS[firstBad])?.focus();
      return;
    }
    setSt("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          "bot-field": form.trap,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.msg.trim(),
        }).toString(),
      });
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
      setSt("done");
    } catch (err) {
      console.warn(err);
      setSt("error");
    }
  };

  const fieldProps = (key, label) => ({
    id: FIELD_IDS[key],
    name: key === "msg" ? "message" : key,
    value: form[key],
    onChange: setField(key),
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `${FIELD_IDS[key]}-err` : undefined,
    "aria-label": label,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="contact grain"
      aria-labelledby="contact-title"
    >
      <div className="contact-inner-wrap">
        <span className={`sb${vis ? " vis" : ""}`}>Contact</span>
        <SectionH2 id="contact-title" vis={vis}>
          Let's talk.
        </SectionH2>
        <p className={`contact-sub fu d1${vis ? " vis" : ""}`}>
          Have a role or project in mind? Send a message and I'll reply by
          email.
        </p>
        {st === "done" ? (
          <div className="glass contact-done" role="status">
            <p className="contact-done-check" aria-hidden="true">
              ✓
            </p>
            <p className="contact-done-title">Message sent</p>
            <p className="contact-done-sub">
              Thanks, I'll get back to you by email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={send}
            className={`contact-form fu d2${vis ? " vis" : ""}`}
            noValidate
          >
            {/* Honeypot: hidden from people, filled by bots */}
            <div className="sr" aria-hidden="true">
              <label>
                Leave this empty
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.trap}
                  onChange={setField("trap")}
                />
              </label>
            </div>
            <div>
              <label className="sr" htmlFor="fn">
                Name
              </label>
              <input
                {...fieldProps("name", "Name")}
                required
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="fi"
              />
              {errors.name && (
                <p id="fn-err" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="sr" htmlFor="fe">
                Email
              </label>
              <input
                {...fieldProps("email", "Email")}
                required
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="fi"
              />
              {errors.email && (
                <p id="fe-err" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="sr" htmlFor="fm">
                Message
              </label>
              <textarea
                {...fieldProps("msg", "Message")}
                required
                rows={5}
                placeholder="What's on your mind?"
                className="fi contact-textarea"
              />
              {errors.msg && (
                <p id="fm-err" className="field-error">
                  {errors.msg}
                </p>
              )}
            </div>
            <div className="contact-form-submit">
              <button
                type="submit"
                disabled={st === "sending"}
                className="btn btn-p"
              >
                {st === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </div>
            <div role="status">
              {st === "error" && (
                <p className="contact-status">
                  Your message could not be sent. Please email me directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
            </div>
          </form>
        )}
        <div className={`contact-socials fu d3${vis ? " vis" : ""}`}>
          {SOCIALS.map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
              {icon}
              <span>{label}</span>
            </a>
          ))}
          <div className="contact-email-row">
            <a href={`mailto:${CONTACT_EMAIL}`} className="social-link">
              <MailIcon />
              <span>Email</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className={`copy-btn${copyState === "copied" ? " copy-btn--copied" : copyState === "failed" ? " copy-btn--failed" : ""}`}
            >
              {copyState === "copied" ? "✓ Copied" : copyState === "failed" ? "Failed" : "Copy"}
            </button>
            <span className="sr" role="status">
              {copyState === "copied"
                ? "Email address copied"
                : copyState === "failed"
                  ? "Could not copy the email address"
                  : ""}
            </span>
          </div>
        </div>
      </div>
      <WaveDivider nextBg="var(--bg1)" />
    </section>
  );
}
