import type { KIconProps } from '../KIcon';

export type KTitleAction = {
  icon?: KIconProps['name'];
  onClick?: () => void;
};

export type KTitleProps = {
  children?: React.ReactNode;
  actions?: KTitleAction[];
};
