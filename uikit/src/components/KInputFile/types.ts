import type { KInputProps } from '../KInput';

export type KInputFileProps = Pick<
  KInputProps,
  'disabled' | 'required' | 'size' | 'label' | 'className' | 'style'
> & {
  /** Selected files. Omit to let the component keep them itself */
  value?: File[];
  onChange?: (files: File[]) => void;
  /** Allowed types, same as `<input type="file" accept>`, e.g. `image/*,.json` */
  accept?: string;
  multiple?: boolean;
  /** Shown while nothing is selected */
  placeholder?: string;
  /** `name` of the native file input, for forms */
  name?: string;
};
