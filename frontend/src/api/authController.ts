import type { components } from './schema';

export type AuthData = components['schemas']['AuthRequestDto'];
type AuthResponse = components['schemas']['AuthResponseDto'];

const API_PREFIX = '/api/v1/auth';
const TOKEN_STORAGE_KEY = 'figma-clone:token';

export function createAuthData(): AuthData {
  return {
    username: '',
    password: '',
  };
}

/** Failed login/signup. `message` is ready to show to the user */
export class AuthError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(ERROR_MESSAGES[status] ?? ERROR_MESSAGES[0]);
    this.name = 'AuthError';
    this.status = status;
  }
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Enter username and password',
  401: 'Wrong username or password',
  409: 'This username is already taken',
  0: 'Something went wrong',
};

async function requestToken(path: string, data: AuthData): Promise<string> {
  const res = await fetch(`${API_PREFIX}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new AuthError(res.status);
  }

  const json = (await res.json()) as AuthResponse;
  if (!json.token) {
    throw new AuthError(res.status);
  }

  return json.token;
}

/** Logs in and returns the JWT token. Dispatch `loggedIn` with it. Throws `AuthError` */
async function login(data: AuthData): Promise<string> {
  return requestToken('/login', data);
}

/** Creates the user and returns the JWT token. Dispatch `loggedIn` with it. Throws `AuthError` */
async function register(data: AuthData): Promise<string> {
  return requestToken('/signup', data);
}

/** Stored token, for the initial `auth` Redux state. Use the store after that */
export function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null; // Storage is unavailable (e.g. blocked by the browser)
  }
}

/** Called by the store whenever `auth.token` changes */
export function writeToken(token: string | null): void {
  if (token === null) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } else {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

/**
 * Where `authHeaders` reads the token from. Set to the Redux `auth.token` in `store.ts`.
 * Not imported from the store directly: the store imports the API modules
 */
let getCurrentToken: () => string | null = () => null;

export function setTokenSource(getter: () => string | null): void {
  getCurrentToken = getter;
}

/** `Authorization` header for protected endpoints. Empty when logged out */
export function authHeaders(): Record<string, string> {
  const token = getCurrentToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authController = {
  register,
  login,
};
