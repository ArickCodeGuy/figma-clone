import { classNameArrayToString, KCard } from 'figmaclone-uikit';
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

  const colClasses = classNameArrayToString(['kcol-lg-2']);

  return (
    <div className="krow">
      <div className={colClasses}>
        <ScetchCreate />
      </div>
      {(scetches || []).map((s) => (
        <div className={colClasses}>
          <Scetch scetch={s} />
        </div>
      ))}
    </div>
  );
}
