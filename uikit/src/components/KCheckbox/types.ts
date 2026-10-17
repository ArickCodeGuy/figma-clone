export type KCheckboxProps = {
  checked?: boolean;
  /** Text next to the box. Clicking it toggles the checkbox */
  label?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
};
