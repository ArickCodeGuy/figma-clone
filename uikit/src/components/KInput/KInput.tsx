import { useEffect, useRef, type InputEvent } from 'react';
import { classNameArrayToString } from '../../utils';
import type { KInputProps, KInputSize } from './types';
import './styles.scss';

export function KInput(props: KInputProps) {
  const size: KInputSize = props.size || 'DEFAULT';

  const classNames = classNameArrayToString(['KInput', `KInput--size-${size}`]);

  const value = useRef<KInputProps['value']>(props.value);

  function handleInput(e: InputEvent<HTMLInputElement>): void {
    value.current = e.data;
    props.onInput?.(value.current);
  }

  useEffect(() => {
    value.current = props.value;
  }, [props.value]);

  return (
    <label className={classNames}>
      {props.label && <div className="KInput-label">{props.label}</div>}
      <input value={value.current} onInput={handleInput} />
    </label>
  );
}

export default KInput;
