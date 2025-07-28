import type { KIconNames } from '../iconNames';
import KIcon from '../KIcon';

export type KIconStoriesRowProps = {
  items: KIconNames[];
};

export function KIconStoriesRow(props: KIconStoriesRowProps) {
  return (
    <div className="krow" style={{ textAlign: 'center' }}>
      {props.items.map((i) => (
        <div className="kcol-1">
          <KIcon name={i} size={64} />
        </div>
      ))}
    </div>
  );
}
