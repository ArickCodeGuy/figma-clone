import { KCard } from 'figmaclone-uikit';
import { replaceRouteParams } from '../../router/replaceRouteParams';

type SketchCreateProps = {
  isLocal?: boolean;
};

export function SketchCreate(props: SketchCreateProps) {
  function handleOnClick() {
    if (props.isLocal) {
      // navigate to
      // replaceRouteParams('SKETCH', { id: -1 })
    } else {
      // request to create new sketch
      // navigate to returned id
    }
  }

  return <KCard title="Create new sketch" onClick={handleOnClick} />;
}
