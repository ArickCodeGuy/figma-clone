import { KSceleton } from '../KSceleton';
import './stylesSceleton.scss';

export function KCardSceleton() {
  return <KSceleton width={200} height={250} className="KCardSceleton" />;
}

export default KCardSceleton;
