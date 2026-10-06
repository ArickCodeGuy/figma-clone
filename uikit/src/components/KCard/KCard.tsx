import type { KCardAction, KCardProps } from './types';
import './styles.scss';
import { trim } from '../../utils/trim';
import { KButton, type KButtonProps } from '../KButton';
import { KList } from '../KList';
import { KIcon } from '../KIcon';

const MAX_ACTIONS_ON_CARD = 4;

export function KCard(props: KCardProps) {
  const visibleActions: KButtonProps[] = [];

  if (props.actions) {
    // Reserving 1 last place for "Toggle other" when
    // Exceeding maximum amount of actions
    let end = MAX_ACTIONS_ON_CARD;
    if (props.actions.length > MAX_ACTIONS_ON_CARD) end--;

    for (let i = 0; i < props.actions.length && i < end; i++) {
      visibleActions.push({
        className: 'action',
        size: 'MINI',
        iconLeft: props.actions[i].icon,
        title: props.actions[i].description,
        onClick: (e) => handleActionClick(e, props.actions![i]),
      });
    }

    if (props.actions.length > MAX_ACTIONS_ON_CARD) {
      visibleActions.push({
        className: 'action',
        size: 'MINI',
        iconLeft: 'bars',
        title: 'Other actions',
        onClick: toggleOther,
      });
    }
  }

  function handleActionClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: KCardAction,
  ) {
    e.stopPropagation();
    action.onClick?.(e);
  }

  // @@TODO Currently displaying only 4 actions
  // Exceeding resulting in "Toggle other" aciton appearing
  // That does not do anything
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
