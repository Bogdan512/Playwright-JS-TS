const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test.only('Browser Context Playwright test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');  can be flaky, better to wait for specific element
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for(let i=0; i<count; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            console.log("Found the product:", productName);
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool =await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.pause();
});