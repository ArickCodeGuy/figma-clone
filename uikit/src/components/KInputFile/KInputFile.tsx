import { useEffect, useRef, useState } from 'react';
import type { KInputFileProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KInput, type KInputAction } from '../KInput';

const DEFAULT_PLACEHOLDER = 'No file chosen';

/**
 * Read-only `KInput` showing the selected file names.
 * The paperclip action (or a click on the field) opens the native file dialog,
 * the cross clears the selection
 */
export function KInputFile(props: KInputFileProps) {
  const [files, setFiles] = useState<File[]>(props.value ?? []);
  useEffect(() => {
    if (props.value) setFiles(props.value);
  }, [props.value]);

  const native = useRef<HTMLInputElement>(null);

  function openDialog(): void {
    if (props.disabled || !native.current) return;

    if (typeof native.current.showPicker === 'function') {
      native.current.showPicker();
    } else {
      native.current.click();
    }
  }

  function update(next: File[]): void {
    setFiles(next);
    props.onChange?.(next);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    update(Array.from(e.target.files ?? []));
  }

  function clear(): void {
    // Otherwise picking the same file again fires no `change`
    if (native.current) native.current.value = '';
    update([]);
  }

  const actions: KInputAction[] = [
    { icon: 'paperclip', title: 'Choose file', onClick: openDialog },
  ];
  if (files.length) {
    actions.push({ icon: 'xmark', title: 'Clear', onClick: clear });
  }

  const classNames = classNameArrayToString([
    'KInputFile',
    props.disabled ? 'KInputFile--disabled' : undefined,
    props.className,
  ]);

  return (
    <div className={classNames} style={props.style}>
      <KInput
        value={files.map((f) => f.name).join(', ')}
        readOnly
        disabled={props.disabled}
        required={props.required}
        size={props.size}
        label={props.label}
        placeholder={props.placeholder ?? DEFAULT_PLACEHOLDER}
        inputProps={{ onClick: openDialog }}
        actions={actions}
      />
      {/*
        Read-only fields are skipped by form validation, so `required` lives here.
        The browser points its "select a file" message at this input, under the field
      */}
      <input
        ref={native}
        type="file"
        className="KInputFile-native"
        tabIndex={-1}
        aria-hidden="true"
        accept={props.accept}
        multiple={props.multiple}
        name={props.name}
        required={props.required && !files.length}
        disabled={props.disabled}
        onChange={handleChange}
      />
    </div>
  );
}

export default KInputFile;
