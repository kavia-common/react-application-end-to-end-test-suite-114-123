# react-application-end-to-end-test-suite-114-123

This workspace includes a `test_suite` React app configured with Playwright for end-to-end testing.

Quick start for E2E:
- cd into `test_suite`
- `npm install`
- `npm run playwright:install`
- Start your target app (default expected at http://localhost:3000) or set `REACT_APP_FRONTEND_URL` to a running instance.
- Run tests: `npm run test:e2e`
- View report: `npm run test:e2e:report`

Environment:
- REACT_APP_FRONTEND_URL: Base URL that Playwright uses as target (defaults to http://localhost:3000)