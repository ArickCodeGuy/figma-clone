import { useDispatch, useSelector } from 'react-redux';
import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';
import { Sketch } from '../../../../components/Sketch/Sketch';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';
import {
  localSketchDeleted,
  selectLocalSketches,
} from '../../../../store/localSketches';
import { showLocalSketchPopup } from '../../../../components/Popup/showPopup';

/**
 * Sketches stored in localStorage (`LOCAL_SKETCHES`), no account needed.
 * Only one for now: index 0, opened as `/sketch/-1`
 */
export function SketchesPersonalSection() {
  const sketches = useSelector(selectLocalSketches);
  const dispatch = useDispatch();

  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Personal</h1>
        <div className="krow">
          <div className={sketchColClasses}>
            <SketchCreate isLocal />
          </div>
          {sketches.length
            ? sketches.map((s) => (
                <div className={sketchColClasses} key={s.id}>
                  <Sketch
                    sketch={s}
                    actions={[
                      {
                        icon: 'pen',
                        description: 'Edit',
                        onClick: () => showLocalSketchPopup(s),
                      },
                      {
                        icon: 'trash',
                        description: 'Delete',
                        // No confirmation on purpose
                        onClick: () => dispatch(localSketchDeleted(s.id)),
                      },
                    ]}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
