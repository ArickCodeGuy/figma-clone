import { KCardSceleton } from 'figmaclone-uikit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  sketchesController,
  type SketchItem,
} from '../../../../api/sketchesController';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';
import { Sketch } from '../../../../components/Sketch/Sketch';
import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';
import { showSketchPopup } from '../../../../components/Popup/showPopup';
import { useAuthToken } from '../../../../hooks/useAuthToken';
import type { StoreState } from '../../../../store/store';

/** Sketches of the logged-in user, stored on the backend */
export function SketchesCollaborateSection() {
  const token = useAuthToken();
  // The sketch popup may have edited or deleted one, so reload after it closes
  const isPopupShown = useSelector<StoreState, boolean>(
    (state) => state.popup.isShown,
  );
  const [sketches, setSketches] = useState<SketchItem[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setSketches([]);
      return;
    }
    if (isPopupShown) return;

    let isCancelled = false;
    setIsFetching(true);
    sketchesController
      .getSketches()
      .then((res) => {
        if (!isCancelled) setSketches(res);
      })
      .catch(() => {
        // @@TODO show in notifications store, like `LoginPopup` errors
        if (!isCancelled) setSketches([]);
      })
      .finally(() => {
        if (!isCancelled) setIsFetching(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [token, isPopupShown]);

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
            : sketches.map((s) => (
                <div className={sketchColClasses} key={s.id}>
                  <Sketch
                    sketch={s}
                    actions={[
                      {
                        icon: 'pen',
                        description: 'Edit',
                        onClick: () => showSketchPopup(s),
                      },
                    ]}
                  />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
