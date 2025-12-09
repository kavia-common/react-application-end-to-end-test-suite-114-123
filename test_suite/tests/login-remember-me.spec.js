/**
 * Implements Remember Me scenario from Excel:
 * - Rows/Case IDs: TC-LOGIN-REMEMBER-001
 * Tags: @login
 */
import { test } from '@playwright/test';
import users from './data/login-users.json';
import {
  navigateToLogin,
  setRememberMe,
  login,
  assertLoggedIn,
  getBaseURL
} from './utils/login-helpers';

test.describe('@login Remember Me', () => {
  test('@login can enable Remember Me and login', async ({ page, baseURL }) => {
    const u = users.valid[0];
    await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
    await setRememberMe(page, true, { iframe: false });
    await login(page, u.username, u.password, { iframe: false });
    await assertLoggedIn(page, { iframe: false });
  });

  test('@login can disable Remember Me and login', async ({ page, baseURL }) => {
    const u = users.valid[0];
    await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
    await setRememberMe(page, false, { iframe: false });
    await login(page, u.username, u.password, { iframe: false });
    await assertLoggedIn(page, { iframe: false });
  });
});
