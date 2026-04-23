const {test, expect} = require('@playwright/test');
const{customtest} = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManger');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataset)
{
    test(`Client app login for ${data.productName}`, async ({page})=>
    {
        const products = page.locator(".card-body");
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        
        await loginPage.goto();
        await loginPage.validLogin(data.username, data.password);
        
        await dashboardPage.searchProductAddToCart(data.productName);
        await dashboardPage.navigateToCart();

        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.getProductLocator(data.productName).waitFor();
        await cartPage.Checkout();

        await ordersReviewPage.VerifyEmailId(data.username);
        await ordersReviewPage.searchCountryAndSelect("ind", " India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log("orderId => " + orderId);

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        await dashboardPage.navigateToOrders();
        await ordersHistoryPage.searchOrderAndSelect("orderID");
    });

    customtest.only('Custom app login', async ({page, testDataForOrder})=>
    {
        const products = page.locator(".card-body");
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        
        await loginPage.goto();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
        
        await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();

        await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
        await cartPage.getProductLocator(testDataForOrder.productName).waitFor();
        await cartPage.Checkout();
    });

}