import { describe, expect, it } from "vitest";
import { pickLines, scoreLine, summarize, SPRINT_LENGTH } from "./typing";

describe("typing sprint scoring", () => {
  it("picks distinct lines", () => {
    const lines = pickLines();
    expect(lines).toHaveLength(SPRINT_LENGTH);
    expect(new Set(lines).size).toBe(SPRINT_LENGTH);
  });

  it("scores a perfect line", () => {
    expect(scoreLine("ls -la", "ls -la")).toEqual({ correct: 6, total: 6 });
  });

  it("counts wrong, missing and extra characters against accuracy", () => {
    expect(scoreLine("ls -la", "ls -lx")).toEqual({ correct: 5, total: 6 });
    expect(scoreLine("ls -la", "ls")).toEqual({ correct: 2, total: 6 });
    expect(scoreLine("ls", "ls -la")).toEqual({ correct: 2, total: 6 });
  });

  it("turns results into words per minute and accuracy", () => {
    // 50 correct characters in 30 seconds = 10 words in half a minute = 20 wpm
    const s = summarize([{ correct: 50, total: 60 }], 30000);
    expect(s.wpm).toBe(20);
    expect(s.accuracy).toBe(83);
    expect(s.seconds).toBe("30.0");
  });
});
