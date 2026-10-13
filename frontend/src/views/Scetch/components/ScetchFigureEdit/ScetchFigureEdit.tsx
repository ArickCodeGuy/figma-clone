import './styles.scss';
import { useReducer, type ReactNode } from 'react';
import type { ScetchFigureEditProps } from './types';
import {
  Base,
  CircleShape,
  LineShape,
  RectangleShape,
} from '../../classes/FileSystem';
import { RectangleShapeEdit } from './RectangleShapeEdit';
import { LineShapeEdit } from './LineShapeEdit';
import { CircleShapeEdit } from './CircleShapeEdit';
import { KTitle } from 'figmaclone-uikit';

export function ScetchFigureEdit(props: ScetchFigureEditProps) {
  // Figures are mutated in place, so re-render by hand to give editors fresh values
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  /**
   * Copies the edited value onto the figure that lives in the sketch tree,
   * so the canvas draws it on the next frame
   */
  function apply<T extends Base>(figure: T, newVal: T) {
    Object.assign(figure, newVal);
    rerender();
    props.update?.(figure);
  }

  function getEditComponent(): ReactNode {
    const figure = props.figure;

    if (figure === undefined) return <>Nothing to edit</>;

    if (figure instanceof RectangleShape) {
      return (
        <RectangleShapeEdit value={figure} onUpdate={(v) => apply(figure, v)} />
      );
    }
    if (figure instanceof LineShape) {
      return (
        <LineShapeEdit value={figure} onUpdate={(v) => apply(figure, v)} />
      );
    }
    if (figure instanceof CircleShape) {
      return (
        <CircleShapeEdit value={figure} onUpdate={(v) => apply(figure, v)} />
      );
    }

    return <>Unknown edit component</>;
  }

  return (
    <div className="ScetchFigureEdit">
      <KTitle>Selected figure:</KTitle>
      {getEditComponent()}
    </div>
  );
}
