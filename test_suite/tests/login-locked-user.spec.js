/**
 * Implements Locked User scenarios from Excel:
 * - Rows/Case IDs: TC-LOGIN-LOCKED-001
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

test.describe('@login Locked User', () => {
  for (const u of users.lockedUsers) {
    test(`@login locked user sees account locked message (${u.caseId})`, async ({ page, baseURL }) => {
      await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
      await login(page, u.username, u.password, { iframe: false });
      await assertError(page, u.expectedError, { iframe: false });
    });
  }
});
