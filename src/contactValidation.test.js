import { describe, it, expect } from "vitest";
import { validate } from "./contactValidation";

const good = { name: "Ada", email: "ada@example.com", msg: "Hello, I have a role." };

describe("validate", () => {
  it("accepts a complete, well-formed message", () => {
    expect(validate(good)).toEqual({});
  });

  it("flags every empty field", () => {
    const e = validate({ name: "  ", email: "", msg: "" });
    expect(Object.keys(e).sort()).toEqual(["email", "msg", "name"]);
  });

  it("rejects malformed emails", () => {
    for (const email of ["bad", "bad@", "a@b", "a b@c.co"]) {
      expect(validate({ ...good, email }).email).toBeTruthy();
    }
  });

  it("requires a message of at least 10 characters", () => {
    expect(validate({ ...good, msg: "too short" }).msg).toBeTruthy();
    expect(validate({ ...good, msg: "long enough!" }).msg).toBeUndefined();
  });
});
