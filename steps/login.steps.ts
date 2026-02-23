import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am on the login page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
});

When('I login with email {string} and password {string}', async ({ page }, email: string, password: string) => {
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
});

Then('I should be redirected to the {string} page', async ({ page }, expectedPage: string) => {
  await page.waitForURL(`**/${expectedPage}/**`, { timeout: 10000 });
  expect(page.url()).toContain(expectedPage);
});

Then('I should see the error message {string}', async ({ page }, expectedError: string) => {
  const errorMessage = page.locator('[data-test="login-error"]');
  await expect(errorMessage).toContainText(expectedError);
});
