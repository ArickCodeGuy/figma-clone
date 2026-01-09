import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ScetchCanvasState } from './classes/ScetchCanvasState';
import { ScetchSideMenu } from './components/ScetchSideMenu/ScetchSideMenu';

export function ScetchView() {
  const params = useParams<{ id: string }>();
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasEl.current) return;

    state = new ScetchCanvasState(canvasEl.current, {
      debug: true,
    });
  }, [canvasEl]);

  let state: ScetchCanvasState;

  return (
    <>
      <ScetchSideMenu />
      <canvas ref={canvasEl} />
    </>
  );
}
