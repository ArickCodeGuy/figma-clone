import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { initCanvas } from './initCanvas';

export function ScetchView() {
  const params = useParams<{ id: string }>();
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasEl.current) return;

    initCanvas(canvasEl.current);
  }, [canvasEl]);

  return (
    <div>
      <canvas ref={canvasEl} />
    </div>
  );
}
