import { KInput, KInputColor, KTitle } from 'figmaclone-uikit';
import { CircleShape } from '../../classes/FileSystem';
import { ValueEditProps } from './types';
import { PointEdit } from './PointEdit';
import { parseNumber } from './parseNumber';
import { toHexColor } from './toHexColor';

export type CircleShapeEditProps = ValueEditProps<CircleShape>;

type CircleShapePatch = Partial<
  Pick<CircleShape, 'name' | 'position' | 'radius' | 'color' | 'borderColor'>
>;

export function CircleShapeEdit(props: CircleShapeEditProps) {
  function update(patch: CircleShapePatch) {
    const v = props.value;
    props.onUpdate(
      new CircleShape(
        patch.name ?? v.name,
        patch.position ?? v.position,
        patch.radius ?? v.radius,
        patch.color ?? v.color,
        patch.borderColor ?? v.borderColor,
        v.isHidden,
      ),
    );
  }

  function updateRadius(text: string) {
    const radius = parseNumber(text);
    // `ctx.arc` throws on a negative radius
    if (radius === undefined || radius < 0) return;

    update({ radius });
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
        <KTitle children="Radius" />
        <KInput value={String(props.value.radius)} onChange={updateRadius} />
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
