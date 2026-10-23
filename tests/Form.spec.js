import test, { expect } from '@playwright/test';

test('Playwright special locators', async ({ page }) => {

await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').check();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceholder('Password').fill('ind');
await page.getByRole('button', { name: 'Submit' }).click();

//5 seconds dafault timeout for expect assertions. timeout: 10_000} ---> Step level
await expect(page.getByText('Success! The Form has been submitted successfully!')).toBeVisible({timeout: 10_000});
await page.getByRole('link', { name: 'Shop' }).click();
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});

//Handling timeout for expet at test level.
test('Playwright special locators test level.', async ({ page }) => {

test.setTimeout(20_000); //20 seconds timeout for the test
const slowExpect = expect.configure({ timeout: 10_000 });
page.setDefaultTimeout(10_000); //10 seconds timeout for all the actions in the test

await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').check();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceholder('Password').fill('ind');
await page.getByRole('button', { name: 'Submit' }).click();

//5 seconds dafault timeout for expect assertions.
await slowExpect(page.getByText('Success! The Form has been submitted successfully!')).toBeVisible();

//Global --> test level --> step level
await page.getByRole('link', { name: 'Shop' }).click({ timeout: 10_000 });
await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});


//By using codegen tool
test.only('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').press('CapsLock');
  await page.locator('form input[name="name"]').fill('Abc');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('abc@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('tototo');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.locator('input[name="bday"]').fill('2026-10-17');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('input[name="bday"]').fill('2026-10-16');
  await page.getByRole('button', { name: 'Submit' }).click();
});