# Playwright E2E Suite (Mapping-based)

This folder contains Playwright JavaScript tests generated from kavia-docs/login-locators-mapping.md. It is independent of the React app code and targets a running environment specified via environment variables.

## Structure

- tests/auth/login.spec.js – Test cases derived from the mapping (TC-1, TC-2, TC-3)
- tests/pages/LoginPage.js – Page Object using the exact selectors from the mapping
- tests/fixtures/test-data.js – Utilities for base URL and credentials (from env)
- playwright.config.js – JS config enabling list + html reporters and env-driven baseURL

## Environment variables

- BASE_URL: Preferred base URL for the tests
- REACT_APP_FRONTEND_URL: Fallback base URL if BASE_URL is not set
- E2E_USERNAME: Username for login (do not hardcode secrets)
- E2E_PASSWORD: Password for login

You can provide them via your shell environment or a .env file (see .env.example).

## Install and run

From test_suite directory:

```bash
npm install
npm run playwright:install
```

Run tests:

```bash
# headless (default)
npx playwright test

# headed mode
npx playwright test --headed

# UI mode
npx playwright test --ui
```

Pass BASE_URL inline:

```bash
BASE_URL="https://app.leadsquared.com/Form/Edit?Id=..." npx playwright test
```

View HTML report:

```bash
npx playwright show-report
```

## Notes

- The mapping shows the login form inside an iframe `[data-testid="iframe"]`. The Page Object interacts with that frame accordingly.
- Some selectors are marked as TODO/Pending in the mapping (e.g., error toast, “Publish”, “Fields”). The tests use lenient checks until final selectors are provided.
- The nested preview frame name looks dynamic in real environments. Replace with a stable selector if available.
