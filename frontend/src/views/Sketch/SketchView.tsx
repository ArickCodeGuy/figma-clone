import { useParams } from 'react-router-dom';
import { SketchSideMenu } from './components/SketchSideMenu/SketchSideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState, type AppDispatch } from '../../store/store';
import { useEffect, useRef } from 'react';
import {
  openSketch,
  selectSketchLoadError,
  selectSketchLoadStatus,
} from '../../store/canvas';

export function SketchView() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector<StoreState, StoreState['canvas']['state']>(
    (state) => state.canvas.state,
  );
  const loadStatus = useSelector(selectSketchLoadStatus);
  const loadError = useSelector(selectSketchLoadError);

  useEffect(() => {
    if (!divRef.current) return;

    divRef.current.appendChild(state.canvas);
  }, [divRef]);

  useEffect(() => {
    if (Number.isInteger(id)) dispatch(openSketch(id));
  }, [dispatch, id]);

  state.init();

  const error = !Number.isInteger(id)
    ? 'Sketch not found'
    : loadStatus === 'error'
      ? loadError
      : undefined;

  return (
    <div ref={divRef}>
      {error && (
        <div className="SketchView-error" role="alert">
          {error}
        </div>
      )}
      <SketchSideMenu />
    </div>
  );
}
