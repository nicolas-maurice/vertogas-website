/* API Resources */
/* Auth API base URL */
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const AUTH_API_BASE_URL = `${API_BASE_URL}/auth`;

/* Auth Resources */
export const LOAD_AUTH_RESOURCE = 'loadAuth';
export const LOGIN_RESOURCE = 'login';
export const POWER_PLANTS_RESOURCE = 'powerPlants';
export const TOKENS_RESOURCE = 'tokens';
export const LOGS_RESOURCE = 'logs';
export const LOGOUT_RESOURCE = 'logout';

export const PARITY_URL = process.env.REACT_APP_PARITY_URL;
export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;