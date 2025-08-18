import KModal from '../KModal';
import type { KModalProps } from '../types';

export function KModalStory(props: KModalProps) {
  return (
    <div style={{ width: '600px', height: '600px' }}>
      <KModal {...props} />
    </div>
  );
}
