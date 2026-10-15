import type { KModalProps } from './types';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { AnimationApplier } from '../../utils/AnimationApplier';
import { KButton } from '../index';
import { classNameArrayToString } from '../../utils';

export function KModal(props: KModalProps) {
  const [animation, setAnimation] = useState<AnimationApplier>();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimation(new AnimationApplier(1000, el.current!));
  }, []);

  useEffect(() => {
    if (!animation || props.isShown === undefined) return;

    animation.animate(props.isShown);
  }, [props.isShown]);

  function close() {
    if (!props.isShown) return;

    props.close?.();
  }

  const className = classNameArrayToString(['KModal', props.className]);

  return (
    <div className="KModalWrapper" ref={el}>
      <div className="KModalBackground" onClick={close} />
      <div className={className} style={props.style}>
        <KButton
          size="MINI"
          iconLeft="x"
          presetStyle="SECONDARY-TRANSPARENT"
          className="KModalClose"
          onClick={close}
        />
        {props.children}
      </div>
    </div>
  );
}

export default KModal;
