import type { KListProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';

export function KList<T>(props: KListProps<T>) {
  const classNames = classNameArrayToString(['KList']);

  return (
    <ul className={classNames} style={props.style}>
      {(props.items || []).map((i, idx) => (
        <li>
          <props.component key={idx} {...i} />
        </li>
      ))}
    </ul>
  );
}

export default KList;
