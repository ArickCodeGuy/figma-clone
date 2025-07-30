import type { QueryParams } from './types';

export function queryParamsToString(query: QueryParams): string {
  if (!Object.keys(query).length) return '';

  const arr: string[] = [];

  for (const [key, value] of Object.entries(query)) {
    arr.push(`${key}=${String(value)}`);
  }

  return '?' + arr.join('&');
}
