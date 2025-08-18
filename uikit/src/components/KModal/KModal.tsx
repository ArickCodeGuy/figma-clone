import type { KModalProps } from './types';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { AnimationDuration } from '../../utils/AnimationDuration';

export function KModal(props: KModalProps) {
  const [animation, setAnimation] = useState<AnimationDuration>();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimation(new AnimationDuration(1000, el.current!));
  }, []);

  useEffect(() => {
    if (!animation || props.isShown === undefined) return;

    animation.setValue(props.isShown);
  }, [props.isShown]);

  function close() {
    if (!props.isShown) return;

    props.close?.();
  }

  return (
    <div className="KModalWrapper" ref={el}>
      <div className="KModalBackground" onClick={close} />
      <div className="KModal kblock" children={props.children} />
    </div>
  );
}

export default KModal;
