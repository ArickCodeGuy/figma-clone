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

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function () {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(fn, timeoutMs);
  };
}
