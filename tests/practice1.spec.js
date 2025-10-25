const{test,expect} = require('@playwright/test');

test('E-Commerce Functional Test Suite', async({page})=>
{
    //Login with Valid credentials
    const user = 'problem_user';
    const password = 'secret_sauce';
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill(user);
    await page.fill('#password',password);
    await page.click('#login-button');
    //handling js alert
    page.on('dialog', dialog => dialog.accept());
    await expect(page.getByText('Products')).toBeVisible();
    const productLists = await page.locator('.inventory_item_name').allTextContents();
    console.log(productLists);
})

test.only('Use invalid credentials', async({page})=>
{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name','problem_user');
    await page.fill('#password','qwerty');
    await page.click('#login-button');
    var errorText = await page.locator('h3[data-test="error"]').textContent();
    console.log(errorText);
    await page.reload();
    await page.fill('#user-name','problem_user1');
    await page.fill('#password','qwerty');
    await page.click('#login-button');
    await expect(page.locator('h3[data-test="error"]')).toContainText('do not match')
})