export type KInputSize = 'DEFAULT' | 'SMALL' | 'MINI';

export type KInputProps = {
  value: string;
  size?: KInputSize;
  label?: string;
  onInput?: (v: KInputProps['value']) => void;
};
