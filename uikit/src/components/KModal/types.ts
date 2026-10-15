export type KModalProps = {
  className?: string;
  style?: React.CSSProperties;
  isShown?: boolean;
  children?: React.ReactNode;
  close?: () => void;
};
