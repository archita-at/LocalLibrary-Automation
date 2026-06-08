import test, { expect } from "@playwright/test";
import { AuthorListPage } from "../pages/AuthorListPage";
import { LoginPage } from "../pages/LoginPage";
import { superUser } from "../test-data/users.json"
import { DashboardPage } from "../pages/DashboardPage";
import { AuthorFormPage } from "../pages/AuthorFormPage";
import { AuthorDetailPage } from "../pages/AuthorDetailPage";
import { createAuthor } from "../utilities/authorFactory";
import { AuthorDeleteConfirmationPage } from "../pages/AuthorDeleteConfirmationPage";

test.describe("Author management via Super user", () => {
    test.beforeEach("Launch login page and login via super user", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step("Login via super user", async () => {
            await loginPage.gotoLoginPage();
            await loginPage.login(superUser.username, superUser.password);
        });

        await test.step("Navigate to the Author list page", async () => {
            await dashboardPage.navigateToAuthorListPage();
        });

    });

    test("Create Author", async ({ page }) => {
        const authorListPage = new AuthorListPage(page);
        const authorFormPage = new AuthorFormPage(page);
        const authorDetailPage = new AuthorDetailPage(page);
        const author = createAuthor();

        const expectedDob = author.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        await test.step("Verify if Add new author button is present", async () => {
            await expect(authorListPage.addNewAuthorButton).toBeVisible();
        });

        await test.step("Navigate to Add new author form page", async () => {
            await authorListPage.navigateToAddNewAuthorPage();
        });

        await test.step("Verify if the user is on the Add new author page", async () => {
            await expect(authorFormPage.formPageHeading).toHaveText("Add New Author Form");
        });

        await test.step("Submit valid author details", async () => {
            await authorFormPage.submitAuthorDetails(author.firstName, author.lastName, author.dob);
        });

        await test.step("Verify user is redirected to the author details page", async () => {
            await expect(page).toHaveURL(/author\/\d+/);
        });

        await test.step("Verify author details on the author details page", async () => {
            await expect(authorDetailPage.authorFullName).toContainText(author.firstName);
            await expect(authorDetailPage.authorFullName).toContainText(author.lastName);
            await expect(authorDetailPage.authorDobAndDod).toContainText(expectedDob);
        });
    });

    test("Update Author", async ({ page }) => {
        const authorListPage = new AuthorListPage(page);
        const authorFormPage = new AuthorFormPage(page);
        const authorDetailPage = new AuthorDetailPage(page);
        const author = createAuthor();
        const updatedDob = new Date(author.date);
        updatedDob.setFullYear(updatedDob.getFullYear() - 1, updatedDob.getMonth() - 1, updatedDob.getDate() - 1);
        const updatedAuthor = {
            firstName: author.firstName + 'updated',
            lastName: author.lastName + 'updated',
            formDob: updatedDob.toLocaleDateString('en-CA'),
            uiDob: updatedDob.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };

        await test.step("Create an author", async () => {
            await authorListPage.navigateToAddNewAuthorPage();
            await authorFormPage.submitAuthorDetails(author.firstName, author.lastName, author.dob);
        });

        await test.step("Click the update author button", async () => {
            await authorDetailPage.updateAuthor();
        });

        await test.step("Verify the user is redirected to the Update author form page", async () => {
            await expect(page).toHaveURL(/author\/\d+\/update/);
        });

        await test.step("Verify and update the author first name", async () => {
            await expect(authorFormPage.authorFirstName).toHaveValue(author.firstName);
            await authorFormPage.authorFirstName.fill(updatedAuthor.firstName);
        });

        await test.step("Verify and update the author last name", async () => {
            await expect(authorFormPage.authorLastName).toHaveValue(author.lastName);
            await authorFormPage.authorLastName.fill(updatedAuthor.lastName);
        });

        await test.step("Verify and update the author date of birth", async () => {
            await expect(authorFormPage.authorDob).toHaveValue(author.dob);
            await authorFormPage.authorDob.fill(updatedAuthor.formDob);
        });

        await test.step("Submit the updated author details", async () => {
            await authorFormPage.submitAuthorForm();
        });

        await test.step("Verify the user is redirected to the author details page", async () => {
            await expect(page).toHaveURL(/author\/\d+/);
        });

        await test.step("Verify the updated first name on the author details page", async () => {
            await expect(authorDetailPage.authorFullName).toContainText(updatedAuthor.firstName);
        });

        await test.step("Verify the updated last name on the author details page", async () => {
            await expect(authorDetailPage.authorFullName).toContainText(updatedAuthor.lastName);
        });

        await test.step("Verify the updated date of birth on the author details page", async () => {
            await expect(authorDetailPage.authorDobAndDod).toContainText(updatedAuthor.uiDob);
        });
    });

    test("Delete Author", async ({ page }) => {
        const authorListPage = new AuthorListPage(page);
        const authorFormPage = new AuthorFormPage(page);
        const authorDetailPage = new AuthorDetailPage(page);
        const authorDeleteConfirmationPage = new AuthorDeleteConfirmationPage(page);
        const author = createAuthor();
        let authorUrl: string;

        await test.step("Create an author", async () => {
            await authorListPage.navigateToAddNewAuthorPage();
            await authorFormPage.submitAuthorDetails(author.firstName, author.lastName, author.dob);
            authorUrl = page.url();
        });

        await test.step("Click the delete author button", async () => {
            await authorDetailPage.deleteAuthor();
        });

        await test.step("Verify the user is redirected to the delete author confirmation page", async () => {
            await expect(page).toHaveURL(/author\/\d+\/delete/);
            await expect(authorDeleteConfirmationPage.confirmationPageHeading).toHaveText("Delete Confirmation");
        });

        await test.step("Verify the name of the author to be deleted", async () => {
            await expect(authorDeleteConfirmationPage.authorFullName).toContainText(author.firstName);
            await expect(authorDeleteConfirmationPage.authorFullName).toContainText(author.lastName);
        });

        await test.step("Click the confirmation button", async () => {
            await authorDeleteConfirmationPage.confirmDelete();
        });

        await test.step("Verify user is redirected to the Author list page", async () => {
            await expect(page).toHaveURL(/authors/);
        });

        await test.step("Verify the author is deleted", async()=>{
            await page.goto(authorUrl);
            await expect(page.locator('h1')).toContainText("Not Found");
        });
    });
})