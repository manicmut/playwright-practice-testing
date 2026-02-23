import { test, expect } from '@playwright/test';
import { AuthApiService } from '../pages/api/AuthApiService';

const ADMIN = { email: 'admin@practicesoftwaretesting.com', password: 'welcome01' };
const CUSTOMER = { email: 'customer@practicesoftwaretesting.com', password: 'welcome01' };

test.describe('Auth API', () => {
  let authApi: AuthApiService;

  test.beforeEach(({ request }) => {
    authApi = new AuthApiService(request);
  });

  // ─── Login ────────────────────────────────────────────────────────────────

  test('POST /users/login — admin login returns 200 with access token', async () => {
    const response = await authApi.login(ADMIN);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    expect(body).toHaveProperty('token_type', 'bearer');
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
    console.log(`✅ Admin login OK — token: ${body.access_token.substring(0, 20)}...`);
  });

  test('POST /users/login — customer login returns 200 with access token', async () => {
    const response = await authApi.login(CUSTOMER);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    expect(typeof body.access_token).toBe('string');
    console.log(`✅ Customer login OK`);
  });

  test('POST /users/login — invalid password returns 401', async () => {
    const response = await authApi.login({
      email: CUSTOMER.email,
      password: 'wrongpassword',
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    console.log(`✅ Invalid password rejected — error: ${body.error}`);
  });

  test('POST /users/login — unknown email returns 401', async () => {
    const response = await authApi.login({
      email: 'nobody@unknown.com',
      password: 'welcome01',
    });

    expect(response.status()).toBe(401);
    console.log(`✅ Unknown email rejected`);
  });

  test('POST /users/login — empty email returns 422', async () => {
    const response = await authApi.login({ email: '', password: 'welcome01' });

    expect(response.status()).toBe(422);
    console.log(`✅ Empty email returns validation error`);
  });

  test('POST /users/login — empty password returns 422', async () => {
    const response = await authApi.login({ email: CUSTOMER.email, password: '' });

    expect(response.status()).toBe(422);
    console.log(`✅ Empty password returns validation error`);
  });

  // ─── Profile ──────────────────────────────────────────────────────────────

  test('GET /users/me — returns profile for authenticated user', async () => {
    const token = await authApi.getToken(CUSTOMER);
    const response = await authApi.getProfile(token);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('email', CUSTOMER.email);
    expect(body).toHaveProperty('first_name');
    expect(body).toHaveProperty('last_name');
    console.log(`✅ Profile OK — ${body.first_name} ${body.last_name} <${body.email}>`);
  });

  test('GET /users/me — returns 401 without token', async ({ request }) => {
    const response = await request.get('https://api.practicesoftwaretesting.com/users/me');

    expect(response.status()).toBe(401);
    console.log(`✅ Unauthenticated profile request correctly rejected`);
  });

  test('GET /users/me — returns 401 with invalid token', async () => {
    const response = await authApi.getProfile('invalid.token.here');

    expect(response.status()).toBe(401);
    console.log(`✅ Invalid token correctly rejected`);
  });
});
