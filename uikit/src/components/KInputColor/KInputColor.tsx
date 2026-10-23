import { useEffect, useRef, useState } from 'react';
import type { KInputColorProps, KInputColorValue } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KInput } from '../KInput';

/**
 * Read-only `KInput` showing the color as text and a swatch.
 * The palette action (or a click on the field) opens the native color picker
 */
export function KInputColor(props: KInputColorProps) {
  const [value, setValue] = useState<KInputColorValue>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const picker = useRef<HTMLInputElement>(null);

  function openPicker(): void {
    if (props.disabled || !picker.current) return;

    // `showPicker` keeps focus handling right, `click` is the fallback for older browsers
    if (typeof picker.current.showPicker === 'function') {
      picker.current.showPicker();
    } else {
      picker.current.click();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  }

  const classNames = classNameArrayToString([
    'KInputColor',
    props.disabled ? 'KInputColor--disabled' : undefined,
    props.className,
  ]);

  return (
    <div
      className={classNames}
      style={
        { '--k-input-color-value': value, ...props.style } as React.CSSProperties
      }
    >
      <KInput
        value={value}
        readOnly
        disabled={props.disabled}
        required={props.required}
        size={props.size}
        label={props.label}
        placeholder={props.placeholder}
        inputProps={{ onClick: openPicker }}
        actions={[
          { icon: 'palette', title: 'Choose color', onClick: openPicker },
        ]}
      />
      <span className="KInputColor-swatch" aria-hidden="true" />
      <input
        ref={picker}
        type="color"
        className="KInputColor-native"
        tabIndex={-1}
        aria-hidden="true"
        value={value}
        name={props.name}
        disabled={props.disabled}
        onChange={handleChange}
      />
    </div>
  );
}

export default KInputColor;
