import type { KButtonProps } from '../KButton/types';

export type KCardAction = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: KButtonProps['iconLeft'];
  description?: string;
};

export type KCardProps = {
  img?: string;
  /** Displayed text at bottom */
  title: string;
  /** Creates `<a href={link} />` overlay */
  link?: string;
  /** title attribute of div with image in it */
  description?: string;
  actions?: KCardAction[];
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
