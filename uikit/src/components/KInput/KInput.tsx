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
    <div className={classNames}>
      <input value={value.current} onInput={handleInput} />
    </div>
  );
}

export default KInput;
