const {test, expect, request} = require('@playwright/test');

const Payload = {userEmail: "sakura28@gmail.com", userPassword: "1435@Abc"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;

test.beforeAll( async()=>
{
    //Login API call to get the token
    const apiContext = await request.newContext();
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: Payload
     })

    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    console.log(responseJson);
    token = responseJson.token;


    //Create order API call to get the order id
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
});

test.beforeEach(async ({page})=>{
    //runs before each test -- test1, test2, test3
}
);

//Place order using API token and validate the order in UI
test('Order a product using API token.',async ({page})=>
{
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");   
    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i=0;i<rowCount;++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});