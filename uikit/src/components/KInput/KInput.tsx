import { useEffect, useState, type InputEvent } from 'react';
import { classNameArrayToString } from '../../utils';
import type { KInputAction, KInputProps, KInputSize } from './types';
import './styles.scss';
import { KButton } from '../KButton';

export function KInput(props: KInputProps) {
  const size: KInputSize = props.size || 'DEFAULT';
  const classNames = classNameArrayToString([
    'KInput',
    `KInput--size-${size}`,
    props.actions?.length ? 'KInput--with-actions' : undefined,
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

  function handleActionClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: KInputAction,
  ): void {
    e.stopPropagation();
    action.onClick?.();
  }

  return (
    <label
      className={classNames}
      style={
        {
          '--k-input-actions-count': props.actions?.length ?? 0,
          ...props.style,
        } as React.CSSProperties
      }
    >
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

      {props.actions?.length ? (
        <div className="KInputActions">
          {props.actions.map((action, idx) => (
            <KButton
              key={action.title ?? idx}
              // Not `submit`: actions are often inside forms
              type="button"
              iconLeft={action.icon}
              title={action.title}
              size="MINI"
              presetStyle="SECONDARY"
              disabled={props.disabled || action.disabled}
              onClick={(e) => handleActionClick(e, action)}
            />
          ))}
        </div>
      ) : null}
    </label>
  );
}

export default KInput;
