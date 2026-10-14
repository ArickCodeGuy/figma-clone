import { KCard } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';
import { SketchItem } from '../../api/sketchesController';

export function Sketch({ sketch }: { sketch: SketchItem }) {
  return (
    <KCard
      title={sketch.name}
      link={replaceRouteParams('SKETCH', { id: sketch.id })}
    />
  );
}
