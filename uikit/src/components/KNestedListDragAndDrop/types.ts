export type KNestedListDragAndDropItem = {
  id: number | string;
  title: string;
  className?: string;
};

/** Leaf: has no `children` */
export type KNestedListDragAndDropLi = KNestedListDragAndDropItem;

/** List: has `children`, even an empty array */
export type KNestedListDragAndDropUl = KNestedListDragAndDropItem & {
  children?: (KNestedListDragAndDropUl | KNestedListDragAndDropLi)[];
};

export type KNestedListDragAndDropNode =
  | KNestedListDragAndDropUl
  | KNestedListDragAndDropLi;

/**
 * Where a dragged item lands, relative to `id`:
 * - `after` - next sibling of `id`, same level
 * - `inside` - first child of list `id`
 */
export type KNestedListDragAndDropPosition = 'after' | 'inside';

export type KNestedListDragAndDropProps = {
  value: KNestedListDragAndDropUl;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (id: KNestedListDragAndDropItem['id']) => void;
  onUpdate?: (newState: KNestedListDragAndDropUl) => void;
};

export type DropTarget = {
  id: KNestedListDragAndDropItem['id'];
  position: KNestedListDragAndDropPosition;
};

export type Dnd = {
  draggedId: KNestedListDragAndDropItem['id'] | undefined;
  dropTarget: DropTarget | undefined;
  onDragStart: (
    e: React.DragEvent,
    id: KNestedListDragAndDropItem['id'],
  ) => void;
  onDragOverUl: (
    e: React.DragEvent,
    id: KNestedListDragAndDropItem['id'],
  ) => void;
  onDragOverLi: (
    e: React.DragEvent,
    id: KNestedListDragAndDropItem['id'],
  ) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
};
