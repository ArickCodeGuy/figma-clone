import { useParams } from 'react-router-dom';
import { ScetchSideMenu } from './components/ScetchSideMenu/ScetchSideMenu';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { useEffect, useRef } from 'react';

export function ScetchView() {
  const params = useParams<{ id: string }>();
  const divRef = useRef<HTMLDivElement>(null);

  const state = useSelector<StoreState, StoreState['canvas']['state']>(
    (state) => state.canvas.state
  );
  state.init();

  useEffect(() => {
    if (!divRef.current) return;

    divRef.current.appendChild(state.canvas);
  }, [divRef]);

  return (
    <div ref={divRef}>
      <ScetchSideMenu />
    </div>
  );
}
