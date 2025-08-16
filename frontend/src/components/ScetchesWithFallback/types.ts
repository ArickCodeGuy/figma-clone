import type { GetScetchesReturnType } from '../../api/ScetchesController/ScetchesController';

export type ScetchesWithFallbackProps = {
  scetches?: GetScetchesReturnType;
  showSceletons?: boolean;
};
