const { test, expect } = require("@playwright/test");

test("Form Automation & Validation", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.fill("#firstName", "Robin");
  await page.fill("#lastName", "Hood");
  await page.fill("#userEmail", "robinhood@example.com");
  const genderList = page.locator("#genterWrapper .custom-control");
  for (let i = 0; i < (await genderList.count()); i++) {
    const genderLabel = await genderList
      .nth(i).locator(".custom-control-label")
      .textContent();
    if (genderLabel === "Male") {
      await genderList.nth(i).locator(".custom-control-label").click();
    }
  }
  await page.fill('#userNumber','987654321');
  const calendar = page.locator('#dateOfBirthInput');
  await calendar.click();
  const calendarPop = calendar.locator('.react-datepicker__month-container');
  await calendarPop.selectOption('.react-datepicker__month-select','August');
  await calendarPop.selectOption('.react-datepicker__year-select','1947');
  await calendarPop.getByText('15').click();
  expect(calendar).toHaveValue('15 Aug 1947');
});
