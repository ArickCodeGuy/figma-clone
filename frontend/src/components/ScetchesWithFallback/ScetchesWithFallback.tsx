import { classNameArrayToString, KCard, KCardSceleton } from 'figmaclone-uikit';
import type { ScetchesWithFallbackProps } from './types';
import type { ScetchItem } from '../../api/ScetchesController/ScetchesController';
import { replaceRouteParams } from '../../router/replaceRouteParams';

export function Scetch({ scetch }: { scetch: ScetchItem }) {
  return (
    <KCard
      title={scetch.name}
      link={replaceRouteParams('SCETCH', { id: scetch.id })}
    />
  );
}

function ScetchCreate() {
  return (
    <KCard
      title="Create new scetch"
      link={replaceRouteParams('SCETCH', { id: -1 })}
    />
  );
}

export function ScetchesWithFallback(props: ScetchesWithFallbackProps) {
  const { scetches } = props;

  const colClasses = classNameArrayToString([
    'kcol-12',
    'kcol-sm-6',
    'kcol-md-4',
    'kcol-lg-3',
    'kcol-xl-3',
  ]);

  return (
    <div className="krow">
      <div className={colClasses}>
        <ScetchCreate />
      </div>
      {props.showSceletons
        ? new Array(3).fill(0).map((_, idx) => (
            <div className={colClasses} key={idx}>
              <KCardSceleton />
            </div>
          ))
        : null}
      {(scetches || []).map((s) => (
        <div className={colClasses}>
          <Scetch scetch={s} />
        </div>
      ))}
    </div>
  );
}
