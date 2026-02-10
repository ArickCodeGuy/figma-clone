import type { KIconProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';

export function KIcon(props: KIconProps) {
  const classNames = classNameArrayToString([
    'KIcon',
    'fa-solid',
    `fa-${props.name}`,
  ]);

  const size = (props.size || 10) + 'px';

  return (
    <i
      className={classNames}
      style={{ '--size': size } as React.CSSProperties}
    />
  );
}

export default KIcon;
