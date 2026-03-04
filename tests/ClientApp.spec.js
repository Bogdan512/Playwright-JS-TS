const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test.only('Browser Context Playwright test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const email = "anshika@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
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
    await page.locator("text=Checkout").click();
    //delay means that it presses "i" waits 150 miliseconds and then presses "n" wait 150 milisecnods...
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);


    await page.pause();
});