export type KInputSize = 'DEFAULT' | 'SMALL';

export type KInputValue = string;

export type KInputProps = {
  value: KInputValue;
  disabled?: boolean;
  readOnly?: boolean;
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
};
