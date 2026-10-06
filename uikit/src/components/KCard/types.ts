import type { KButtonProps } from '../KButton/types';

export type KCardAction = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: KButtonProps['iconLeft'];
  description?: string;
};

export type KCardProps = {
  /** Url to image */
  img?: string;
  /** Displayed text at bottom */
  title: string;
  /** Creates `<a href={link} />` overlay */
  link?: string;
  /** title attribute of div with image in it */
  description?: string;
  /** Actions array. Displayed on top right. Max as `MAX_ACTIONS_ON_CARD` actions. By default is 4  */
  actions?: KCardAction[];
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
