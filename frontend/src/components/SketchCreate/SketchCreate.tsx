import { KCard } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';

export function SketchCreate() {
  return (
    <KCard
      title="Create new sketch"
      link={replaceRouteParams('SKETCH', { id: -1 })}
    />
  );
}
