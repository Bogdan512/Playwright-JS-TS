const {test, expect} = require('@playwright/test');


test.only("Pop-up validation", async ({page})=>
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


});