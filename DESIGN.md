---
name: Ajwad Tahmid Ayon, Portfolio
description: A calm, dark-first (and light) engineer's portfolio in Inter with one blue accent, tonal sections and an optional terminal.
colors:
  accent: "#2997ff"
  accent-text: "#5cb3ff"
  on-accent: "#06121f"
  workbench-night: "#252527"
  bench-grey: "#272729"
  bench-raised: "#2a2a2c"
  bench-card: "rgba(255, 255, 255, 0.05)"
  bench-hairline: "rgba(255, 255, 255, 0.07)"
  ink-on-dark: "#ffffff"
  ink-on-dark-muted: "#cccccc"
  ink-on-dark-subtle: "#a1a1a6"
  error-on-dark: "#ff9b9b"
  accent-on-light: "#0066cc"
  on-accent-light: "#ffffff"
  paper: "#f5f5f7"
  paper-white: "#ffffff"
  paper-cool: "#eaecf0"
  paper-card: "#ffffff"
  paper-hairline: "#e0e0e0"
  ink: "#1d1d1f"
  ink-muted: "#333333"
  ink-subtle: "#636368"
  error-on-light: "#b42318"
  terminal-black: "#0d0d0f"
  terminal-red: "#ff5f57"
  terminal-yellow: "#febc2e"
  terminal-green: "#28c840"
  copied-green: "#34d399"
  copy-failed-red: "#f87171"
  scrim: "rgba(0, 0, 0, 0.55)"
typography:
  display:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(2.8rem, 9vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "-0.018em"
  body-compact:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
  stat:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 900
    letterSpacing: "-0.045em"
  ui:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  hero-role:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 2.8vw, 1.55rem)"
    fontWeight: 400
    letterSpacing: "-0.022em"
  chip:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  terminal:
    fontFamily: "SF Mono, Cascadia Code, Fira Code, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  pill: "9999px"
  card: "20px"
  stat-card: "16px"
  input: "12px"
  terminal: "12px"
  small: "6px"
  cursor: "2px"
spacing:
  gutter: "1.25rem"
  card-padding: "1.5rem"
  grid-gap: "1.25rem"
  section-top: "6rem"
  section-bottom: "7.5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "11px 2rem"
    height: "44px"
  button-primary-light:
    backgroundColor: "{colors.accent-on-light}"
    textColor: "{colors.on-accent-light}"
    rounded: "{rounded.pill}"
    padding: "11px 2rem"
    height: "44px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "11px 2rem"
    height: "44px"
  card-glass:
    backgroundColor: "{colors.bench-card}"
    textColor: "{colors.ink-on-dark-muted}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  stat-card:
    backgroundColor: "{colors.bench-card}"
    rounded: "{rounded.stat-card}"
    padding: "1.25rem"
  chip:
    textColor: "{colors.ink-on-dark-subtle}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  input:
    backgroundColor: "{colors.bench-card}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.input}"
    padding: "0.75rem 1rem"
  icon-button:
    backgroundColor: "{colors.bench-card}"
    textColor: "{colors.ink-on-dark-muted}"
    rounded: "{rounded.pill}"
    size: "36px"
  terminal-window:
    backgroundColor: "{colors.terminal-black}"
    textColor: "#e0e0e0"
    rounded: "{rounded.terminal}"
---

# Design System: Ajwad Tahmid Ayon, Portfolio

## Overview

**Creative North Star: "The Quiet Workbench"**

A calm, well-lit place where the work is laid out and the tools are within reach. The page is a long, even surface in near-black (or soft paper in light mode) with one blue light on it. Projects, skills and history sit on faint glass cards, set in tight, confident Inter. Nothing shouts: the hierarchy comes from size, weight and a little negative tracking, not from colour or ornament. The terminal is the workbench's one drawer; a visitor can open it, and everything else works without it.

The system serves visitors who spend two to five minutes scanning projects and want a fast, credible way to make contact. It is dark-first, with a fully supported light theme that follows the operating-system setting. It is understated on purpose: technical rigor shows in precision (consistent radii, measured contrast, optional motion), not in effects.

**Key Characteristics:**
- Inter Variable throughout, heavy and tightly tracked for display, relaxed for reading.
- One accent (blue) used for interaction and emphasis; everything else is neutral.
- Tonal sections: three nearly identical surfaces alternate, joined by soft wave dividers rather than rules.
- Faint glass cards with a 1px hairline; depth is mostly tonal, with a blue glow only on the primary action and on card hover.
- Motion is present but always optional: a single Animations switch stills every effect.
- A real accessibility floor: 4.5:1 text contrast in both themes, keyboard and screen-reader support, 44px primary targets.

## Colors

A near-neutral palette with a single blue. Dark surfaces are almost indistinguishable steps of charcoal; light surfaces are warm-cool paper whites.

### Primary
- **Signal Blue** (`#2997ff`): the accent on dark. Used for the primary button fill, links, the logo mark, stat numbers, focus and active states. On cards it is too dim for small text (4.05:1), so use Signal Blue Text there.
- **Signal Blue Text** (`#5cb3ff`): the accent for small text on dark cards (section kickers, tags). 5.4:1 or better on every dark surface.
- **Deep Link Blue** (`#0066cc`): the accent on light surfaces, 5.1:1 on paper. White text on it is 5.6:1.
- **Ink on Blue** (`#06121f`): the text colour on Signal Blue fills. White on `#2997ff` is only 3.0:1 and must not be used.

### Neutral (dark theme)
- **Workbench Night** (`#252527`): the base surface (hero, experience, contact, footer).
- **Bench Grey** (`#272729`): about and skills sections.
- **Bench Raised** (`#2a2a2c`): the projects section.
- **Bench Card** (`rgba(255,255,255,0.05)`) and **Bench Hairline** (`rgba(255,255,255,0.07)`): glass card fill and 1px borders.
- **Ink on Dark** (`#ffffff`), **Ink on Dark Muted** (`#cccccc`), **Ink on Dark Subtle** (`#a1a1a6`): headings, body, and metadata. Subtle is 4.7:1 or better on every surface including cards.

### Neutral (light theme)
- **Paper** (`#f5f5f7`), **Paper White** (`#ffffff`), **Paper Cool** (`#eaecf0`): the three alternating section surfaces. Cards are Paper White with a Paper Hairline (`#e0e0e0`) border.
- **Ink** (`#1d1d1f`), **Ink Muted** (`#333333`), **Ink Subtle** (`#636368`): headings, body, metadata. Subtle is 5:1 or better.

### Functional
- **Error** (`#ff9b9b` dark, `#b42318` light): form errors and invalid fields.
- **Copied Green** (`#34d399`) and **Copy Failed Red** (`#f87171`): transient state on the copy-email button.
- **Terminal chrome** (`#0d0d0f` body, traffic lights `#ff5f57`, `#febc2e`, `#28c840`): the terminal always renders dark, in either theme.
- **Scrim** (`rgba(0,0,0,0.55)`): the blurred backdrop behind the terminal.

### Named Rules
**The One Blue Rule.** Blue is the only hue. It marks what you can act on and the few things worth emphasis (stat numbers, the logo). Never introduce a second accent colour.

**The Contrast Floor Rule.** Body and metadata text must reach 4.5:1 on the surface it sits on, including on the lighter card fills, in both themes. Text on a blue fill uses Ink on Blue. This is verified with axe before shipping.

**The Tonal Section Rule.** Section changes are made with a one-step change of surface and a soft wave divider, never with a hard rule or a different colour.

## Typography

**Display, Body and Label Font:** Inter Variable (self-hosted via `@fontsource-variable/inter`), with `system-ui` and platform sans fallbacks.
**Terminal Font:** SF Mono, Cascadia Code, Fira Code, then generic monospace.

**Character:** One family, used heavily. Display and headings are very heavy (800 to 900) with strong negative tracking so they read as solid shapes; body copy is regular weight with light negative tracking and generous line height. Weight and size do all the hierarchy work.

### Hierarchy
- **Display** (800, `clamp(2.8rem, 9vw, 5.5rem)`, 1.04, -0.045em): the hero name only.
- **Headline** (800, `clamp(2.2rem, 4.5vw, 3.4rem)`, 1.08, -0.04em): section headings, revealed with a masked wipe.
- **Hero role** (regular, `clamp(1.1rem, 2.8vw, 1.55rem)`, -0.022em): the "I'm a ..." line under the name.
- **Title** (700, 1.2rem, -0.025em): project and experience names on cards.
- **Body** (400, 1.0625rem, 1.68, -0.018em): about and section intro copy, max about 56rem wide.
- **Body compact** (400, 0.9375rem, 1.65, -0.01em): descriptions inside cards.
- **Label** (600, 0.75rem, 0.14em, uppercase): the small section kickers above headings, set in Signal Blue Text on cards or Signal Blue on the page.
- **Stat** (900, 2.1rem, -0.045em, Signal Blue): the count-up numbers.
- **Chip** (400, 11px, -0.01em): tech chips and pills.
- **UI** (500, 0.875rem, -0.01em): buttons, form fields and small controls.

### Named Rules
**The Tight Tracking Rule.** Display and headline text carries negative letter-spacing (-0.04em or tighter); it is part of the voice. Body text carries only a slight negative tracking (-0.01 to -0.022em). Never track out lowercase text.

**The One Family Rule.** Inter is the only text face. Monospace appears only in the terminal.

## Layout

A single centred column of full-width tonal sections, each padded 6rem above and 7.5rem below with 1.25rem side gutters. Content sits in two measures: 56rem (about, narrow reading and forms) and 64rem (projects, experience, footer). The project grid is three columns with 1.25rem gaps, dropping to two columns at 1024px and one at 640px. The experience section is a ruled list, one row per entry with dates in a left column, that stacks to a single column on small screens. The primary navigation is a fixed 48px bar; below 768px it becomes a full-screen menu overlay. Breakpoints in use: 1024, 900 (section dots hide), 768 (mobile nav), 640 (single column). Spacing rhythm is generous between sections and tight inside cards (1.5rem padding, 1rem gaps).

## Elevation & Depth

Mostly tonal. Surfaces are flat at rest and separated by one-step surface changes and 1px hairlines; the only blur is a light 6px backdrop blur on glass cards and a stronger blur on the scrolled nav bar. Light is reserved for the accent: the primary button carries a soft blue glow, and a project card gains a blue glow and a slight lift on hover. The terminal is the one object that casts a conventional deep shadow.

### Shadow Vocabulary
- **Accent glow** (`box-shadow: 0 0 24px rgba(41,151,255,0.2)`, light mode `rgba(0,102,204,0.14)`): the primary button, intensifying to 48px on hover.
- **Card hover** (`box-shadow: 0 20px 60px var(--shadow), 0 0 80px var(--glow)`): project cards on hover, with a small perspective tilt. Applied only when motion is on.
- **Terminal lift** (`box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)`): the terminal window.

### Named Rules
**The Flat-Until-Touched Rule.** Cards are flat at rest. Glow and lift appear only in response to the pointer or keyboard focus, and never when motion is off.

## Shapes

Soft and consistent. Interactive controls are full pills (9999px): buttons, chips, info pills. Containers use a descending radius by size: glass and experience cards 20px, stat cards 16px, form fields and the terminal 12px, and small utility controls (copy button, dot labels) 6px. Round icon buttons are circles. Borders are always 1px hairlines; there are no thick borders, no coloured side bars, and no hard corners except the 2px blinking cursor.

## Components

### Buttons
- **Shape:** full pill (9999px), 44px minimum height, `11px 2rem` padding, 0.875rem text.
- **Primary:** Signal Blue fill with Ink on Blue text, weight 600, a soft accent glow. On the light theme: Deep Link Blue fill with white text.
- **Outline:** transparent with a 1.5px Signal Blue border and blue text; fills with blue on hover.
- **Hover / Focus:** a 2px lift and a stronger glow on hover (lift removed when motion is off); a visible blue focus ring on keyboard focus; press scales to 0.95.
- **Hierarchy:** one primary action per hero (Email me); Projects and Resume are outline.

### Cards / Containers
- **Corner Style:** 20px (glass), 16px (stat cards).
- **Background:** Bench Card translucent fill with 6px backdrop blur; white in light mode.
- **Border:** 1px Bench Hairline; shifts to Signal Blue on hover for linked cards.
- **Internal Padding:** 1.5rem (project and experience cards), 1.25rem (stat cards).

### Chips and pills
- **Style:** 1px hairline, full pill, 11px text in Ink on Dark Subtle, `0.25rem 0.625rem` padding. Info pills in the about section use the same shape at a larger size.

### Inputs / Fields
- **Style:** Bench Card fill, 1px hairline, 12px radius, `0.75rem 1rem` padding, 0.875rem text, labels visually hidden but present.
- **Focus:** the border shifts to Signal Blue with a soft blue ring.
- **Error:** the border turns to the Error colour and a message appears beneath the field, linked with `aria-describedby`.

### Navigation
- **Style:** a fixed 48px bar that gains a translucent blurred background once scrolled. Logo mark "ATA" in Signal Blue at the left, text links centred, a filled Resume button and three icon buttons (terminal, animations, theme) at the right.
- **States:** the active section's link is marked as you scroll (underline shortens to a short bar); hover draws an underline.
- **Mobile:** below 768px, a full-screen overlay menu with staggered links; focus is trapped and Escape closes it.
- **Section dots:** a vertical dot rail on the right (hidden below 900px), each dot a 24px target with a label on hover.

### Terminal (signature component)
An optional macOS-style terminal window opened with the backtick key or the nav button. Always dark, regardless of theme, in a monospace face, with a prompt `visitor@ajwad:~$`, tab completion, history, and playful commands. It is a labelled dialog with a focus trap and returns focus on close.

### Motion
Easing is `cubic-bezier(0.16, 1, 0.3, 1)` (a strong ease-out). Reveals use 0.7s fade-and-rise with 0.1s staggers; the hero enters once on load over 0.9s; hover and state changes take 0.2 to 0.35s. Ambient layers (blurred glow orbs, a connected-dot particle canvas, wave dividers, a blinking cursor) exist only in the hero and dividers. All of it stills when the Animations switch is off or the OS asks for reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep Signal Blue as the only accent; use `#5cb3ff` for small blue text on cards and `#06121f` for text on blue fills.
- **Do** verify every new text and surface pairing at 4.5:1 in both themes, including on card fills.
- **Do** give both themes equal care; the light theme is a full design, not an inversion.
- **Do** use heavy weights with negative tracking for display and headings, and regular weight for reading.
- **Do** make every new effect stop when the Animations switch is off, and show its final state without it.
- **Do** keep primary targets at 44px and every other target at least 24px.

### Don't:
- **Don't** put white text on `#2997ff` (3.0:1).
- **Don't** add a second accent hue, gradient text, or decorative gradients.
- **Don't** add more ambient layers (orbs, particles, waves) than the hero and dividers already have; they are the ceiling.
- **Don't** use parallax or movement on body text, or any animation that cannot be turned off.
- **Don't** replace tonal section changes with hard rules or coloured bands.
- **Don't** make the terminal required to reach any content.

## Desktop view

The optional desktop view at `/desktop/` (source in `src/desktop/`) is a separate page with its own look: petrol and paper colours with a tangerine accent, set in Red Hat Display, Red Hat Text and Red Hat Mono. It is linked from the nav's monitor button and links back with "Standard site". Its rules live in `src/desktop/styles.css`; nothing above applies to it, and none of its fonts or colours belong on the main site.
