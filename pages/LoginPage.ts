import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly loginButton: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    readonly errorMessage: Locator;

    constructor(private page: Page) {
        this.loginButton = this.page.getByTestId('login-button');
        this.usernameInput = this.page.getByLabel('Username:');
        this.passwordInput = this.page.getByLabel('Password:');
        this.errorMessage = this.page.locator('#validation-error')
    }

    /**
     * Launches the login page
     */
    async gotoLoginPage() {
        await this.page.goto("/accounts/login/");
    }

    /**
     * Enters the username and password in respective fields and clicks the login button
     * @param username - Username of the user
     * @param password - Password of the user
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async usernameValidation() {
        const validationMessage = await this.usernameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        return validationMessage;
    }

    async passwordValidation() {
        const validationMessage = await this.passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        return validationMessage;
    }
}