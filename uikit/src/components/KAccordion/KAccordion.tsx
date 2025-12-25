import type { KAccordionProps } from './types';
import './styles.scss';
import { useEffect, useState } from 'react';
import { KButton } from '../KButton';
import { classNameArrayToString } from '../../utils';

export function KAccordion(props: KAccordionProps) {
  const [isOpen, updateIsOpen] = useState<KAccordionProps['isOpen']>(
    props.isOpen
  );
  const [bottomClassNames, setBottomClassNames] = useState<string>();

  function topClick() {
    updateIsOpen((v) => !v);
  }

  useEffect(() => {
    updateIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    setBottomClassNames(
      classNameArrayToString(['KAccordion-bottom', isOpen ? 'open' : 'closed'])
    );
  }, [isOpen]);

  return (
    <div className="KAccordion">
      <div className="KAccordion-top">
        <KButton
          className="KAccordion-button"
          presetStyle="SECONDARY"
          children={props.title}
          onClick={topClick}
        />
      </div>
      <div className={bottomClassNames}>{props.bottom}</div>
    </div>
  );
}

export default KAccordion;
