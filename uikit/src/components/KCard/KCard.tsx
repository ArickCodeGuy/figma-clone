import type { KCardAction, KCardProps } from './types';
import './styles.scss';
import { trim } from '../../utils/trim';
import { KButton, type KButtonProps } from '../KButton';
import { KIcon } from '../../../dist';
import { KList } from '../KList';

export function KCard(props: KCardProps) {
  const visibleActions: KButtonProps[] = [];

  if (props.actions) {
    for (let i = 0; i < props.actions.length && i < 3; i++) {
      visibleActions.push({
        className: 'action',
        size: 'MINI',
        iconLeft: props.actions[i].icon,
        title: props.actions[i].description,
        onClick: (e) => handleActionClick(e, props.actions![i]),
      });
    }

    if (props.actions.length > 3) {
      visibleActions.push({
        className: 'action',
        size: 'MINI',
        iconLeft: 'dots-vertical',
        title: 'Other actions',
        onClick: toggleOther,
      });
    }
  }

  function handleActionClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: KCardAction
  ) {
    e.stopPropagation();
    action.onClick?.(e);
  }

  // @@TODO
  function toggleOther() {}

  return (
    <div className="KCard" onClick={(e) => props.onClick?.(e)}>
      {props.link && (
        <a href={props.link} title={props.title} className="link" />
      )}
      <div className="img">
        <div title={props.description}>
          <img src={props.img} alt={props.description} />
          <div className="img-icon-fallback">
            <KIcon name="image" size={128} />
          </div>
        </div>
        <div className="actions">
          <KList
            component={KButton}
            items={visibleActions}
            style={{
              flexDirection: 'column',
              gap: '4px',
            }}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="title" title={props.title}>
          {trim(props.title, 30)}
        </div>
      </div>
    </div>
  );
}

export default KCard;
