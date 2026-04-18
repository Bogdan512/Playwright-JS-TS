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
        const token = loginResponseJson.token;
        console.log("Token: => ", token); 
        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post
        ("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: 
                {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            }
        )
        const orderResponseJson = await orderResponse.json();
        console.log("orderResponseJson: => ", orderResponseJson);
        const orderID = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
    }
}

module.exports = {APIUtils};