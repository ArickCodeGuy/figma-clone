import { ScetchCreate } from '../../../../components/ScetchCreate/ScetchCreate';
import { scetchColClasses } from '../../../../components/Scetch/scetchColClasses';

export function ScetchesPersonalSection() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Personal</h1>
        <div className="krow">
          <div className={scetchColClasses}>
            <ScetchCreate />
          </div>
        </div>
      </div>
    </section>
  );
}
