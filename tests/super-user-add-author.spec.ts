// spec: specs/author-management-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Author Management', () => {
  test('Super user can add an author', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // 1. Log in as super user and navigate to dashboard
    await loginPage.gotoLoginPage();
    await page.locator('input[type="text"]').pressSequentially('test_super');
    await page.locator('input[type="password"]').pressSequentially('Su-user1234');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/catalog\//);
    
    // 2. Navigate to the author management or authors section
    await page.locator('a[href="/catalog/authors/"]').click();
    await expect(page).toHaveURL('/catalog/authors/');
    await expect(page.locator('h1')).toContainText('Author List');
    
    // 3. Click the Add Author button or link
    await page.locator('a[href="/catalog/author/create/"]').click();
    await expect(page).toHaveURL('/catalog/author/create/');
    await expect(page.locator('text=Add New Author Form')).toBeVisible();
    
    // 4. Enter valid author information and submit the form
    await page.locator('input[name="first_name"]').fill('John');
    await page.locator('input[name="last_name"]').fill('Doe');
    await page.locator('input[name="date_of_birth"]').fill('1950-01-15');
    
    // Clear the date_of_death field that has default value
    await page.locator('input[name="date_of_death"]').fill('');
    
    // Submit the form by locating the submit button text
    await page.locator('button:has-text("Submit")').click();
    
    // Verify author was created successfully (redirected to detail page)
    await expect(page).toHaveURL(/\/catalog\/author\/\d+/);
    await expect(page.locator('h1:has-text("John Doe")')).toBeVisible();
    
    // Navigate back to authors list to verify the new author appears
    await page.locator('a[href="/catalog/authors/"]').click();
    await expect(page).toHaveURL('/catalog/authors/');
    await expect(page.locator('h5:has-text("John Doe")').first()).toBeVisible();
  });
});
