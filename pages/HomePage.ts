import { Page, Locator, expect } from '@playwright/test';

/**
 * HomePage - Page Object for Home page
 */
export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly categoryFilters: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators for homepage elements
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productCards = page.locator('[data-test^="product-"]:not([data-test="product-name"]):not([data-test="product-price"])');
    this.categoryFilters = page.locator('[data-test="nav-categories"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
  }

  /**
   * Navigate to homepage
   */
  async gotoHomePage() {
    await this.page.goto('https://practicesoftwaretesting.com');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Search for product
   */
  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    await this.page.waitForTimeout(1000); // Wait for results to load
    return await this.productCards.count();
  }

  /**
   * Click on product by index
   */
  async clickProduct(index: number) {
    await this.productCards.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify homepage is loaded
   */
  async verifyHomePageLoaded() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  /**
   * Get product name by index
   */
  async getProductName(index: number): Promise<string> {
    const product = this.productCards.nth(index);
    const name = product.locator('[data-test="product-name"]');
    return await name.textContent() || '';
  }

  /**
   * Get product price by index
   */
  async getProductPrice(index: number): Promise<string> {
    const product = this.productCards.nth(index);
    const price = product.locator('[data-test="product-price"]');
    return await price.textContent() || '';
  }
}
