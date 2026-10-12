import type React from 'react';
import type { KIconNames } from '../KIcon/iconNames';
import type { KIconProps } from '../KIcon';

export type KButtonSizes = 'DEFAULT' | 'MINI';

export type KButtonIconParent = KIconNames | KIconProps;

export type KButtonPresetStyles =
  | 'DEFAULT'
  | 'SECONDARY'
  | 'TRANSPARENT'
  | 'SECONDARY-TRANSPARENT';

export type KButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  size?: KButtonSizes;
  className?: string;
  iconLeft?: KButtonIconParent;
  iconRight?: KButtonIconParent;
  title?: string;
  presetStyle?: KButtonPresetStyles;
  style?: React.CSSProperties;
};
