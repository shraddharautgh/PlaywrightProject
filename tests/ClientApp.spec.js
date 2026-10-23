const {test, expect} = require('@playwright/test');

test('Browser Context validating login page.',async ({page})=>
{
    const email = "sakura28@gmail.com";
    const ProductNmae = "ZARA COAT 3";
    const Product = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").type("sakura28@gmail.com");
    await page.locator("#userPassword").type("1435@Abc");
    await page.locator("[value='Login']").click();

    //await page.waitForLoadState('networkidle');//Flaky sometimes
    await page.locator(".card-body b").first().waitFor();
    const titles =await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await Product.count();
    for (let i=0; i<count; ++i){
        if (await Product.nth(i).locator("b").textContent() === ProductNmae)
        {
            //Add to cart
            await Product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const options = page.locator(".ta-results"); 
    await options.waitFor();
    const OptionCount = await options.locator("button").count();

    for(let i=0;i<OptionCount;++i)
    {
        const text = await options.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await options.locator("button").nth(i).click();
            break;
        }
    }

    const cvv = page.locator('div.field', { hasText: 'CVV Code' }).locator('input.txt');
    await cvv.waitFor();
    await cvv.fill('123');
    const nameOnCard = page.locator('div.field', { hasText: 'Name on Card' }).locator('input.txt');
    await nameOnCard.fill('John Doe');
    await page.locator('input[name="coupon"]').fill('SAVE10');
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const OrderId = await page.locator(" .em-spacer-1 .ng-star-inserted ").textContent();
    console.log(OrderId);

    await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i=0;i<rowCount;++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(OrderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(OrderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();
});