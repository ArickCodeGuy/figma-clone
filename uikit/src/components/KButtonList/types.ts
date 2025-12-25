import type { KButtonProps } from '../KButton/types';
import type { KIconNames } from '../KIcon/iconNames';

export type KButtonListItem = Pick<
  KButtonProps,
  'onClick' | 'title' | 'children'
> & {
  name: KIconNames;
};

export type KButtonListProps = Pick<KButtonProps, 'size'> & {
  items?: KButtonListItem[];
  style?: React.CSSProperties;
};
