class APIUtils
{

    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post
        ("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad 
            }
        )
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log("Token: => ", token); 
        return token;
    }

    async createOrder(orderPayLoad)
    {
        const orderResponse = await this.apiContext.post
        ("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: 
                {
                    "Authorization": await this.getToken(),
                    "Content-Type": "application/json"
                }
            }
        )
        const orderResponseJson = await orderResponse.json();
        console.log("orderResponseJson: => ", orderResponseJson);
        orderID = orderResponseJson.orders[0];
        return orderID;
    }
}

module.exports = {APIUtils};