import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    readonly username: Locator;
    readonly staffSection: Locator;
    readonly logoutButton: Locator;
    readonly loginSignupButton: Locator;

    constructor(private page:Page){
        this.username = page.getByTestId('username');
        this.staffSection = page.locator('#staff-section');
        this.logoutButton = page.getByTestId('logout-button');
        this.loginSignupButton = page.getByTestId('login-signup-button')
    }

    async logout() {
        await this.logoutButton.click();
    }
}