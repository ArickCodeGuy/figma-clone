import { KIcon } from '../../../KIcon';
import type { KButtonIconProps } from './types';

export function KButtonIcon(props?: KButtonIconProps) {
  if (!props?.icon) return <></>;

  const name = typeof props.icon === 'string' ? props.icon : props.icon.name;
  const size = typeof props.icon === 'object' ? props.icon.size : props.size;

  return <KIcon name={name} size={size} />;
}
