import type { KCardProps } from './types';
import './styles.scss';
import { trim } from '../../utils/trim';
import { KButton } from '../KButton';

export function KCard(props: KCardProps) {
  const firstThreeActions: KCardProps['actions'] = [];
  const otherActions: KCardProps['actions'] = [];
  if (props.actions) {
    for (let i = 0; i < props.actions?.length; i++) {
      if (i < 3) firstThreeActions.push(props.actions[i]);
      else otherActions.push(props.actions[i]);
    }
  }

  function toggleOther() {}

  return (
    <div className="KCard">
      <div className="img">
        <img
          src={props.img}
          alt={props.description}
          title={props.description}
        />
        <div className="actions">
          {firstThreeActions.map((action) => (
            <KButton
              className="action"
              size="MINI"
              iconLeft={action.icon}
              title={action.description}
              onClick={action.onClick}
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
