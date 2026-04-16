const {DashboardPage} = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
const {CartPage} = require('./CartPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.OrdersReviewPage = new OrdersReviewPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrdersReviewPage()
    {
        return this.OrdersReviewPage;
    }
}
module.exports = {POManager};
