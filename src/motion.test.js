// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { getMotion, setMotion } from "./motion";

describe("motion preference", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.motion;
  });

  it("defaults to on when nothing has set the attribute", () => {
    expect(getMotion()).toBe(true);
  });

  it("setMotion(false) turns motion off, updates the attribute and saves the choice", () => {
    setMotion(false);
    expect(getMotion()).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("off");
    expect(localStorage.getItem("motion")).toBe("off");
  });

  it("setMotion(true) turns it back on", () => {
    setMotion(false);
    setMotion(true);
    expect(getMotion()).toBe(true);
    expect(localStorage.getItem("motion")).toBe("on");
  });
});
