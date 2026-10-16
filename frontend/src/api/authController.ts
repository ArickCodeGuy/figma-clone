import { components } from './schema';

export type AuthData = components['schemas']['AuthRequestDto'];

export function createAuthData(): AuthData {
  return {
    username: '',
    password: '',
  };
}

/** Returns JWT token */
async function login(data: AuthData): Promise<string> {
  return '';
}

/** Returns JWT token */
async function register(data: AuthData): Promise<string> {
  return '';
}

export const authController = {
  register,
  login,
};
