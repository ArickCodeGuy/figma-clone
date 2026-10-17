import type { KModalProps } from './types';
import './styles.scss';
import { useEffect, useRef } from 'react';
import { AnimationApplier } from '../../utils/AnimationApplier';
import { KButton } from '../index';
import { classNameArrayToString } from '../../utils';

export function KModal(props: KModalProps) {
  const animation = useRef<AnimationApplier>(null);
  const el = useRef<HTMLDivElement>(null);

  // Created in the same effect that uses it, so the first `isShown` (mounted open or closed)
  // is applied too, not only later changes
  useEffect(() => {
    animation.current ??= new AnimationApplier(300, el.current!);
    if (props.isShown === undefined) return;

    animation.current.animate(props.isShown);
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
          type="button"
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
