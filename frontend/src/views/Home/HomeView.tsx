import { useState } from 'react';
import { ScetchesWithFallback } from '../../components/ScetchesWithFallback/ScetchesWithFallback';
import { DefaultLayout } from '../../layouts/DefaultLayout/DefaultLayout';
import {
  ScetchesController,
  type GetScetchesReturnType,
} from '../../api/ScetchesController/ScetchesController';

export function HomeView() {
  // Sort with lru cache?
  // Store in localStorage
  const [scetches, setScetches] = useState<GetScetchesReturnType>([]);

  async function fetchScetches() {
    const res = await ScetchesController.getScetches();
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
