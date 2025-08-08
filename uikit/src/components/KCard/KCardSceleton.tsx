import { KSceleton } from '../KSceleton';
import './stylesSceleton.scss';

export function KCard() {
  return <KSceleton width={200} height={250} className="KCardSceleton" />;
}

export default KCard;
