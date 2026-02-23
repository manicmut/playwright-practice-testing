import { APIRequestContext, APIResponse } from '@playwright/test';

const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

/**
 * CategoriesApiService - API Page Object for Categories endpoints
 * Base URL: https://api.practicesoftwaretesting.com
 */
export class CategoriesApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /** GET /categories — Get all categories (includes sub-categories) */
  async getAllCategories(): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/categories`);
  }

  /** GET /categories/{id} — Get a single category by ID */
  async getCategoryById(id: string): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/categories/${id}`);
  }

  /** GET /categories/tree — Get categories as a nested tree */
  async getCategoryTree(): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/categories/tree`);
  }

  /** Helper: Get the first category ID from the list */
  async getFirstCategoryId(): Promise<string> {
    const response = await this.getAllCategories();
    const body = await response.json();
    return body[0].id as string;
  }
}
