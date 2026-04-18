const {test, expect, request} = require('@playwright/test');
const { only } = require('node:test');

const loginPayLoad = {userEmail: "improve@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders :[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data:[], message:"No Orders"}

const {APIUtils} = require('../utils/APIUtils');
let response;

test.beforeAll(async () =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test('Fake Order', async ({page})=>
{
    await page.addInitScript(value => 
        {
            window.localStorage.setItem("token", value);
        }, response.token);
    await page.route('**/get-orders-for-customer/**', 
       async route=>
            {
                await route.fulfill
                ({
                    status: 200,
                    contentType:'application/json',
                    body:JSON.stringify(fakePayLoadOrders)
                });
            }
    )
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    console.log(await page.locator(".mt-4").textContent());

});