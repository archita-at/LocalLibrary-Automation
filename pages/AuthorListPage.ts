import { Locator, Page } from "@playwright/test";

export class AuthorListPage{
    readonly addNewAuthorButton: Locator;

    constructor(private page:Page){
        this.addNewAuthorButton = page.getByTestId('add-author-button');
    }

    async navigateToAddNewAuthorPage(){
        await this.addNewAuthorButton.click();
    }

}