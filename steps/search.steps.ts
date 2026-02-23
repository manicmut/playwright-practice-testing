import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am on the home page', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.waitForLoadState('networkidle');
});

When('I search for {string}', async ({ page }, searchTerm: string) => {
  await page.locator('[data-test="search-query"]').fill(searchTerm);
  await page.locator('[data-test="search-submit"]').click();
  await page.waitForLoadState('networkidle');
});

Then('I should see products in the results', async ({ page }) => {
  await page.waitForTimeout(1000);
  const count = await page.locator('[data-test^="product-"]:not([data-test="product-name"]):not([data-test="product-price"])').count();
  expect(count).toBeGreaterThan(0);
});

Then('I should see at least {int} product in the results', async ({ page }, minCount: number) => {
  await page.waitForTimeout(1000);
  const count = await page.locator('[data-test^="product-"]:not([data-test="product-name"]):not([data-test="product-price"])').count();
  expect(count).toBeGreaterThanOrEqual(minCount);
});

Then('I should see {int} products in the results', async ({ page }, expectedCount: number) => {
  await page.waitForTimeout(1000);
  const count = await page.locator('[data-test^="product-"]:not([data-test="product-name"]):not([data-test="product-price"])').count();
  expect(count).toBe(expectedCount);
});
