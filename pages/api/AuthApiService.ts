import { APIRequestContext, APIResponse } from '@playwright/test';

const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
}

/**
 * AuthApiService - API Page Object for Authentication endpoints
 * Base URL: https://api.practicesoftwaretesting.com
 */
export class AuthApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /** POST /users/login — Login with email and password */
  async login(credentials: LoginCredentials): Promise<APIResponse> {
    return await this.request.post(`${API_BASE_URL}/users/login`, {
      data: credentials,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /** POST /users/register — Register a new user */
  async register(payload: RegisterPayload): Promise<APIResponse> {
    return await this.request.post(`${API_BASE_URL}/users/register`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /** GET /users/me — Get the authenticated user's profile */
  async getProfile(token: string): Promise<APIResponse> {
    return await this.request.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /** Helper: Login and return the bearer token */
  async getToken(credentials: LoginCredentials): Promise<string> {
    const response = await this.login(credentials);
    const body = await response.json();
    return body.access_token as string;
  }
}
