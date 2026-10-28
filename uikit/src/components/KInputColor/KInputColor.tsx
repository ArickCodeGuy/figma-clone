import { useEffect, useRef, useState } from 'react';
import type { KInputColorProps, KInputColorValue } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KInput } from '../KInput';

/**
 * Read-only `KInput` showing the color as text and a swatch.
 *
 * The native color input lies invisibly over the whole field, so a click anywhere
 * on it is a real click on that input and the browser opens its own picker.
 * Opening it with `showPicker()` from an invisible input is not reliable:
 * some browsers open the picker but never report the chosen color
 */
export function KInputColor(props: KInputColorProps) {
  const [value, setValue] = useState<KInputColorValue>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const picker = useRef<HTMLInputElement>(null);

  /** Keyboard path: the palette action is focusable, the overlay is not */
  function openPicker(): void {
    if (props.disabled || !picker.current) return;

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
