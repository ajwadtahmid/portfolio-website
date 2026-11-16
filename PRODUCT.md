# Product

## Register

brand

## Users

Potential employers, clients, and collaborators evaluating Ajwad's technical capabilities. They arrive via LinkedIn, GitHub, or referral and spend 2-5 minutes scanning projects, skills, and experience. They ask: "What has he built? Is he the engineer we need? Can I contact him?"

## Product Purpose

Showcase Ajwad's technical depth, shipped products, and engineering philosophy in a way that builds confidence and opens doors. Success means: credible project presence, fast contact path, clear differentiation from template portfolios.

Contact paths: a real contact form (Netlify Forms, with a direct-email fallback), a visible email address with copy, and a `/resume` link that always serves the latest PDF from Google Drive. Each project opens its own page (problem, approach, outcome, stack, links) rather than ending at a GitHub link.

## Brand Personality

Technically rigorous, unfussy, understated. Shows work over hype. Calm and focused (not energetic or playful). Precision matters—from code to design. Confident without being promotional.

## Anti-references

- Generic portfolio templates (squarespace, wix, theme-shop)
- Loud gradient effects, busy animations, or "creative" effects
- Vague project descriptions or hidden GitHub links
- Marketing jargon (synergy, passionate, game-changer)
- Oversized hero sections or call-out text ("Hire me!")
- Flat or gray color palettes presented as "minimalist"

## Design Principles

1. **Let work speak first.** Projects are the primary narrative. Description + link, no decoration.
2. **Signal competence quietly.** Technical detail in project cards (stack, outcome, domain knowledge) builds credibility better than adjectives.
3. **Friction-free discovery.** Clear navigation, fast load, no surprises. Tools and terminals are familiar; use that vocabulary.
4. **One aesthetic, applied consistently.** Dark and light themes, subtle interactive motion, no divergent brand moods per section. The visual direction (currently Apple-inspired) is being re-chosen from mockups; the outcome is recorded in DESIGN.md.
5. **Show, don't tell.** The terminal, the dark/light toggle, the custom hooks—these demonstrate taste and depth. Don't describe them in copy.

## Accessibility & Inclusion

- WCAG 2.2 AA minimum (contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text), checked with axe in both themes. Ship gate: axe clean, `npm run lint` and `npm test` pass.
- Motion is always optional: one "Animations" on/off button in the nav, defaulting to the OS reduce-motion setting and saved when the visitor chooses. Off means nothing moves on its own (no particles, parallax, typewriter, scramble, tilt, blinking or flashing); content never depends on animation. Nothing flashes more than 3 times a second.
- Dark/light mode follows the OS setting by default; an explicit choice is saved. Both themes meet the contrast minimums.
- Keyboard and screen readers: skip link, visible focus, focus trapped and restored in the terminal and mobile menu, live regions only where content changes meaningfully. Targets at least 24px (44px for primary controls).
- Forms: inline errors tied to their fields, announced status, and an email fallback if sending fails.
- Terminal easter egg is purely optional; core content is always accessible
