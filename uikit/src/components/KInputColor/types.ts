import type { KInputProps } from '../KInput';

/** `#rrggbb`, the format of `<input type="color">` */
export type KInputColorValue = string;

export type KInputColorProps = Pick<
  KInputProps,
  'disabled' | 'required' | 'size' | 'label' | 'placeholder' | 'className' | 'style'
> & {
  value: KInputColorValue;
  onChange?: (value: KInputColorValue) => void;
  /** `name` of the native color input, for forms */
  name?: string;
};
