import { APIRequestContext, APIResponse } from '@playwright/test';

const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

/**
 * ProductsApiService - API Page Object for Products endpoints
 * Base URL: https://api.practicesoftwaretesting.com
 */
export class ProductsApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /** GET /products — Get paginated list of all products */
  async getAllProducts(page = 1): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/products`, {
      params: { page },
    });
  }

  /** GET /products/{id} — Get a single product by ID */
  async getProductById(id: string): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/products/${id}`);
  }

  /** GET /products/search?q={query} — Search products by keyword */
  async searchProducts(query: string): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/products/search`, {
      params: { q: query },
    });
  }

  /** GET /products?by_category={categoryId} — Filter products by category */
  async getProductsByCategory(categoryId: string): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/products`, {
      params: { by_category: categoryId },
    });
  }

  /** Helper: Get the first product ID from the product list */
  async getFirstProductId(): Promise<string> {
    const response = await this.getAllProducts();
    const body = await response.json();
    return body.data[0].id as string;
  }
}
