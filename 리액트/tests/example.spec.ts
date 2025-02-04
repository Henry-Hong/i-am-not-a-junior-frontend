import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test.describe("카운터", () => {
  test("카운터 페이지 이동", async ({ page }) => {
    await page.goto("/counter");
    await expect(page.getByText(/counterpage/i, { exact: true })).toBeVisible();
  });

  test("더하기", async ({ page }) => {
    await page.goto("/counter");
    await page.getByRole("button", { name: "plus" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("1");
  });

  test("빼기", async ({ page }) => {
    await page.goto("/counter");
    await page.getByRole("button", { name: "minus" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("-1");
  });

  test("다 해보기", async ({ page }) => {
    await page.goto("/counter");

    await page.getByRole("button", { name: "plus" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("1");

    await page.getByRole("button", { name: "plus" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("2");

    await page.getByRole("button", { name: "minus" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("1");

    await page.getByRole("button", { name: "reset" }).click();
    await expect(page.getByRole("textbox")).toHaveValue("0");
  });
});
