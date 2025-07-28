import { Routes, Route } from 'react-router-dom';
import { ROUTER_ROUTES } from './constants';
import { HomeView } from '../views/Home/HomeView';
import { ScetchView } from '../views/Scetch/ScetchView';

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTER_ROUTES.HOME} element={<HomeView />} />
      <Route path={ROUTER_ROUTES.SCETCH} element={<ScetchView />} />
    </Routes>
  );
}
