import { ROUTER_ROUTES } from './constants';
import type { QueryParams } from './types';

export function replaceRouteParams(
  route: keyof typeof ROUTER_ROUTES,
  params: QueryParams
): string {
  let url: string = ROUTER_ROUTES[route];

  for (const [key, val] of Object.entries(params)) {
    url = url.replace(':' + key, val);
  }

  return url;
}
