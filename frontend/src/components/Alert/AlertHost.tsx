import { KAlert } from 'figmaclone-uikit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertClosed, selectAlerts, type Alert } from '../../store/alerts';
import './styles.scss';

/** All alerts of the app, newest at the bottom. Rendered once in `App`, see `showAlert` */
export function AlertHost() {
  const alerts = useSelector(selectAlerts);

  return (
    <div className="AlertHost" aria-live="polite">
      {alerts.map((alert) => (
        <AlertHostItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

function AlertHostItem({ alert }: { alert: Alert }) {
  const dispatch = useDispatch();
  const close = () => dispatch(alertClosed(alert.id));

  useEffect(() => {
    if (!alert.timeout) return;

    const timeoutId = setTimeout(close, alert.timeout);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.id, alert.timeout]);

  return (
    <KAlert type={alert.type} title={alert.title || undefined} onClose={close}>
      {alert.content || undefined}
    </KAlert>
  );
}
