import { KCard } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';

export function ScetchCreate() {
  return (
    <KCard
      title="Create new scetch"
      link={replaceRouteParams('SCETCH', { id: -1 })}
    />
  );
}
