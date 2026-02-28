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
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().check();
    await page.locator("#okayBtn").click();
    expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked()); //isChecked is a method which will return true or false
    console.log(await page.locator("#terms").isChecked());
    await page.locator("#terms").check();
    expect(page.locator("#terms")).toBeChecked();
    expect( page.locator("#terms").isChecked()).toBeTruthy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

   //await page.pause();
});