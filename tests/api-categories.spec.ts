import { test, expect } from '@playwright/test';
import { CategoriesApiService } from '../pages/api/CategoriesApiService';

test.describe('Categories API', () => {
  let categoriesApi: CategoriesApiService;

  test.beforeEach(({ request }) => {
    categoriesApi = new CategoriesApiService(request);
  });

  // ─── Get All Categories ──────────────────────────────────────────────────

  test('GET /categories — returns 200 with an array of categories', async () => {
    const response = await categoriesApi.getAllCategories();

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));  // pretty-printed JSON
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    console.log(`✅ Categories list OK — ${body.length} categories returned`);
  });

  test('GET /categories — each category has required fields', async () => {
    const response = await categoriesApi.getAllCategories();
    const body = await response.json();
    const category = body[0];

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('slug');
    console.log(`✅ Category schema OK — "${category.name}" (id: ${category.id})`);
  });

  test('GET /categories — includes sub-categories', async () => {
    const response = await categoriesApi.getAllCategories();
    const body = await response.json();

    const withSubCats = body.filter(
      (cat: { sub_categories?: unknown[] }) =>
        cat.sub_categories && (cat.sub_categories as unknown[]).length > 0
    );
    expect(withSubCats.length).toBeGreaterThan(0);
    console.log(`✅ Sub-categories present — ${withSubCats.length} categories have sub-categories`);
  });

  // ─── Get Category By ID ───────────────────────────────────────────────────

  test('GET /categories/{id} — returns 200 for a valid category ID', async () => {
    const categoryId = await categoriesApi.getFirstCategoryId();
    const response = await categoriesApi.getCategoryById(categoryId);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', categoryId);
    expect(body).toHaveProperty('name');
    console.log(`✅ Get by ID OK — "${body.name}" (${categoryId})`);
  });

  test('GET /categories/{id} — returns 404 for a non-existent category ID', async () => {
    const response = await categoriesApi.getCategoryById('non-existent-cat-000');

    expect(response.status()).toBe(404);
    console.log(`✅ Non-existent category ID correctly returns 404`);
  });

  test('GET /categories/{id} — returned category matches the requested ID', async () => {
    const allResponse = await categoriesApi.getAllCategories();
    const allBody = await allResponse.json();

    for (const cat of allBody.slice(0, 3)) {
      const response = await categoriesApi.getCategoryById(cat.id);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.id).toBe(cat.id);
      expect(body.name).toBe(cat.name);
    }
    console.log(`✅ Category ID consistency OK — first 3 categories verified`);
  });

  // ─── Category Tree ────────────────────────────────────────────────────────

  test('GET /categories/tree — returns nested category structure', async () => {
    const response = await categoriesApi.getCategoryTree();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    console.log(`✅ Category tree OK — ${body.length} root categories`);
  });
});
