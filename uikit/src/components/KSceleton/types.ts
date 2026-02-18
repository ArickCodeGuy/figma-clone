export type KSceletonProps = {
  width?: number;
  height?: number;
  /**
   * Do background animation.
   *
   * **By default `true`**
   */
  animate?: boolean;
  borderRound?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};
