import { Locator, Page } from "@playwright/test";

export class AuthorFormPage{
    readonly formPageHeading: Locator;
    readonly authorFirstName: Locator;
    readonly authorLastName: Locator;
    readonly authorDob: Locator;
    readonly authorDod: Locator;
    private readonly authorFormSubmitButton: Locator;


    constructor(private page:Page){
        this.formPageHeading = page.locator('h1');
        this.authorFirstName = page.getByLabel('First name:');
        this.authorLastName = page.getByLabel('Last name:');
        this.authorDob = page.getByLabel('Date of birth:');
        this.authorDod = page.getByLabel('Died:');
        this.authorFormSubmitButton = page.getByTestId('author-submit-button');
    }

    async submitAuthorForm() {
        await this.authorFormSubmitButton.click();
    }

    async submitAuthorDetails(authorFirstName: string, authorLastName: string, authorDob:string, authorDod?:string){
        await this.authorFirstName.fill(authorFirstName);
        await this.authorLastName.fill(authorLastName);
        await this.authorDob.fill(authorDob);
        if (authorDod !== undefined) {
            await this.authorDod.clear();
            await this.authorDod.fill(authorDod);
        }
        await this.authorFormSubmitButton.click();
    }
}