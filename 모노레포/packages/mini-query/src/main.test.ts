import { $ } from "./main";
import { test, expect, describe, vi } from "vitest";

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

  test("click()", () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="btn">buttons</div>
      <div class="btn">buttons</div>
      <div class="btn">buttons</div>
    `;

    const handler = vi.fn();
    $(".btn", div).click(handler);

    div.querySelectorAll(".btn")[0].dispatchEvent(new MouseEvent("click"));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
