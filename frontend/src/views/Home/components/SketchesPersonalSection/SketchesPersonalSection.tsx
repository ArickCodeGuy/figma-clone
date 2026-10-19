import { useSelector } from 'react-redux';
import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';
import { Sketch } from '../../../../components/Sketch/Sketch';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';
import { selectLocalSketches } from '../../../../store/localSketches';

/**
 * Sketches stored in localStorage (`LOCAL_SKETCHES`), no account needed.
 * Only one for now: index 0, opened as `/sketch/-1`
 */
export function SketchesPersonalSection() {
  const sketches = useSelector(selectLocalSketches);

  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Personal</h1>
        <div className="krow">
          <div className={sketchColClasses}>
            <SketchCreate isLocal />
          </div>
          {sketches.length
            ? sketches.slice(0, 1).map((s) => (
                <div className={sketchColClasses} key={s.id}>
                  <Sketch sketch={s} />
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
