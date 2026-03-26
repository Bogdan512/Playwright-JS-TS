const {test, expect, request} = require('@playwright/test');
const { only } = require('node:test');

const loginPayLoad = {userEmail: "improve@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders :[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

const {APIUtils} = require('./utils/APIUtils');
let response;

test.beforeAll(async () =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test.only('Place order Playwright test', async ({page})=>
{
    await page.addInitScript(value => 
        {
            window.localStorage.setItem("token", value);
        }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
        const rowOrderID =await rows.nth(i).locator("th").textContent();
        if(response.orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetails = await page.locator("div.col-text").textContent();
    await page.pause();
    expect(response.orderID.includes(orderIDDetails)).toBeTruthy();

    // await page.pause();
});