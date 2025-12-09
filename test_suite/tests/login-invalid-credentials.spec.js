/**
 * Implements Invalid Credentials scenarios from Excel:
 * - Rows/Case IDs: TC-LOGIN-INVALID-001, TC-LOGIN-INVALID-002
 * Tags: @login
 */
import { test } from '@playwright/test';
import users from './data/login-users.json';
import {
  navigateToLogin,
  login,
  assertError,
  getBaseURL
} from './utils/login-helpers';

test.describe('@login Invalid Credentials', () => {
  for (const u of users.invalidCredentials) {
    test(`@login invalid credentials show error (${u.caseId})`, async ({ page, baseURL }) => {
      await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
      await login(page, u.username, u.password, { iframe: false });
      await assertError(page, u.expectedError, { iframe: false });
    });
  }
});
