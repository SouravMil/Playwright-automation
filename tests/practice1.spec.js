const { test, expect } = require("@playwright/test");

test.only("E-Commerce Functional Test Suite", async ({ page }) => {
  const addItem = [
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Fleece Jacket",
  ];
  //Login with Valid credentials
  const user = "problem_user";
  const password = "secret_sauce";
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill(user);
  await page.fill("#password", password);
  await page.click("#login-button");
  //handling js alert
  page.on("dialog", (dialog) => dialog.accept());
  //Add items to cart (shopping page)
  await expect(page.getByText("Products")).toBeVisible();
  const items = page.locator(".inventory_item_description");
  for (let i = 0; i < (await items.count()); i++) {
    const productName = await items
      .nth(i)
      .locator(".inventory_item_name")
      .textContent();
    if (addItem.includes(productName)) {
      await items.nth(i).locator(".btn").click();
    }
  }
  await page.locator(".shopping_cart_link").click();
  const cartItem = page.locator(".cart_item");
  await cartItem.first().waitFor();
  ////////////expect(await cartItem.locator('.inventory_item_name').textContent()).toEqual(addItem);
  //remove unwanted item from cart (cart page)
  const cartItems = page.locator(".cart_item_label");
  for (let j = 0; j < (await cartItems.count()); j++) {
    const unwanted = await cartItems
      .nth(j)
      .locator(".inventory_item_name")
      .textContent();
    if (unwanted !== "Sauce Labs Bike Light") {
      await cartItems.nth(j).locator(".btn").click();
    }
  }
  const requireItem = await cartItems.locator('.inventory_item_name').textContent();
  expect(requireItem).toEqual('Sauce Labs Bike Light');
  await page.locator("#checkout").click();
  await page.pause();
});

test("Use invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.fill("#user-name", "problem_user");
  await page.fill("#password", "qwerty");
  await page.click("#login-button");
  var errorText = await page.locator('h3[data-test="error"]').textContent();
  console.log(errorText);
  await page.reload();
  await page.fill("#user-name", "problem_user1");
  await page.fill("#password", "qwerty");
  await page.click("#login-button");
  await expect(page.locator('h3[data-test="error"]')).toContainText(
    "do not match"
  );
});
