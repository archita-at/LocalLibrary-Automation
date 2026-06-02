import { test, expect } from '@playwright/test';
import { superUser, staffUser, readerUser } from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LogoutPage } from '../pages/LogoutPage';

test.beforeEach("Launch login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
});

test.describe("Login module", () => {

    test('Super user login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step("Login via Super User", async () => {
            await loginPage.login(superUser.username, superUser.password)
        });
        await test.step('Verify username on the dashboard', async () => {
            await expect(dashboardPage.username).toHaveText(superUser.username)
        });
        await test.step('Verify the staff section is not visible', async () => {
            await expect(dashboardPage.staffSection).not.toBeVisible()
        });
    });

    test('Staff user login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step("Login via Staff User", async () => {
            await loginPage.login(staffUser.username, staffUser.password)
        });
        await test.step('Verify username on the dashboard', async () => {
            await expect(dashboardPage.username).toHaveText(staffUser.username)
        });
        await test.step('Verify staff section is visible', async () => {
            await expect(dashboardPage.staffSection).toBeVisible()
        });
    });

    test('Reader user login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step("Login via Reader User", async () => {
            await loginPage.login(readerUser.username, readerUser.password)
        });
        await test.step('Verify username on the dashboard', async () => {
            await expect(dashboardPage.username).toHaveText(readerUser.username)
        });
        await test.step('Verify the staff section is not visible', async () => {
            await expect(dashboardPage.staffSection).not.toBeVisible()
        });
    });

    test('Empty username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step("Login with empty username", async () => {
            await loginPage.login("", readerUser.password)
        });

        await test.step("Verify validation message", async () => {
            const validationMessage = await loginPage.usernameValidation();
            expect(validationMessage).toContain('fill')
        })
    });

    test('Empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step("Login with empty password", async () => {
            await loginPage.login(readerUser.username, "")
        });

        await test.step("Verify validation message", async () => {
            const validationMessage = await loginPage.passwordValidation();
            expect(validationMessage).toContain('fill')
        })
    });

    test('Empty username & password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step("Login with empty username & password", async () => {
            await loginPage.login("", "");
        });

        await test.step("Verify validation message", async () => {
            const validationMessage = await loginPage.usernameValidation();
            expect(validationMessage).toContain('fill');
        })
    });

    test('Incorrect username & password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step("Login with incorrect username & password", async () => {
            await loginPage.login(superUser.username, readerUser.password);
        });

        await test.step("Verify the error message", async () => {
            await expect(loginPage.errorMessage).toHaveText("Your username and password didn't match. Please try again.")
        })
    });

});

test.describe('Logout module', () => {

    test('Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const logoutPage = new LogoutPage(page);

        await test.step("Login with correct username & password", async () => {
            await loginPage.login(readerUser.username, readerUser.password);
        });

        await test.step("Click the logout button", async () => {
            await dashboardPage.logout();
        });

        await test.step("Verify the logout URL", async () => {
            await expect(page).toHaveURL('/accounts/logout/')
        });

        await test.step("Verify the Logged out message", async () => {
            await expect(logoutPage.logoutMessage).toHaveText("Logged out!")
        });

        await test.step("Verify the relogin link", async () => {
            await expect(logoutPage.reloginLink).toBeVisible();
        });

        await test.step("Verify the username should not be visible", async () => {
            await expect(dashboardPage.username).not.toBeVisible();
        });

        await test.step("Verify the logout button should not be visible", async () => {
            await expect(dashboardPage.logoutButton).not.toBeVisible();
        });

        await test.step("Verify the login button should be visible", async () => {
            await expect(dashboardPage.loginSignupButton).toBeVisible();
        });
    });
})