export type DelayedInvokeOptions = {
  timeout?: number;
};

/**
 * Delayed funciton invocation.
 *
 * Prevents multiple `fn` calls if invoced during specified timeout
 */
export function delayedInvoke(
  fn: () => void,
  options: DelayedInvokeOptions = {}
): () => void {
  const timeoutMs = options.timeout || 300;

  let timeoutId: NodeJS.Timeout;

  return function () {
    if (timeoutId) timeoutId.close();

    timeoutId = setTimeout(fn, timeoutMs);
  };
}
