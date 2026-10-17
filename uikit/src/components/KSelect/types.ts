import type { KIconNames } from '../KIcon/iconNames';
import type { KInputProps } from '../KInput';

export type KSelectValue = string | number;

export type KSelectOption<T extends KSelectValue = KSelectValue> = {
  value: T;
  /** Shown in the option and, when selected, in the field */
  label: string;
  /** {@link https://fontawesome.com/icons fontawesome.com} */
  icon?: KIconNames;
  disabled?: boolean;
};

export type KSelectProps<T extends KSelectValue = KSelectValue> = Pick<
  KInputProps,
  'required' | 'placeholder' | 'label' | 'disabled'
> & {
  options: KSelectOption<T>[];
  value?: T;
  /** Text above the field */
  label?: KInputProps['label'];
  /** Opens the dropdown from outside */
  isOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: T) => void;
};
