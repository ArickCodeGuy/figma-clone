import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';

export function SketchesPersonalSection() {
  // @@TODO
  // Save all sketches with key `LOCAL_SKETCHES` as value SketchFullDto[]
  // When navigating to local sketch make current sketch with index 0
  // When we will modify it save sketch with hardcoded index 0

  // loadFrom localStorage all saved sketches

  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Personal</h1>
        <div className="krow">
          <div className={sketchColClasses}>
            <SketchCreate isLocal />
          </div>
        </div>
      </div>
    </section>
  );
}
