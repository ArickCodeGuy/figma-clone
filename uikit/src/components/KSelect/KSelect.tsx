import { useEffect, useId, useRef, useState } from 'react';
import type { KSelectOption, KSelectProps, KSelectValue } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KIcon } from '../KIcon';
import { KInput } from '../KInput';
import { KButton } from '../KButton';

/**
 * Select-only combobox.
 * Keyboard: `ArrowUp` / `ArrowDown` / `Home` / `End` move, `Enter` / `Space` pick, `Escape` / `Tab` close
 */
export function KSelect<T extends KSelectValue>(props: KSelectProps<T>) {
  const options = props.options ?? [];

  const [value, setValue] = useState<T | undefined>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const [isOpen, setIsOpen] = useState<boolean>(!!props.isOpen);
  useEffect(() => {
    setIsOpen(!!props.isOpen);
  }, [props.isOpen]);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const listboxId = `${id}-listbox`;
  const optionId = (idx: number) => `${id}-option-${idx}`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected: KSelectOption<T> | undefined = options[selectedIndex];

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (!root.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Highlight the selected option when the dropdown opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : step(-1, 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;

    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex]);

  /** Next enabled option index from `from` in `direction`, wraps around */
  function step(from: number, direction: 1 | -1): number {
    const n = options.length;
    for (let i = 1; i <= n; i++) {
      const idx = (((from + direction * i) % n) + n) % n;
      if (!options[idx].disabled) return idx;
    }
    return -1;
  }

  function open() {
    if (props.disabled) return;
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function pick(option?: KSelectOption<T>) {
    if (!option || option.disabled) return;

    setValue(option.value);
    close();
    if (option.value !== value) props.onChange?.(option.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (props.disabled) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) return open();
        setActiveIndex((i) => step(i, e.key === 'ArrowDown' ? 1 : -1));
        break;
      case 'Home':
      case 'End':
        if (!isOpen) return;
        e.preventDefault();
        setActiveIndex(e.key === 'Home' ? step(-1, 1) : step(0, -1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) return open();
        pick(options[activeIndex]);
        break;
      case 'Escape':
        if (!isOpen) return;
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  }

  const classNames = classNameArrayToString([
    'KSelect',
    isOpen ? 'KSelect--open' : undefined,
    props.disabled ? 'KSelect--disabled' : undefined,
    props.className,
  ]);

  return (
    <div className={classNames} style={props.style} ref={root}>
      <div className="KSelect-trigger">
        <KInput
          className="KSelect-input"
          value={selected?.label ?? ''}
          placeholder={props.placeholder}
          label={props.label}
          disabled={props.disabled}
          readOnly
          inputProps={{
            role: 'combobox',
            'aria-haspopup': 'listbox',
            'aria-expanded': isOpen,
            'aria-controls': listboxId,
            'aria-activedescendant':
              isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined,
            // Handlers live on the input: clicking the KInput <label> forwards one click to it
            onClick: () => (isOpen ? close() : open()),
            onKeyDown: handleKeyDown,
          }}
        />
        <span className="KSelect-chevron" aria-hidden="true">
          <KIcon name="chevron-down" size={12} />
        </span>
      </div>

      <ul
        className="KSelect-dropdown scrollbar"
        id={listboxId}
        role="listbox"
        aria-label={props.label}
        hidden={!isOpen}
      >
        {options.map((option, idx) => (
          <li
            key={String(option.value)}
            id={optionId(idx)}
            role="option"
            aria-selected={idx === selectedIndex}
            aria-disabled={option.disabled || undefined}
            className={classNameArrayToString([
              'KSelect-option',
              idx === selectedIndex ? 'KSelect-option--selected' : undefined,
              option.disabled ? 'KSelect-option--disabled' : undefined,
            ])}
            // Keep focus on the input
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => !option.disabled && setActiveIndex(idx)}
          >
            <KButton
              className={classNameArrayToString([
                'KSelect-option-button',
                // Keyboard highlight looks the same as hover
                idx === activeIndex ? 'hover' : undefined,
              ])}
              presetStyle="SECONDARY-TRANSPARENT"
              iconLeft={option.icon}
              iconRight={idx === selectedIndex ? 'check' : undefined}
              disabled={option.disabled}
              onClick={() => pick(option)}
            >
              {option.label}
            </KButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KSelect;
