import { KInput, KInputColor } from 'figmaclone-uikit';
import { RectangleShape } from '../../classes/FileSystem';
import { ValueEditProps } from './types';
import { PointEdit } from './PointEdit';
import { toHexColor } from './toHexColor';

export type RectangleShapeEditProps = ValueEditProps<RectangleShape>;

type RectangleShapePatch = Partial<
  Pick<RectangleShape, 'name' | 'position' | 'size' | 'color' | 'borderColor'>
>;

export function RectangleShapeEdit(props: RectangleShapeEditProps) {
  function update(patch: RectangleShapePatch) {
    const v = props.value;
    props.onUpdate(
      new RectangleShape(
        patch.name ?? v.name,
        patch.position ?? v.position,
        patch.size ?? v.size,
        patch.color ?? v.color,
        patch.borderColor ?? v.borderColor,
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
          title="Size"
          value={props.value.size}
          onUpdate={(size) => update({ size })}
        />
      </div>
      <div className="kcol-12">
        <KInputColor
          label="Background"
          value={toHexColor(props.value.color)}
          onChange={(color) => update({ color })}
        />
      </div>
      <div className="kcol-12">
        <KInputColor
          label="Border"
          value={toHexColor(props.value.borderColor)}
          onChange={(borderColor) => update({ borderColor })}
        />
      </div>
    </div>
  );
}
