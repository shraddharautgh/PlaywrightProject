const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const Payload = {userEmail: "sakura28@gmail.com", userPassword: "1435@Abc"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let token;
let orderId;
let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,Payload);
    response = await apiUtils.createOrder(orderPayload);
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
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");   
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i=0;i<rowCount;++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});