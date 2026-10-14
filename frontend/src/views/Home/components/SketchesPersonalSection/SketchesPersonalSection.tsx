import { SketchCreate } from '../../../../components/SketchCreate/SketchCreate';
import { sketchColClasses } from '../../../../components/Sketch/sketchColClasses';

export function SketchesPersonalSection() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Personal</h1>
        <div className="krow">
          <div className={sketchColClasses}>
            <SketchCreate />
          </div>
        </div>
      </div>
    </section>
  );
}
