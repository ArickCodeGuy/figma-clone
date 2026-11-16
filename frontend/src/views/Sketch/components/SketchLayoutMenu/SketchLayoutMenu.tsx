import { KNestedListDragAndDrop, KTitle } from 'figmaclone-uikit';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import { SketchLayoutMenuProps } from './types';
import { StoreState } from '../../../../store/store';
import {
  selectSelectedFigure,
  selectSelectedFigureVersion,
} from '../../../../store/canvas';
import {
  applySketchLayoutTree,
  toSketchLayoutTree,
} from './sketchLayoutTree';

/**
 * How often to look for changes made outside this menu (new shapes, deletes,
 * renames, opening another sketch). The sketch is mutated in place and has no
 * "changed" event, so the menu compares a cheap signature instead
 */
const SYNC_INTERVAL_MS = 300;

/** Sketch layers: folders and shapes, reordered and nested by drag and drop */
export function SketchLayoutMenu(props: SketchLayoutMenuProps) {
  const state = useSelector<StoreState, StoreState['canvas']['state']>(
    (state) => state.canvas.state,
  );
  // Re-render on selection changes and edits from the figure edit panel
  const selectedFigure = useSelector(selectSelectedFigure);
  useSelector(selectSelectedFigureVersion);

  const [, rerender] = useReducer((n: number) => n + 1, 0);

  const tree = toSketchLayoutTree(state.sketch.root, selectedFigure);

  // Same `value` object until something changed: a new one resets the list,
  // which would interrupt a drag in progress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => tree.value, [tree.signature]);

  const signatureRef = useRef(tree.signature);
  signatureRef.current = tree.signature;
  useEffect(() => {
    const intervalId = setInterval(() => {
      const next = toSketchLayoutTree(state.sketch.root, state.selectedFigure);
      if (next.signature !== signatureRef.current) rerender();
    }, SYNC_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [state]);

  return (
    <div className="SketchLayoutMenu">
      <KTitle children="Layout" />
      <KNestedListDragAndDrop
        value={value}
        onClick={(id) => state.setSelectedFigure(tree.elements.get(Number(id)))}
        onUpdate={(newTree) => {
          // Later children are drawn on top, so the order is also the z-order
          applySketchLayoutTree(newTree, tree.elements);
          rerender();
        }}
      />
    </div>
  );
}
