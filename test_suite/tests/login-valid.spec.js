/**
 * Implements Valid Login scenarios from Excel:
 * - Rows/Case IDs: TC-LOGIN-VALID-001
 * Tags: @login
 */
import { test, expect } from '@playwright/test';
import users from './data/login-users.json';
import {
  navigateToLogin,
  login,
  setRememberMe,
  assertLoggedIn,
  getBaseURL
} from './utils/login-helpers';

test.describe('@login Valid Login', () => {
  // Data-driven: iterate valid users
  for (const u of users.valid) {
    test(`@login valid credentials succeed (${u.caseId})`, async ({ page, baseURL }) => {
      await test.step('Navigate to login', async () => {
        await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
      });

      await test.step('Optionally set Remember Me to true', async () => {
        await setRememberMe(page, true, { iframe: false });
      });

      await test.step('Login with valid credentials', async () => {
        await login(page, u.username, u.password, { iframe: false });
      });

      await test.step('Assert successful login redirect/landing', async () => {
        await assertLoggedIn(page, { iframe: false });
      });
    });
  }
});
