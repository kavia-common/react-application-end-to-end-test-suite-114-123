/**
 * Implements Empty Fields scenarios from Excel:
 * - Rows/Case IDs: TC-LOGIN-EMPTY-001, TC-LOGIN-EMPTY-002
 * Tags: @login
 */
import { test } from '@playwright/test';
import users from './data/login-users.json';
import {
  navigateToLogin,
  login,
  submitEmptyForm,
  assertError,
  getBaseURL
} from './utils/login-helpers';

test.describe('@login Empty Fields', () => {
  test(`@login both fields empty shows email required (${users.emptyFields[0].caseId})`, async ({ page, baseURL }) => {
    await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
    await submitEmptyForm(page, { iframe: false });
    await assertError(page, users.emptyFields[0].expectedError, { iframe: false });
  });

  test(`@login password missing shows password required (${users.emptyFields[1].caseId})`, async ({ page, baseURL }) => {
    await navigateToLogin(page, getBaseURL(baseURL), { iframe: false });
    await login(page, users.emptyFields[1].username, '', { iframe: false });
    await assertError(page, users.emptyFields[1].expectedError, { iframe: false });
  });
});
