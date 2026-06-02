import { Locator, Page } from "@playwright/test";

export class LogoutPage{
    readonly logoutMessage: Locator;
    readonly reloginLink: Locator;

    constructor(private page: Page){
        this.logoutMessage = page.locator('#logged-out-message');
        this.reloginLink = page.getByTestId('relogin-link');
    }
}