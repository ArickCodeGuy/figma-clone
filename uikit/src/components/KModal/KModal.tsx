import type { KModalProps } from './types';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { AnimationApplier } from '../../utils/AnimationApplier';
import { KButton } from '../index';

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

  return (
    <div className="KModalWrapper" ref={el}>
      <div className="KModalBackground" onClick={close} />
      <div className="KModal kblock">
        <KButton
          size="MINI"
          iconLeft="close"
          className="KModalClose"
          onClick={close}
        />
        {props.children}
      </div>
    </div>
  );
}

export default KModal;
