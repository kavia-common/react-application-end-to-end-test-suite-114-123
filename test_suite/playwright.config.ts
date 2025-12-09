import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for running E2E tests against the React app.
 * - testDir: tests
 * - reporter: html
 * - timeouts: 30s default, 5s expect
 * - parallel: fully parallel
 * - retries: 2 in CI
 * - baseURL: REACT_APP_FRONTEND_URL or http://localhost:3000
 * - trace/screenshot/video options as requested
 */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: 'tests',
  reporter: 'html',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  use: {
    baseURL: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
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
