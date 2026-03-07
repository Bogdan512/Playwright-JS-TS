import {test, expect} from "@playwright/test";

test("Special locators", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Password123");
    await page.getByRole("button", {name:'Submit'}).click();
    await expect(page.getByText("uccess! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link", {name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button", {name:"Add"}).click();

    await page.pause();
});