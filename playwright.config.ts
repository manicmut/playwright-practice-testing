import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: './features/*.feature',
  steps: './steps/*.steps.ts',
});

export default defineConfig({
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    // ── BDD tests (Gherkin feature files) ──────────────────────────────────
    {
      name: 'bdd',
      testDir: bddTestDir,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://practicesoftwaretesting.com',
      },
    },

    // ── Page Object Model UI tests ─────────────────────────────────────────
    {
      name: 'pom',
      testDir: './tests',
      testMatch: /(?!api-).*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://practicesoftwaretesting.com',
      },
    },

    // ── API tests ──────────────────────────────────────────────────────────
    {
      name: 'api',
      testDir: './tests',
      testMatch: /api-.*\.spec\.ts/,
      use: {
        baseURL: 'https://api.practicesoftwaretesting.com',
      },
    },
  ],
});
