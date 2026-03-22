const {test, expect, request} = require('@playwright/test');
const { only } = require('node:test');

const loginPayLoad = {userEmail: "improve@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders :[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let token;
let orderID;

test.beforeAll(async () =>
{

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log("Token: => ", token); 

    const orderResponse = await apiContext.post
    ("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: 
            {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        }
    )
    const orderResponseJson = await orderResponse.json();
    console.log("orderResponseJson: => ", orderResponseJson);
    orderID = orderResponseJson.orders[0];

});

test.only('Place order Playwright test', async ({page})=>
{
    await page.addInitScript(value => 
        {
            window.localStorage.setItem("token", value);
        }, token);
    await page.goto("https://rahulshettyacademy.com/client");
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
    await page.pause();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();

    // await page.pause();
});