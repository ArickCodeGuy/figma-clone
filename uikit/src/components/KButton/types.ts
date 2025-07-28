import type React from 'react';
import type { KIconNames } from '../KIcon/iconNames';
import type { KIconProps } from '../KIcon';

export type KButtonSizes = 'DEFAULT' | 'MINI';

export type KButtonIconParent = KIconNames | KIconProps;

export type KButtonProps = {
  children?: React.ReactNode;
  /** some comment */
  onClick?: () => void;
  size?: KButtonSizes;
  className?: string;
  iconLeft?: KButtonIconParent;
  iconRight?: KButtonIconParent;
  title?: string;
};
