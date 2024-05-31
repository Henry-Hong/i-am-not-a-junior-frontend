import { $ } from "./main";
import { test, expect, describe } from "vitest";

describe("mini-query", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  test("should return a function", () => {
    expect(typeof $).toBe("function");
  });

  test("returns length correctly", () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="btn">buttons</div>
      <div class="btn">buttons</div>
      <div class="btn">buttons</div>
    `;
    expect($(".btn", div).length()).toBe(3);
  });
});
