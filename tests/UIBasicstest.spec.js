const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test('Browser Context Playwright test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    await userName.fill("rahulshetty");
    await page.locator('[type="password"]').fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText("Incorrect");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    

    //await page.pause();
});

test.only('UI Controls', async ({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userNamae = page.locator("#username");
   const signIn = page.locator("signInBtn");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().check();
   await page.locator("#okayBtn").click();

   await page.pause();
});