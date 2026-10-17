import { useEffect, useState } from 'react';
import type { KCheckboxProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KIcon } from '../KIcon';

export function KCheckbox(props: KCheckboxProps) {
  const [checked, setChecked] = useState<boolean>(!!props.checked);
  useEffect(() => {
    setChecked(!!props.checked);
  }, [props.checked]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    props.onChange?.(e.target.checked, e);
  }

  const classNames = classNameArrayToString([
    'KCheckbox',
    checked ? 'KCheckbox--checked' : undefined,
    props.disabled ? 'KCheckbox--disabled' : undefined,
    props.className,
  ]);
  const requiredString = props.required ? ' *' : '';

  return (
    <label className={classNames} style={props.style} title={props.title}>
      <input
        type="checkbox"
        className="KCheckbox-input"
        checked={checked}
        required={props.required}
        disabled={props.disabled}
        name={props.name}
        value={props.value}
        onChange={handleChange}
      />
      <span className="KCheckbox-box" aria-hidden="true">
        <KIcon name="check" size={12} />
      </span>
      {props.label && (
        <span className="KCheckbox-label">{props.label + requiredString}</span>
      )}
    </label>
  );
}

export default KCheckbox;
