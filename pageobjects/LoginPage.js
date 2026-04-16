class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.homeButton = page.getByRole('button', { name: 'Home' });
    }

    async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password)
    {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.homeButton.click();
    await this.page.locator(".card-body b").first().waitFor();
    }
}
module.exports = {LoginPage};