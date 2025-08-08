import type { KSceletonProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';

export function KSceleton(props: KSceletonProps) {
  const animate = props.animate ?? true;
  const animateClass = animate ? 'KSceleton-animate' : null;
  const className = classNameArrayToString([
    'KSceleton',
    props.className,
    animateClass,
  ]);

  const style: React.CSSProperties = {
    width: props.width ? props.width + 'px' : '100%',
    height: props.height ? props.height + 'px' : '100%',
  };

  return <div className={className} style={style} children={props.children} />;
}

export default KSceleton;
