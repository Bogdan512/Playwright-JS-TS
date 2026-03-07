const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test.only('Browser Context Playwright test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const email = "improve@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", {name: "Login"}).click();
    //await page.waitForLoadState('networkidle');  can be flaky, better to wait for specific element
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).locator("button").filter({hasText:' Add To Cart'}).click();

    await page.getByRole("listitem").getByRole("button", {name:'Cart'}).click();


    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

 
    await page.getByRole("button", {name: "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:150});
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("Place Order").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

     
    // const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // await page.locator("button[routerlink*='myorders']").click();
    // await page.locator("tbody").waitFor();
    // const rows = page.locator("tbody tr");

    // for(let i=0; i<await rows.count(); ++i)
    // {
    //     const rowOrderID =await rows.nth(i).locator("th").textContent();
    //     if(orderID.includes(rowOrderID))
    //     {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }
    // const orderIDDetails = await page.locator("div.col-text").textContent();
    // expect(orderID.includes(orderIDDetails)).toBeTruthy();

    await page.pause();
});