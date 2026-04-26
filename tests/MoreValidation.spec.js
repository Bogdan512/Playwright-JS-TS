const {test, expect} = require('@playwright/test');

//test.describe.configure({mode: 'parallel'});
//test.describe.configure({mode: 'serial'}); if tests are dependent on each other, if one fails the others will not run 
test("Pop-up validation", async ({page})=>
{
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", {name:"Hide"}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    //page.on("dialog", dialog => dialog.accept());
    page.on("dialog", dialog => dialog.dismiss());
    await page.getByRole("button", {name:"Confirm"}).click();
    await page.pause();
    await page.getByRole("button", {name:"Mouse Hover"}).hover();
    const framepage = page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href*='lifetime']:visible").click();
    const textCheck = await framepage.locator(".text  h2").textContent();
    textCheck.split(" ")[1];
    console.log("Number of participants => " + textCheck);
    


});

test("Screenshot and visual comparison", async({page})=>
{
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator('fieldset').nth(8).screenshot({path: 'partialScreenshot.png'});
    await page.getByRole("button", {name:"Hide"}).click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
})