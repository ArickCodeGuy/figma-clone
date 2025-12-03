import type { KIconNames } from '../iconNames';
import KIcon from '../KIcon';

export type KIconStoriesRowProps = {
  items: KIconNames[];
};

export function KIconStoriesRow(props: KIconStoriesRowProps) {
  return (
    <div
      className="krow"
      style={
        {
          marginTop: 30,
          textAlign: 'center',
          '--column-gutter': '8px',
        } as React.CSSProperties
      }
    >
      {props.items.map((i) => (
        <div
          className="kcol-1"
          style={{ textAlign: 'center', fontSize: 10, lineHeight: '1.3em' }}
        >
          <div>
            <KIcon name={i} size={16} />
          </div>
          <div>{i}</div>
        </div>
      ))}
    </div>
  );
}
