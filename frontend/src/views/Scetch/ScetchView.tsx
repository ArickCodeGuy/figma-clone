import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ScetchCanvasState } from './classes/ScetchCanvasState';

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
    <div>
      <canvas ref={canvasEl} />
    </div>
  );
}
