import { KCardSceleton } from 'figmaclone-uikit';
import { useState } from 'react';
import {
  GetSketchesReturnType,
  sketchesController,
} from '../../../../api/sketchesController';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';
import { Sketch } from '../../../../components/Sketch/Sketch';
import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';

export function SketchesCollaborateSection() {
  // Sort with lru cache?
  // Store in localStorage
  const [sketches, setSketches] = useState<GetSketchesReturnType>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  async function fetchSketches() {
    try {
      const res = await sketchesController.getSketches();
      setSketches(res);
    } catch (e) {}

    // setIsFetching(false);
  }
  fetchSketches();

  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Collaborate</h1>
        <div className="krow">
          <div className={sketchColClasses}>
            <SketchCreate />
          </div>
          {isFetching
            ? new Array(3).fill(0).map((_, idx) => (
                <div className={sketchColClasses} key={idx}>
                  <KCardSceleton />
                </div>
              ))
            : (sketches || []).map((s) => (
                <div className={sketchColClasses}>
                  <Sketch sketch={s} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
