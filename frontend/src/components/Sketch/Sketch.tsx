import { KCard, type KCardProps } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';
import { SketchItem } from '../../api/sketchesController';

type SketchProps = {
  sketch: SketchItem;
  actions?: KCardProps['actions'];
};

export function Sketch({ sketch, actions }: SketchProps) {
  return (
    <KCard
      title={sketch.title || 'Untitled sketch'}
      description={sketch.description}
      link={replaceRouteParams('SKETCH', { id: sketch.id })}
      actions={actions}
    />
  );
}
