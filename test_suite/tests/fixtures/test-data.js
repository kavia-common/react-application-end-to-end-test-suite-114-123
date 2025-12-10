export const getBaseUrl = () => {
  return process.env.BASE_URL?.trim()
    || process.env.REACT_APP_FRONTEND_URL?.trim()
    || 'http://localhost:3000';
};

export const getCredentials = () => {
  // PUBLIC_INTERFACE
  /**
   * Returns login credentials taken from environment or placeholder defaults.
   * DO NOT hardcode secrets; replace via env variables in CI/local.
   */
  const username = process.env.E2E_USERNAME || 'testuser_demo2@lsqdev.in'; // placeholder from mapping
  const password = process.env.E2E_PASSWORD || 'Qwerty1@'; // placeholder from mapping
  return { username, password };
};
