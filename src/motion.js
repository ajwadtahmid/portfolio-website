import { useSyncExternalStore } from "react";

// Motion preference: a single on/off switch stored as <html data-motion="on|off">.
// index.html sets the initial value before first paint (saved choice, else the
// OS "reduce motion" setting). CSS reads the attribute; JS effects read useMotion().
const KEY = "motion";
const listeners = new Set();

const readSaved = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const apply = (on) => {
  document.documentElement.dataset.motion = on ? "on" : "off";
  listeners.forEach((l) => l());
};

export const getMotion = () => document.documentElement.dataset.motion !== "off";

// A saved choice is stored; an OS-derived default is not, so it keeps following the OS.
export function setMotion(on) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // storage blocked: the choice still applies for this visit
  }
  apply(on);
}

if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", (e) => {
      if (!readSaved()) apply(!e.matches);
    });
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useMotion() {
  return useSyncExternalStore(subscribe, getMotion, () => true);
}
