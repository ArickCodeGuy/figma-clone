import type { KButtonProps } from '../KButton';

export type KTitleAction = Pick<KButtonProps, 'iconLeft' | 'onClick'>;

export type KTitleProps = {
  children?: React.ReactNode;
  actions?: KTitleAction[];
};
