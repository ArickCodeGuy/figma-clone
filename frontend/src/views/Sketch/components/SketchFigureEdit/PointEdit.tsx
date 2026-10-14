import { KInput, KTitle } from 'figmaclone-uikit';
import { Point } from '../../classes/FileSystem';
import { ValueEditProps } from './types';
import { parseNumber } from './parseNumber';

export type PointEditProps = ValueEditProps<Point> & {
  title: string;
};

export function PointEdit(props: PointEditProps) {
  function update(axis: 'x' | 'y', text: string) {
    const n = parseNumber(text);
    if (n === undefined) return;

    props.onUpdate(
      new Point(
        axis === 'x' ? n : props.value.x,
        axis === 'y' ? n : props.value.y,
      ),
    );
  }

  return (
    <div>
      <KTitle children={props.title} />
      <div className="krow">
        <div className="kcol-6">
          <KInput
            value={String(props.value.x)}
            onChange={(v) => update('x', v)}
          />
        </div>
        <div className="kcol-6">
          <KInput
            value={String(props.value.y)}
            onChange={(v) => update('y', v)}
          />
        </div>
      </div>
    </div>
  );
}
