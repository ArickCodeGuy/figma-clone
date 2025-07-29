import type { KIconNames } from '../iconNames';
import KIcon from '../KIcon';

export type KIconStoriesRowProps = {
  items: KIconNames[];
};

export function KIconStoriesRow(props: KIconStoriesRowProps) {
  return (
    <div className="krow" style={{ textAlign: 'center' }}>
      {props.items.map((i) => (
        <div className="kcol-1" style={{ textAlign: 'center' }}>
          <div>
            <KIcon name={i} size={64} />
          </div>
          <div>{i}</div>
        </div>
      ))}
    </div>
  );
}
