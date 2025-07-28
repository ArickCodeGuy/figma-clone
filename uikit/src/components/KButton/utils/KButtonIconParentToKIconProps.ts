import type { KIconProps } from '../../KIcon';
import type { KButtonIconProps } from '../components/KButtonIcon/types';
import type { KButtonIconParent } from '../types';

export function KButtonIconParentToKButtonIconProps(
  icon?: KButtonIconParent,
  size?: KIconProps['size']
): KButtonIconProps | undefined {
  if (!icon) return;

  if (typeof icon === 'string') {
    return { icon, size };
  }

  return {
    icon: icon.name,
    size: icon.size || size,
  };
}
