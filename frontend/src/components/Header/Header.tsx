import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { StoreState } from '../../store/store';
import { decrement, increment } from '../../store/counter';

export function Burger() {
  return (
    <div className="Burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export function Header() {
  const count = useSelector<StoreState, StoreState['counter']['value']>(
    (state) => state.counter.value
  );
  const dispatch = useDispatch();

  return (
    <header className="Header">
      <div className="container">
        <Burger />

        {/* <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button> */}
      </div>
    </header>
  );
}
