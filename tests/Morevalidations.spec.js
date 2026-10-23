const {test, expect} = require('@playwright/test');

test('Popup validation.',async ({page})=>
{
    await page.goto("http://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    const text = await frame.locator(".text h2").textContent();
    console.log(text);
    console.log(text.split(" ")[1]);

});