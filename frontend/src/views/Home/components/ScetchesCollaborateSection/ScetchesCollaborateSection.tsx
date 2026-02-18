import { KCardSceleton } from 'figmaclone-uikit';
import { useState } from 'react';
import {
  GetScetchesReturnType,
  ScetchesController,
} from '../../../../api/ScetchesController/ScetchesController';
import { scetchColClasses } from '../../../../components/Scetch/scetchColClasses';
import { Scetch } from '../../../../components/Scetch/Scetch';
import { ScetchCreate } from '../../../../components/ScetchCreate/ScetchCreate';

export function ScetchesCollaborateSection() {
  // Sort with lru cache?
  // Store in localStorage
  const [scetches, setScetches] = useState<GetScetchesReturnType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  async function fetchScetches() {
    try {
      const res = await ScetchesController.getScetches();
      setScetches(res);
    } catch (e) {}

    // setIsFetching(false);
  }
  fetchScetches();

  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Collaborate</h1>
        <div className="krow">
          <div className={scetchColClasses}>
            <ScetchCreate />
          </div>
          {isFetching
            ? new Array(3).fill(0).map((_, idx) => (
                <div className={scetchColClasses} key={idx}>
                  <KCardSceleton />
                </div>
              ))
            : (scetches || []).map((s) => (
                <div className={scetchColClasses}>
                  <Scetch scetch={s} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
