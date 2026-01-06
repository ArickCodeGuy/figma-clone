import type { KButtonProps } from '../KButton/types';
import type { KIconNames } from '../KIcon/iconNames';

export type KListItem = Pick<KButtonProps, 'onClick' | 'title' | 'children'> & {
  name: KIconNames;
};

export type KListProps<T> = {
  component: React.ComponentType<T>;
  items?: T[];
  style?: React.CSSProperties;
};
