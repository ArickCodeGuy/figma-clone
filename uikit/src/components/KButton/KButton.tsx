import type { KButtonProps, KButtonSizes } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KBUTTON_ICON_SIZES } from './constants';
import { KButtonIcon } from './components/KButtonIcon/KButtonIcon';
import type { KIconProps } from '../KIcon';
import { KButtonIconParentToKButtonIconProps } from './utils/KButtonIconParentToKIconProps';

export function KButton(props: KButtonProps) {
  const size: KButtonSizes = props.size ?? 'DEFAULT';

  const className = classNameArrayToString([
    'KButton',
    `KButton--size-${size}`,
    props.className,
  ]);

  const iconSize: KIconProps['size'] = KBUTTON_ICON_SIZES[size];

  return (
    <button className={className} title={props.title} onClick={props.onClick}>
      <KButtonIcon
        {...KButtonIconParentToKButtonIconProps(props.iconLeft, iconSize)}
      />

      {props.children && <span>{props.children}</span>}

      <KButtonIcon
        {...KButtonIconParentToKButtonIconProps(props.iconRight, iconSize)}
      />
    </button>
  );
}

export default KButton;
