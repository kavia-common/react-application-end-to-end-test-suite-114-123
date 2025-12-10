const { defineConfig, devices } = require('@playwright/test');

/**
 * PUBLIC_INTERFACE
 * Playwright configuration (JavaScript) for running the mapping-derived E2E tests.
 * - testDir: tests
 * - reporter: list + html
 * - retries: 1 (2 in CI)
 * - baseURL: from env BASE_URL or REACT_APP_FRONTEND_URL (fallback http://localhost:3000)
 * - headed: false by default
 */
const isCI = !!process.env.CI;
const baseURL =
  (process.env.BASE_URL && process.env.BASE_URL.trim()) ||
  (process.env.REACT_APP_FRONTEND_URL && process.env.REACT_APP_FRONTEND_URL.trim()) ||
  'http://localhost:3000';

module.exports = defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  retries: isCI ? 2 : 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
