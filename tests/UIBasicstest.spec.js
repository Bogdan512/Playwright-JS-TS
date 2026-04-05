const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test('Browser Context Playwright test', async ({page})=>
{

    //page.route('**/*.css', route=> route.abort());
    //page.route('**/*.{jpg, png, jpeg}', route=> route.abort());

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    //page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
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
    
    //debugger;
   // await page.pause();
});

test('UI Controls', async ({page})=>
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

test('Child Windows handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userNamae = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']"); 
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await documentLink.click()
    ]);
    
    const text = await newPage.locator("div .red").textContent();
    console.log("---" + text + "---");
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.bringToFront(); // to bring the main page to front
    await page.locator('#username').fill(domain);
    console.log("Here should be the username -> " + await page.locator("#username").inputValue());
    

   //await page.pause();
});