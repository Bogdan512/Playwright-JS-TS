const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManger');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


test.only('Browser Context Playwright test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const username = "improve@gmail.com";
    const password = "Iamking@000";
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    
    await loginPage.goto();
    await loginPage.validLogin(dataset.username, dataset.password);
    
    await dashboardPage.searchProductAddToCart(dataset.productName);
    await dashboardPage.navigateToCart();

    await cartPage.VerifyProductIsDisplayed(dataset.productName);
    await cartPage.getProductLocator(dataset.productName).waitFor();
    await cartPage.Checkout();

    await ordersReviewPage.VerifyEmailId(dataset.username);
    await ordersReviewPage.searchCountryAndSelect("ind", " India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log("orderId => " + orderId);

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect("orderID");
});