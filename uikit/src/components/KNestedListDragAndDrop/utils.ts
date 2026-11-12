import type {
  KNestedListDragAndDropItem,
  KNestedListDragAndDropNode,
  KNestedListDragAndDropPosition,
  KNestedListDragAndDropUl,
} from './types';

/** A list is a node with `children`. Without them it is a leaf (`li`) */
export function isKNestedListDragAndDropUl(
  node: KNestedListDragAndDropNode,
): node is KNestedListDragAndDropUl {
  return Array.isArray((node as KNestedListDragAndDropUl).children);
}

/** Node `id` anywhere inside `node`, `node` itself included */
export function findNode(
  node: KNestedListDragAndDropNode,
  id: KNestedListDragAndDropItem['id'],
): KNestedListDragAndDropNode | undefined {
  if (node.id === id) return node;
  if (!isKNestedListDragAndDropUl(node)) return undefined;

  for (const child of node.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return undefined;
}

function removeNode(
  ul: KNestedListDragAndDropUl,
  id: KNestedListDragAndDropItem['id'],
): KNestedListDragAndDropUl {
  return {
    ...ul,
    children: (ul.children ?? [])
      .filter((child) => child.id !== id)
      .map((child) =>
        isKNestedListDragAndDropUl(child) ? removeNode(child, id) : child,
      ),
  };
}

function insertNode(
  ul: KNestedListDragAndDropUl,
  targetId: KNestedListDragAndDropItem['id'],
  position: KNestedListDragAndDropPosition,
  node: KNestedListDragAndDropNode,
): KNestedListDragAndDropUl {
  if (position === 'inside' && ul.id === targetId) {
    return { ...ul, children: [node, ...(ul.children ?? [])] };
  }

  const children: KNestedListDragAndDropNode[] = [];
  for (const child of ul.children ?? []) {
    children.push(
      isKNestedListDragAndDropUl(child)
        ? insertNode(child, targetId, position, node)
        : child,
    );
    if (position === 'after' && child.id === targetId) children.push(node);
  }
  return { ...ul, children };
}

/**
 * Whether `dragId` may be dropped at `targetId`:
 * not on itself, not into its own children, and the root never moves
 */
export function canDropNode(
  root: KNestedListDragAndDropUl,
  dragId: KNestedListDragAndDropItem['id'],
  targetId: KNestedListDragAndDropItem['id'],
): boolean {
  if (dragId === targetId || dragId === root.id) return false;

  const dragged = findNode(root, dragId);
  if (!dragged) return false;

  return !findNode(dragged, targetId);
}

/**
 * New tree with `dragId` moved next to (`after`) or into (`inside`) `targetId`.
 * The same `root` object when the move is not allowed
 */
export function moveNode(
  root: KNestedListDragAndDropUl,
  dragId: KNestedListDragAndDropItem['id'],
  targetId: KNestedListDragAndDropItem['id'],
  position: KNestedListDragAndDropPosition,
): KNestedListDragAndDropUl {
  if (!canDropNode(root, dragId, targetId)) return root;

  const dragged = findNode(root, dragId)!;
  // The root has no parent to be placed after, so it takes the item inside
  const where = targetId === root.id ? 'inside' : position;

  return insertNode(removeNode(root, dragId), targetId, where, dragged);
}
