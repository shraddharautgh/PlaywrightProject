const {test, expect} = require('@playwright/test');

//Basic test to validate login page and get the titles of the products on the page.
test('Browser context playwright test',async ({browser})=>
{
    //Chrome - Plugins/Cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/");
    console.log(await page.title());
});

//Basic test to validate login page and get the titles of the products on the page.
test('Page playwright test',async ({page})=>
{
    const UserName = page.locator('#username');
    const SignInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //get the title of the page -assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //locator - CSS selector
    await UserName.type("rahulshetty");
    await page.locator("[type='password']").type("Learning@830$3mK2");
    await SignInBtn.click();

    //wait until this locator shown up on page.
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    //type and fill 
    await UserName.fill("");
    await UserName.fill("rahulshettyacademy");
    await SignInBtn.click();

    //Get the text for IPhone X, Samsung Galaxy and Blackberry S20 from the page and print it on console.
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles =  await cardTitles.allTextContents();
    console.log(allTitles);
});

//basic 
test('UI Controls.',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const UserName = page.locator('#username');
    const SignInBtn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //await page.pause();
});

test.only('Child windows and Tabs',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const UserName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()]);
    
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@"); //split the text to get the domain name
    const domain = arrayText[1].split(" ")[0]; //get the domain name from the text
    console.log(domain);
    await UserName.type(domain);
    await page.pause();
    console.log(await UserName.inputValue());
});