import { describe, expect, it } from "vitest";
import { buildFs, resolve, list, complete, commonPrefix, pwd, promptPath } from "./fs";

const root = buildFs();

describe("terminal file system", () => {
  it("lists the home directory, folders first", () => {
    expect(list(root)).toEqual(["projects/", "skills/", "experience/", "about.md", "contact.txt", "resume.pdf"]);
  });

  it("resolves relative, home and parent paths without caring about case", () => {
    expect(resolve(root, [], "projects/fabflix").path).toEqual(["projects", "fabflix"]);
    expect(resolve(root, ["projects", "fabflix"], "readme.md").node.type).toBe("file");
    expect(resolve(root, ["projects", "fabflix"], "../..").path).toEqual([]);
    expect(resolve(root, ["skills"], "~/about.md").node.type).toBe("file");
    expect(resolve(root, ["skills"], "/home/visitor/projects").path).toEqual(["projects"]);
    expect(resolve(root, [], "..").path).toEqual([]);
  });

  it("returns null for paths that do not exist", () => {
    expect(resolve(root, [], "nope")).toBeNull();
    expect(resolve(root, [], "about.md/x")).toBeNull();
  });

  it("puts real content in project files", () => {
    const text = resolve(root, [], "projects/fabflix/README.md").node.text;
    expect(text).toContain("# Fabflix");
    expect(text).toContain("Stack: Java");
  });

  it("completes paths", () => {
    expect(complete(root, [], "pro")).toEqual(["projects/"]);
    expect(complete(root, [], "projects/fab")).toEqual(["projects/fabflix/"]);
    expect(complete(root, ["projects"], "s")).toHaveLength(3);
    expect(complete(root, [], "a", { dirsOnly: true })).toEqual([]);
    expect(commonPrefix(["search-engine/", "sentiment-ai/", "spydrnotes/"])).toBe("s");
  });

  it("formats paths for pwd and the prompt", () => {
    expect(pwd(["projects"])).toBe("/home/visitor/projects");
    expect(promptPath([])).toBe("~");
    expect(promptPath(["projects", "fabflix"])).toBe("~/projects/fabflix");
  });
});
