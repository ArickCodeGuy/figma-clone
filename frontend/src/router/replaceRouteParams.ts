import { ROUTER_ROUTES } from './constants';

export type RouteName = keyof typeof ROUTER_ROUTES;

/** `'/sketch/:id/:tab'` -> `'id' | 'tab'`. `never` for routes without params */
type ParamNames<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParamNames<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

/** Params of `route`, e.g. `{ id: string | number }` for `SKETCH`. `{}` for `HOME` */
export type RouteParams<R extends RouteName> = {
  [K in ParamNames<(typeof ROUTER_ROUTES)[R]>]: string | number;
};

/** `params` is required for routes with params and not allowed for routes without */
type RouteParamsArgs<R extends RouteName> = [
  ParamNames<(typeof ROUTER_ROUTES)[R]>,
] extends [never]
  ? []
  : [params: RouteParams<R>];

/**
 * Url of `route` with its params filled in
 *
 * @example
 * replaceRouteParams('HOME'); // '/'
 * replaceRouteParams('SKETCH', { id: 5 }); // '/sketch/5'
 */
export function replaceRouteParams<R extends RouteName>(
  route: R,
  ...[params]: RouteParamsArgs<R>
): string {
  let url: string = ROUTER_ROUTES[route];

  for (const [key, val] of Object.entries(params ?? {})) {
    url = url.replace(':' + key, encodeURIComponent(String(val)));
  }

  return url;
}
