import type { KTitleProps } from './types';
import './styles.scss';

export function KTitle(props: KTitleProps) {
  return <div className="KTitle">{props.children}</div>;
}

export default KTitle;
