# react-application-end-to-end-test-suite-114-123

This workspace includes a `test_suite` React app configured with Playwright for end-to-end testing.

Quick start for E2E:
- cd into `test_suite`
- `npm install`
- `npm run playwright:install`
- Ensure your target app/URL is reachable. Set `BASE_URL` (preferred) or `REACT_APP_FRONTEND_URL` to the running instance.
- Run tests: `npm run test:e2e`
- View report: `npm run test:e2e:report`

Locator-mapping based tests:
- Primary spec: `tests/auth/login.spec.js`
- Page Object: `tests/pages/LoginPage.js`
- Env vars: `BASE_URL`, `E2E_USERNAME`, `E2E_PASSWORD` (see `.env.example`)

Environment:
- REACT_APP_FRONTEND_URL: Base URL that Playwright uses as target (defaults to http://localhost:3000)