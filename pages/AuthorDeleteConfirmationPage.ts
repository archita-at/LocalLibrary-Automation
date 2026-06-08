import { Locator, Page } from "@playwright/test";

export class AuthorDeleteConfirmationPage{
    readonly confirmationPageHeading: Locator;
    readonly authorFullName: Locator;
    readonly confirmationButton: Locator;

    constructor(private page:Page){
        this.confirmationPageHeading = page.locator('h1');
        this.authorFullName = page.locator('#author-name');
        this.confirmationButton = page.getByTestId('confirmation-button');
    }

    async confirmDelete(){
        this.confirmationButton.click();
    }
}