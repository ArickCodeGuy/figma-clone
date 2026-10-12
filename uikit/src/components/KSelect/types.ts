import type { KIconNames } from '../KIcon/iconNames';

export type KSelectValue = string | number;

export type KSelectOption<T extends KSelectValue = KSelectValue> = {
  value: T;
  /** Shown in the option and, when selected, in the field */
  label: string;
  /** {@link https://fontawesome.com/icons fontawesome.com} */
  icon?: KIconNames;
  disabled?: boolean;
};

export type KSelectProps<T extends KSelectValue = KSelectValue> = {
  options: KSelectOption<T>[];
  value?: T;
  /** Shown while nothing is selected */
  placeholder?: string;
  /** Text above the field */
  label?: string;
  disabled?: boolean;
  /** Opens the dropdown from outside */
  isOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: T) => void;
};
