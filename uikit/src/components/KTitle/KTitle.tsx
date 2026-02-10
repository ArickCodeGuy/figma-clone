import type { KTitleProps } from './types';
import './styles.scss';
import { KList } from '../KList';
import { KButton, type KButtonProps } from '../KButton';

export function KTitle(props: KTitleProps) {
  const actions =
    props.actions &&
    props.actions.map<KButtonProps>((i) => ({
      ...i,
      size: 'MINI',
    }));

  return (
    <div className="KTitle" style={props.style}>
      <div className="children">{props.children}</div>
      {props.actions && (
        <KList
          component={KButton}
          items={actions}
          className={'KTitle-actions'}
        />
      )}
    </div>
  );
}

export default KTitle;
