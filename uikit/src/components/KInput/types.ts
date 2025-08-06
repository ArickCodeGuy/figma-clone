export type KInputSize = 'DEFAULT' | 'SMALL' | 'MINI';

export type KInputProps = {
  value: string;
  size?: KInputSize;
  onInput?: (v: KInputProps['value']) => void;
};
