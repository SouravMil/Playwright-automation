const { test, expect } = require("@playwright/test");

test("Form Automation & Validation", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.fill("#firstName", "Robin");
  await page.fill("#lastName", "Hood");
  await page.fill("#userEmail", "robinhood@example.com");
  const genderSelection = page.locator(".custom-radio");
  for (let i = 0; i < (await genderSelection.count()); i++) {
    const genderLabel = await genderSelection
      .nth(i)
      .locator(".custom-control-label")
      .textContent();
      if(genderLabel === 'Male')
      {
        await genderSelection.locator('.custom-control-input').click();
      }
  }
  await page.pause();
});
