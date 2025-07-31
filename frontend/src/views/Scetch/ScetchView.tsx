import { useRef } from 'react';
import { useParams } from 'react-router-dom';

export function ScetchView() {
  const params = useParams<{ id: string }>();
  const canvasEl = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <canvas ref={canvasEl} />
    </div>
  );
}
