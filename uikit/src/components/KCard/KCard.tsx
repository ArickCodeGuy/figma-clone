import type { KCardAction, KCardProps } from './types';
import './styles.scss';
import { trim } from '../../utils/trim';
import { KButton } from '../KButton';
import { KIcon } from '../../../dist';

export function KCard(props: KCardProps) {
  const firstThreeActions: KCardProps['actions'] = [];
  const otherActions: KCardProps['actions'] = [];
  if (props.actions) {
    for (let i = 0; i < props.actions?.length; i++) {
      if (i < 3) firstThreeActions.push(props.actions[i]);
      else otherActions.push(props.actions[i]);
    }
  }

  function handleActionClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    action: KCardAction
  ) {
    e.stopPropagation();
    action.onClick?.(e);
  }

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
          {firstThreeActions.map((action) => (
            <KButton
              className="action"
              size="MINI"
              iconLeft={action.icon}
              title={action.description}
              onClick={(e) => handleActionClick(e, action)}
            />
          ))}
          {/* @@TODO dropdown */}
          {otherActions.length > 0 && (
            <KButton
              className="action"
              size="MINI"
              iconLeft="dots-vertical"
              title="Other actions"
              onClick={toggleOther}
            />
          )}
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
