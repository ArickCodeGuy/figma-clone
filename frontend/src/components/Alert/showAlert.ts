import { store } from '../../store/store';
import { alertShown, type Alert } from '../../store/alerts';
import { AuthError } from '../../api/authController';
import { SketchRequestError } from '../../api/sketchesController';

type ShowAlertOptions = {
  title?: string;
  content?: string;
  /** ms, `0` keeps it until closed by hand. Default `ALERT_TIMEOUT` */
  timeout?: number;
};

function show(type: Alert['type'], options: ShowAlertOptions): void {
  store.dispatch(
    alertShown({
      type,
      title: options.title ?? '',
      content: options.content ?? '',
      timeout: options.timeout,
    }),
  );
}

export function showSuccessAlert(options: ShowAlertOptions): void {
  show('SUCCESS', options);
}

export function showWarningAlert(options: ShowAlertOptions): void {
  show('WARNING', options);
}

export function showErrorAlert(options: ShowAlertOptions): void {
  show('ERROR', options);
}

/**
 * Text for a failed request: the API's own message for known errors,
 * a generic one for network failures (`fetch` throws a `TypeError`)
 */
export function errorToMessage(err: unknown): string {
  if (err instanceof AuthError || err instanceof SketchRequestError) {
    return err.message;
  }
  return 'Could not reach the server';
}
