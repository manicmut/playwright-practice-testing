import { test, expect } from '@playwright/test';
import { ProductsApiService } from '../pages/api/ProductsApiService';

test.describe('Products API', () => {
  let productsApi: ProductsApiService;

  test.beforeEach(({ request }) => {
    productsApi = new ProductsApiService(request);
  });

  // ─── Get All Products ────────────────────────────────────────────────────

  test('GET /products — returns 200 with paginated product list', async () => {
    const response = await productsApi.getAllProducts();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('current_page');
    expect(body).toHaveProperty('total');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    console.log(`✅ Products list OK — ${body.total} total products, page ${body.current_page}`);
  });

  test('GET /products — each product has required fields', async () => {
    const response = await productsApi.getAllProducts();
    const body = await response.json();
    const product = body.data[0];

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('in_stock');
    console.log(`✅ Product schema OK — "${product.name}" @ $${product.price}`);
  });

  test('GET /products — page 2 returns a different set of products', async () => {
    const page1Response = await productsApi.getAllProducts(1);
    const page2Response = await productsApi.getAllProducts(2);

    expect(page1Response.status()).toBe(200);
    expect(page2Response.status()).toBe(200);

    const page1Body = await page1Response.json();
    const page2Body = await page2Response.json();

    const page1Ids = page1Body.data.map((p: { id: string }) => p.id);
    const page2Ids = page2Body.data.map((p: { id: string }) => p.id);

    const overlap = page1Ids.filter((id: string) => page2Ids.includes(id));
    expect(overlap.length).toBe(0);
    console.log(`✅ Pagination OK — page 1 and page 2 have no overlapping products`);
  });

  // ─── Get Product By ID ────────────────────────────────────────────────────

  test('GET /products/{id} — returns 200 for a valid product ID', async () => {
    const productId = await productsApi.getFirstProductId();
    const response = await productsApi.getProductById(productId);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', productId);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('price');
    console.log(`✅ Get by ID OK — "${body.name}" (${productId})`);
  });

  test('GET /products/{id} — returns 404 for a non-existent product ID', async () => {
    const response = await productsApi.getProductById('non-existent-id-000');

    expect(response.status()).toBe(404);
    console.log(`✅ Non-existent product ID correctly returns 404`);
  });

  test('GET /products/{id} — product price is a positive number', async () => {
    const productId = await productsApi.getFirstProductId();
    const response = await productsApi.getProductById(productId);
    const body = await response.json();

    expect(typeof body.price).toBe('number');
    expect(body.price).toBeGreaterThan(0);
    console.log(`✅ Price validation OK — $${body.price}`);
  });

  // ─── Search Products ──────────────────────────────────────────────────────

  test('GET /products/search?q=hammer — returns matching products', async () => {
    const response = await productsApi.searchProducts('hammer');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);

    const names: string[] = body.data.map((p: { name: string }) => p.name.toLowerCase());
    const anyMatch = names.some(name => name.includes('hammer'));
    expect(anyMatch).toBe(true);
    console.log(`✅ Search "hammer" OK — found ${body.data.length} result(s)`);
  });

  test('GET /products/search?q=pliers — returns matching products', async () => {
    const response = await productsApi.searchProducts('pliers');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    console.log(`✅ Search "pliers" OK — found ${body.data.length} result(s)`);
  });

  test('GET /products/search?q=xyznonexistent — returns empty results', async () => {
    const response = await productsApi.searchProducts('xyznonexistent');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBe(0);
    console.log(`✅ Search with no results returns empty data array`);
  });

  // ─── Filter By Category ───────────────────────────────────────────────────

  test('GET /products?by_category — returns products for a valid category', async () => {
    // Get first product to extract a category ID
    const allResponse = await productsApi.getAllProducts();
    const allBody = await allResponse.json();
    const categoryId: string = allBody.data[0].category?.id;

    if (!categoryId) {
      console.log('⚠️ No category ID found on product — skipping filter test');
      return;
    }

    const response = await productsApi.getProductsByCategory(categoryId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    console.log(`✅ Category filter OK — ${body.data.length} product(s) in category ${categoryId}`);
  });
});
