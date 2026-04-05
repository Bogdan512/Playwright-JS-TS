const { test, expect, request } = require('@playwright/test');
const { only } = require('node:test');

test.only('Security test request intercept', async ({ page }) => {
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const email = "improve@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');  can be flaky, better to wait for specific element
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async route => await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69d22edcf86ba51a65482b84AAA' }))
    const viewButton = page.locator("button:has-text('View')").first();
    await viewButton.waitFor();
    await viewButton.click()
    //debugger;
    await expect (page.locator("p").last()).toHaveText("You are not authorize to view this order")
})