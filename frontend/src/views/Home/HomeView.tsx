import { useState } from 'react';
import {
  scetchesController,
  type GetScetchesReturnType,
} from '../../api/scetchesController';
import { ScetchesWithFallback } from '../../components/ScetchesWithFallback/ScetchesWithFallback';
import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout';

export function HomeView() {
  // Sort with lru cache?
  // Store in localStorage
  const [scetches, setScetches] = useState<GetScetchesReturnType>([]);

  async function fetchScetches() {
    const res = await scetchesController.getScetches();
    setScetches(res);
  }
  fetchScetches();

  return (
    <DefaultLayout>
      <div className="container">
        <h1 className="h1">Your recently used scetches</h1>
        <ScetchesWithFallback scetches={scetches} />
      </div>
    </DefaultLayout>
  );
}
