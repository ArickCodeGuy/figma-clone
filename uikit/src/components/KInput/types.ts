import type { KIconNames } from '../KIcon/iconNames';

export type KInputSize = 'DEFAULT' | 'SMALL';

export type KInputValue = string;

/** Mini button inside the field, on the right */
export type KInputAction = {
  icon?: KIconNames;
  /** Tooltip and accessible name of the button */
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export type KInputProps = {
  value: KInputValue;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: KInputSize;
  onInput?: (v: KInputValue) => void;
  /** Shown while nothing is selected */
  placeholder?: string;
  /** Text above the field */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Extra attributes for the inner `<input>` (role, aria-*, handlers). Props above take priority */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'value'
    | 'placeholder'
    | 'disabled'
    | 'readOnly'
    | 'onInput'
    | 'onChange'
    | 'name'
  >;
  onChange?: (value: KInputValue) => void;
  actions?: KInputAction[];
};
