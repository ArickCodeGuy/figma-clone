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

  setToken(json.token);
  return json.token;
}

/** Logs in, stores and returns the JWT token. Throws `AuthError` */
async function login(data: AuthData): Promise<string> {
  return requestToken('/login', data);
}

/** Creates the user, stores and returns the JWT token. Throws `AuthError` */
async function register(data: AuthData): Promise<string> {
  return requestToken('/signup', data);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function logout(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/** `Authorization` header for protected endpoints. Empty when logged out */
export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authController = {
  register,
  login,
  logout,
};
