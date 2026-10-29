class APIUtils{
    
    constructor(apiContext,Payload){
        this.apiContext = apiContext;
        this.Payload = Payload;
    }

    async getToken(){
    const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: this.Payload
     })

    const responseJson = await response.json();
    console.log(responseJson);
    response.token = responseJson.token;
    console.log(response.token);
    return response.token;
    }

   async createOrder(orderPayload) {
    const response = {};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        }
    );

    const orderResponseJson = await orderResponse.json();
    response.orderId = orderResponseJson.orders[0];
    return response;
} 
}  
    module.exports = {APIUtils};
