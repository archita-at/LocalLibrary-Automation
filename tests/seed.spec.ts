import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });
});
