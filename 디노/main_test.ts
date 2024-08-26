import { assertEquals, assertLess } from "jsr:@std/assert";
import { add } from "./main.ts";

Deno.test("Test1", function () {
  assertEquals(add(2, 3), 5);
});

Deno.test("Test2", function () {
  assertLess(add(1, 2), 10);
});
