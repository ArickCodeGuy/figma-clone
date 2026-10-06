import type { KAccordionProps } from './types';
import './styles.scss';
import { useEffect, useState } from 'react';
import { KButton } from '../KButton';
import { classNameArrayToString } from '../../utils';

export function KAccordion(props: KAccordionProps) {
  const [isOpen, updateIsOpen] = useState<KAccordionProps['isOpen']>(
    props.isOpen,
  );
  useEffect(() => {
    updateIsOpen(props.isOpen);
  }, [props.isOpen]);

  function topClick() {
    updateIsOpen((v) => !v);
  }

  const [bottomClassNames, setBottomClassNames] = useState<string>();
  useEffect(() => {
    setBottomClassNames(
      classNameArrayToString(['KAccordion-bottom', isOpen ? 'open' : 'closed']),
    );
  }, [isOpen]);

  return (
    <div className="KAccordion">
      <div className="KAccordion-top">
        <KButton
          className="KAccordion-button"
          presetStyle="SECONDARY"
          children={props.title}
          iconLeft={isOpen ? 'chevron-up' : 'chevron-down'}
          onClick={topClick}
        />
      </div>
      <div className={bottomClassNames}>{props.bottom}</div>
    </div>
  );
}

export default KAccordion;
