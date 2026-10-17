import { useEffect, useState, type InputEvent } from 'react';
import { classNameArrayToString } from '../../utils';
import type { KInputProps, KInputSize } from './types';
import './styles.scss';

export function KInput(props: KInputProps) {
  const size: KInputSize = props.size || 'DEFAULT';
  const classNames = classNameArrayToString([
    'KInput',
    `KInput--size-${size}`,
    props.className,
  ]);
  const [value, setValue] = useState<KInputProps['value']>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function handleInput(e: InputEvent<HTMLInputElement>): void {
    if (props.readOnly) return;

    // `e.data` is only the inserted text (and `null` on delete), the field value is on the input
    const next = e.currentTarget.value;
    setValue(next);
    props.onInput?.(next);
    props.onChange?.(next);
  }

  const requiredString = props.required ? ' *' : '';

  return (
    <label className={classNames} style={props.style}>
      {props.label && (
        <div className="KInput-label">{props.label + requiredString}</div>
      )}
      <input
        {...props.inputProps}
        value={value}
        required={props.required}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onInput={handleInput}
      />
    </label>
  );
}

export default KInput;
