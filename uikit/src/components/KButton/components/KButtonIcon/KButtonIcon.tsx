import { KIcon } from '../../../KIcon';
import type { KButtonIconProps } from './types';

// Used to have same leftIcon and rightIcon props and visuals
export function KButtonIcon(props?: KButtonIconProps) {
  if (!props?.icon) return <></>;

  const name = typeof props.icon === 'string' ? props.icon : props.icon.name;
  const size = typeof props.icon === 'object' ? props.icon.size : props.size;

  return <KIcon name={name} size={size} />;
}
