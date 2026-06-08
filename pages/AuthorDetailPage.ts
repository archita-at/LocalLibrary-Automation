import { Locator, Page } from "@playwright/test";

export class AuthorDetailPage{
    readonly authorFullName: Locator;
    readonly authorDobAndDod: Locator;
    private readonly updateAuthorLink: Locator;
    private readonly deleteAuthorLink: Locator;

    constructor(private page:Page){
        this.authorFullName = page.locator('h1');
        this.authorDobAndDod = page.locator('#author-dob-and-dod');
        this.updateAuthorLink = page.getByTestId('update-author-link');
        this.deleteAuthorLink = page.getByTestId('delete-author-link');
    }

    async updateAuthor(){
        this.updateAuthorLink.click();
    }

    async deleteAuthor(){
        this.deleteAuthorLink.click();
    }
}