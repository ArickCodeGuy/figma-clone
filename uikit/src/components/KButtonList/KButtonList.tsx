import type { KButtonListProps } from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { KButton } from '../KButton';

export function KButtonList(props: KButtonListProps) {
  const classNames = classNameArrayToString(['KButtonList']);

  return (
    <div className={classNames} style={props.style}>
      {(props.items || []).map((i) => (
        <KButton
          iconLeft={i.name}
          title={i.title}
          children={i.children}
          size={props.size}
        />
      ))}
    </div>
  );
}

export default KButtonList;
