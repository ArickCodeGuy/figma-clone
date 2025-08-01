import { KCard } from 'figmaclone-uikit';
import type { ScetchesWithFallbackProps } from './types';
import { useNavigate } from 'react-router-dom';
import type { ScetchItem } from '../../api/ScetchesController/ScetchesController';
import { replaceRouteParams } from '../../router/replaceRouteParams';

export function ScetshesRow(
  props: Required<Pick<ScetchesWithFallbackProps, 'scetches'>>
) {
  const { scetches } = props;
  const navigate = useNavigate();

  function navigateToScetch(scetch: ScetchItem) {
    navigate(replaceRouteParams('SCETCH', { id: scetch.id }));
  }

  return (
    <div className="krow">
      {scetches.map((s) => (
        <div className="kcol-lg-2">
          <KCard title={s.name} onBottomClick={() => navigateToScetch(s)} />
        </div>
      ))}
    </div>
  );
}

function ScetshesFallback() {
  const navigate = useNavigate();

  function navigateToNewScetch() {
    navigate(replaceRouteParams('SCETCH', { id: -1 }));
  }

  return (
    <div className="krow">
      <div className="kcol-lg-2">
        <KCard
          title="Create new scetch"
          onBottomClick={() => navigateToNewScetch()}
        />
      </div>
    </div>
  );
}

export function ScetchesWithFallback(props: ScetchesWithFallbackProps) {
  const { scetches } = props;

  return (
    <div>
      {scetches?.length ? (
        <ScetshesRow scetches={scetches} />
      ) : (
        <ScetshesFallback />
      )}
    </div>
  );
}
