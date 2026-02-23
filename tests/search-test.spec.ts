import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Product Search Tests', () => {
  
  test('Search for hammer', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.searchProduct('hammer');
    
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    console.log(`✅ Found ${count} products`);
  });  
});