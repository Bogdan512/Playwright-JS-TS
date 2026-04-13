const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');

test.only('Browser Context Playwright test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const username = "improve@gmail.com";
    const password = "Iamking@000";
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.validLogin(username, password);
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();

    //await page.waitForLoadState('networkidle');  can be flaky, better to wait for specific element
 
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

    await expect(page.locator(".user__name [type=text]").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
        const rowOrderID =await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetails = await page.locator("div.col-text").textContent();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();

    await page.pause();
});