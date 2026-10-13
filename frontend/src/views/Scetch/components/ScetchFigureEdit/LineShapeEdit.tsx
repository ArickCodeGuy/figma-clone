import { KInput } from 'figmaclone-uikit';
import { LineShape } from '../../classes/FileSystem';
import { ValueEditProps } from './types';
import { PointEdit } from './PointEdit';

export type LineShapeEditProps = ValueEditProps<LineShape>;

type LineShapePatch = Partial<Pick<LineShape, 'name' | 'position' | 'vector'>>;

export function LineShapeEdit(props: LineShapeEditProps) {
  function update(patch: LineShapePatch) {
    const v = props.value;
    props.onUpdate(
      new LineShape(
        patch.name ?? v.name,
        patch.position ?? v.position,
        patch.vector ?? v.vector,
        v.color,
        v.isHidden,
      ),
    );
  }

  return (
    <div className="krow">
      <div className="kcol-12">
        <KInput
          value={props.value.name}
          onChange={(name) => update({ name })}
        />
      </div>
      <div className="kcol-12">
        <PointEdit
          title="Position"
          value={props.value.position}
          onUpdate={(position) => update({ position })}
        />
      </div>
      <div className="kcol-12">
        <PointEdit
          title="Vector"
          value={props.value.vector}
          onUpdate={(vector) => update({ vector })}
        />
      </div>
    </div>
  );
}
