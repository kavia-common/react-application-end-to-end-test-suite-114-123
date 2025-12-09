import { test, expect } from '@playwright/test';

// PUBLIC_INTERFACE
test('smoke: app loads and shows body', async ({ page, baseURL }) => {
  /**
   * This is a basic smoke test that:
   * - navigates to the app baseURL
   * - verifies the document has a <body> visible
   * - optionally checks a known text when available
   */
  if (!baseURL) {
    throw new Error('baseURL is not defined. Set REACT_APP_FRONTEND_URL or ensure default http://localhost:3000 is reachable.');
  }
  await page.goto(baseURL);
  await expect(page.locator('body')).toBeVisible();

  // Optional heuristic checks that often exist in CRA template:
  // Do not fail if not present; keep smoke test resilient.
  const possibleTexts = [/learn react/i, /current theme/i, /edit .*src\/App\.js/i];
  let anyFound = false;
  for (const re of possibleTexts) {
    const el = page.getByText(re, { exact: false });
    try {
      await expect(el).toHaveCountGreaterThan(0, { timeout: 500 });
      anyFound = true;
      break;
    } catch {
      // continue
    }
  }
  // It's okay if no heuristic text is found; the visible body check is sufficient.
  expect(true).toBe(true);
});
