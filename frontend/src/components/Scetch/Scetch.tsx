import { KCard } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';
import { ScetchItem } from '../../api/ScetchesController/ScetchesController';

export function Scetch({ scetch }: { scetch: ScetchItem }) {
  return (
    <KCard
      title={scetch.name}
      link={replaceRouteParams('SCETCH', { id: scetch.id })}
    />
  );
}
