const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test('Browser Context Playwright test', async ({page})=>
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
    await page.getByLabel

     
    const orderID = await page.locator("label.ng-star-inserted").textContent();
    const cleanOrderID = orderID.trim().replace(/\|/g, "").trim();
    await page.getByRole("button", {name: "Orders"}).click();
    await page.locator("tbody tr").first().waitFor();
    await page.locator("tbody tr").filter({hasText: cleanOrderID}).locator("button").filter({hasText: "View"}).click();
    await expect(page.getByText(cleanOrderID)).toBeVisible();


    await page.pause();
});