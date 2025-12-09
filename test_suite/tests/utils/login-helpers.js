import { expect } from '@playwright/test';

/**
 * Helpers for login workflow tests.
 * Selectors are centralized to reference the mapping (kavia-docs/docs/login-locators-mapping.md).
 * Note: Some selectors in the provided raw mapping use nested iframes. We expose a general
 * approach that supports both direct DOM and iframe-hosted login forms.
 */

// PUBLIC_INTERFACE
export const getBaseURL = (baseURLFromFixture) => {
  /** Get base URL from process env (REACT_APP_FRONTEND_URL) or the Playwright baseURL fixture, or default. */
  const envUrl = process.env.REACT_APP_FRONTEND_URL;
  return envUrl || baseURLFromFixture || 'http://localhost:3000';
};

/**
 * The locator mapping.
 * If your app renders login inside nested iframes, set options.iframe=true to use frame locators.
 * Otherwise, we try direct page locators first and fall back to iframes if specified.
 *
 * The raw selectors sample provided references:
 * - [data-testid="iframe"] as container for a contentFrame
 * - Inside it, getByTestId('lsq-form-field-input-test') for both email and password
 * - Buttons by role name 'Continue'
 * Adjust names/text to your real app where necessary; tests will use these consistently.
 */
export const loginSelectors = {
  containerIframe: '[data-testid="iframe"]',
  // Generic field in mapping is 'lsq-form-field-input-test'; we expose separate getters by semantic purpose
  emailTestId: 'lsq-form-field-input-test',
  passwordTestId: 'lsq-form-field-input-test',
  continueButtonName: 'Continue',
  // Additional commonly used elements for scenarios:
  errorAlertRole: 'alert',
  errorTextLocator: (message) => `text=${message}`,
  rememberMeCheckbox: '[data-testid="remember-me"]',
  forgotPasswordLink: 'text=/forgot password/i',
  passwordVisibilityToggle: '[data-testid="password-visibility-toggle"]',
  // Optional success indicator for valid login (placeholder)
  userHomeHeading: 'role=heading[name=/dashboard|home|welcome/i]'
};

/**
 * Resolve a locator possibly inside an iframe.
 * If options.iframe is true, we will enter the first-level frame from containerIframe and return a frame locator.
 */
function resolveScope(page, options) {
  const useIframe = options?.iframe === true;
  if (!useIframe) return page;

  // Chain frame locators similar to the raw mapping example.
  const firstFrame = page.frameLocator(loginSelectors.containerIframe);
  return firstFrame;
}

/**
 * Navigate to login page.
 */
// PUBLIC_INTERFACE
export async function navigateToLogin(page, baseURL, options = { iframe: false }) {
  const url = getBaseURL(baseURL);
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  // If login is not at root, update this to the actual login path:
  // await page.goto(`${url}/login`);
  // Visibility check is resilient:
  const scope = resolveScope(page, options);
  // Heuristic: either email field or a heading like "Login"
  const emailField = scope.getByTestId(loginSelectors.emailTestId);
  try {
    await expect(emailField).toBeVisible({ timeout: 5000 });
  } catch {
    // Fall back to common login heading text without failing hard
    const anyLoginText = scope.getByText(/login|sign in/i);
    await expect(anyLoginText).toBeVisible({ timeout: 5000 });
  }
}

/**
 * Perform login with username/password (data-driven).
 * Will click Continue after each step if button exists per mapping.
 */
// PUBLIC_INTERFACE
export async function login(page, username, password, options = { iframe: false }) {
  const scope = resolveScope(page, options);

  const emailField = scope.getByTestId(loginSelectors.emailTestId);
  await expect(emailField).toBeVisible();
  await emailField.click();
  await emailField.fill(username ?? '');

  const continueEmail = scope.getByRole('button', { name: loginSelectors.continueButtonName });
  if (await continueEmail.isVisible().catch(() => false)) {
    await continueEmail.click();
  }

  const passwordField = scope.getByTestId(loginSelectors.passwordTestId);
  await expect(passwordField).toBeVisible();
  await passwordField.click();
  await passwordField.fill(password ?? '');

  const continuePwd = scope.getByRole('button', { name: loginSelectors.continueButtonName });
  if (await continuePwd.isVisible().catch(() => false)) {
    await continuePwd.click();
  }
}

/**
 * Assert error message visibility.
 */
// PUBLIC_INTERFACE
export async function assertError(page, message, options = { iframe: false }) {
  const scope = resolveScope(page, options);
  // Prefer role='alert' if present; otherwise fallback to text search
  const alert = scope.getByRole(loginSelectors.errorAlertRole).filter({ hasText: message });
  if (await alert.count().catch(() => 0)) {
    await expect(alert.first()).toBeVisible();
    return;
  }
  await expect(scope.locator(loginSelectors.errorTextLocator(message))).toBeVisible();
}

/**
 * Toggle password visibility if control exists.
 */
// PUBLIC_INTERFACE
export async function togglePasswordVisibility(page, options = { iframe: false }) {
  const scope = resolveScope(page, options);
  const toggle = scope.locator(loginSelectors.passwordVisibilityToggle);
  await expect(toggle).toBeVisible({ timeout: 5000 });
  await toggle.click();
}

/**
 * Submit empty form - covers cases where forms allow submit without filling.
 */
// PUBLIC_INTERFACE
export async function submitEmptyForm(page, options = { iframe: false }) {
  const scope = resolveScope(page, options);
  const continueBtn = scope.getByRole('button', { name: loginSelectors.continueButtonName });
  await expect(continueBtn).toBeVisible();
  await continueBtn.click();
}

/**
 * Start forgot password flow.
 */
// PUBLIC_INTERFACE
export async function startForgotPasswordFlow(page, options = { iframe: false }) {
  const scope = resolveScope(page, options);
  const link = scope.locator(loginSelectors.forgotPasswordLink);
  await expect(link).toBeVisible({ timeout: 5000 });
  await link.click();
}

/**
 * Check remember me if present.
 */
// PUBLIC_INTERFACE
export async function setRememberMe(page, value = true, options = { iframe: false }) {
  const scope = resolveScope(page, options);
  const cb = scope.locator(loginSelectors.rememberMeCheckbox);
  if (await cb.isVisible().catch(() => false)) {
    const checked = await cb.isChecked().catch(() => false);
    if (value && !checked) await cb.check();
    if (!value && checked) await cb.uncheck();
  }
}

/**
 * Assert successful login - placeholder selector tries to detect a landing page heading.
 */
// PUBLIC_INTERFACE
export async function assertLoggedIn(page, options = { iframe: false }) {
  // On success, many apps redirect to a dashboard/home.
  // We check for any heading matching common names to keep it generic and idempotent.
  await expect(page.locator(loginSelectors.userHomeHeading)).toBeVisible({ timeout: 10000 });
}
