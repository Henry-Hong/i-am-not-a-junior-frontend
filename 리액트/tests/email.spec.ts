import { test, expect } from "@playwright/test";

test.describe("email page", () => {
  const url = "/email";
  test("if email invalid, show email error message", async ({ page }) => {
    await page.goto(url);
    await page.getByLabel("이메일").fill("wrongemail");
    await expect(
      page.getByText("올바른 이메일 양식을 입력해주세요.")
    ).toBeVisible();
  });

  test("has 2 input fiels", async ({ page }) => {
    await page.goto(url);
    await expect(page.getByRole("textbox")).toHaveCount(1);
  });
});
