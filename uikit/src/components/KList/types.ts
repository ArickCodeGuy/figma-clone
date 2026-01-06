export type KListProps<T> = {
  component: React.ComponentType<T>;
  items?: T[];
  style?: React.CSSProperties;
  className?: string;
};
