# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## End-to-End (E2E) Tests with Playwright

This repository is configured with Playwright to run E2E tests against a running instance of the app.

- Config file: `playwright.config.ts`
- Tests directory: `tests/`
- Example spec: `tests/example.spec.ts`
- Default baseURL: `process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'`
- Projects: Chromium, Firefox, WebKit
- Reporter: HTML (view reports via `npm run test:e2e:report`)

### Install dependencies and browsers

```bash
npm install
npm run playwright:install
```

If your environment restricts automatic postinstall scripts, run the install command explicitly.

### Running tests locally

Ensure the app you want to test is running and reachable at the URL pointed to by `REACT_APP_FRONTEND_URL`. For the local dev server:

```bash
# In one terminal
npm start

# In another terminal, run tests (headless by default)
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run headed (non-headless) browser
npm run test:e2e:headed

# View the last HTML report
npm run test:e2e:report
```

To target a different URL:

```bash
REACT_APP_FRONTEND_URL="http://localhost:3001" npm run test:e2e
```

### Running in CI

Set `REACT_APP_FRONTEND_URL` to the deployed URL for the environment. Retries are enabled (2) in CI automatically.

```bash
export REACT_APP_FRONTEND_URL="https://your-deployed-app.example.com"
npm ci
npm run playwright:install
npm run test:e2e
```

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
