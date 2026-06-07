import { Locator, Page } from "@playwright/test";

export class AuthorDetailPage{
    readonly authorFullName: Locator;
    readonly authorDobAndDod: Locator;
    readonly updateAuthorLink: Locator;

    constructor(private page:Page){
        this.authorFullName = page.locator('h1');
        this.authorDobAndDod = page.locator('#author-dob-and-dod');
        this.updateAuthorLink = page.getByTestId('update-author-link');
    }
}