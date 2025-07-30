import type { KButtonProps } from '../KButton/types';

export type KCardAction = {
  onClick: () => void;
  icon?: KButtonProps['iconLeft'];
  description?: string;
};

export type KCardProps = {
  img?: string;
  title: string;
  /** title of div with image in it */
  description?: string;
  actions?: KCardAction[];
  onBottomClick?: () => void;
};
