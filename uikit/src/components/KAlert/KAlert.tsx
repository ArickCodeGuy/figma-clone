import type { KAlertProps, KAlertType } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KIcon } from '../KIcon';
import type { KIconNames } from '../KIcon/iconNames';
import { KButton } from '../KButton';

const ICONS: Record<KAlertType, KIconNames> = {
  SUCCESS: 'circle-check',
  WARNING: 'triangle-exclamation',
  ERROR: 'circle-exclamation',
};

export function KAlert(props: KAlertProps) {
  const type: KAlertType = props.type ?? 'SUCCESS';

  const classNames = classNameArrayToString([
    'KAlert',
    `KAlert--type-${type}`,
    props.className,
  ]);

  return (
    <div
      className={classNames}
      style={props.style}
      // Errors and warnings are announced right away, success politely
      role={type === 'SUCCESS' ? 'status' : 'alert'}
    >
      <span className="KAlert-icon" aria-hidden="true">
        <KIcon name={ICONS[type]} size={16} />
      </span>
      <div className="KAlert-content">
        {props.title && <div className="KAlert-title">{props.title}</div>}
        {props.children && (
          <div className="KAlert-message">{props.children}</div>
        )}
      </div>
      {props.onClose && (
        <KButton
          className="KAlert-close"
          type="button"
          title="Close"
          size="MINI"
          presetStyle="SECONDARY-TRANSPARENT"
          iconLeft="xmark"
          onClick={() => props.onClose?.()}
        />
      )}
    </div>
  );
}

export default KAlert;
