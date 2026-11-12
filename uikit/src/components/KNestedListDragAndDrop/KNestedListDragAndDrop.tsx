import { useEffect, useRef, useState } from 'react';
import type {
  Dnd,
  DropTarget,
  KNestedListDragAndDropItem,
  KNestedListDragAndDropPosition,
  KNestedListDragAndDropProps,
  KNestedListDragAndDropUl,
} from './types';
import './styles.scss';
import { classNameArrayToString } from '../../utils';
import { canDropNode, isKNestedListDragAndDropUl, moveNode } from './utils';

function toTree(value: KNestedListDragAndDropUl): KNestedListDragAndDropUl {
  return { ...value, children: value.children ?? [] };
}

/**
 * Tree of lists (`children`) and items, reordered by drag and drop:
 * - list, left half - after that list, same level
 * - list, right half - first item inside that list
 * - item - after that item
 */
export function KNestedListDragAndDrop(props: KNestedListDragAndDropProps) {
  const [tree, setTree] = useState(() => toTree(props.value));
  useEffect(() => {
    setTree(toTree(props.value));
  }, [props.value]);

  const [draggedId, setDraggedId] =
    useState<KNestedListDragAndDropItem['id']>();
  const [dropTarget, setDropTarget] = useState<DropTarget>();
  // Drag events fire faster than React re-renders, read the latest values from refs
  const draggedRef = useRef<KNestedListDragAndDropItem['id']>(undefined);
  const dropTargetRef = useRef<DropTarget>(undefined);

  function updateDropTarget(next: DropTarget | undefined): void {
    const prev = dropTargetRef.current;
    if (prev?.id === next?.id && prev?.position === next?.position) return;
    dropTargetRef.current = next;
    setDropTarget(next);
  }

  function reset(): void {
    draggedRef.current = undefined;
    setDraggedId(undefined);
    updateDropTarget(undefined);
  }

  /** Allows the drop (`preventDefault`) only where `canDropNode` says so */
  function handleOver(
    e: React.DragEvent,
    id: KNestedListDragAndDropItem['id'],
    position: KNestedListDragAndDropPosition,
  ): void {
    // The innermost list or item decides, not its parents
    e.stopPropagation();

    const dragged = draggedRef.current;
    if (dragged === undefined || !canDropNode(tree, dragged, id)) {
      updateDropTarget(undefined);
      return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    updateDropTarget({ id, position });
  }

  const dnd: Dnd = {
    draggedId,
    dropTarget,
    onDragStart(e, id) {
      e.stopPropagation();
      e.dataTransfer.effectAllowed = 'move';
      // Firefox starts dragging only when some data is set
      e.dataTransfer.setData('text/plain', String(id));
      draggedRef.current = id;
      setDraggedId(id);
    },
    onDragOverUl(e, id) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeftHalf = e.clientX < rect.left + rect.width / 2;
      handleOver(e, id, isLeftHalf ? 'after' : 'inside');
    },
    onDragOverLi(e, id) {
      handleOver(e, id, 'after');
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      const dragged = draggedRef.current;
      const target = dropTargetRef.current;
      reset();
      if (dragged === undefined || !target) return;

      const next = moveNode(tree, dragged, target.id, target.position);
      if (next === tree) return;

      setTree(next);
      props.onUpdate?.(next);
    },
    onDragEnd: reset,
  };

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>): void {
    // Left the whole component, not just moved between its children
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      updateDropTarget(undefined);
    }
  }

  const classNames = classNameArrayToString([
    'KNestedListDragAndDrop',
    props.className,
  ]);

  return (
    <div
      className={classNames}
      style={props.style}
      onDragLeave={handleDragLeave}
    >
      <KNestedListDragAndDropUlView
        node={tree}
        dnd={dnd}
        onClick={props.onClick}
        isRoot
      />
    </div>
  );
}

function KNestedListDragAndDropUlView(props: {
  node: KNestedListDragAndDropUl;
  onClick: KNestedListDragAndDropProps['onClick'];
  dnd: Dnd;
  isRoot?: boolean;
}) {
  const { node, dnd, onClick } = props;
  const drop = dnd.dropTarget?.id === node.id ? dnd.dropTarget : undefined;

  const classNames = classNameArrayToString([
    'KNestedListDragAndDrop-ul',
    node.className,
    drop ? `KNestedListDragAndDrop-ul--drop-${drop.position}` : undefined,
    dnd.draggedId === node.id ? 'KNestedListDragAndDrop--dragged' : undefined,
  ]);

  return (
    <ul
      className={classNames}
      data-id={node.id}
      // The root list stays where it is
      draggable={!props.isRoot}
      onDragStart={(e) => dnd.onDragStart(e, node.id)}
      onDragOver={(e) => dnd.onDragOverUl(e, node.id)}
      onDrop={dnd.onDrop}
      onDragEnd={dnd.onDragEnd}
    >
      <li
        className="KNestedListDragAndDrop-title"
        onClick={() => onClick?.(node.id)}
      >
        {node.title}
      </li>
      {(node.children ?? []).map((child) =>
        isKNestedListDragAndDropUl(child) ? (
          <li key={child.id} className="KNestedListDragAndDrop-nested">
            <KNestedListDragAndDropUlView
              node={child}
              dnd={dnd}
              onClick={onClick}
            />
          </li>
        ) : (
          <li
            key={child.id}
            className={classNameArrayToString([
              'KNestedListDragAndDrop-item',
              child.className,
              dnd.dropTarget?.id === child.id
                ? 'KNestedListDragAndDrop-item--drop-after'
                : undefined,
              dnd.draggedId === child.id
                ? 'KNestedListDragAndDrop--dragged'
                : undefined,
            ])}
            onClick={() => onClick?.(child.id)}
            data-id={child.id}
            draggable
            onDragStart={(e) => dnd.onDragStart(e, child.id)}
            onDragOver={(e) => dnd.onDragOverLi(e, child.id)}
            onDrop={dnd.onDrop}
            onDragEnd={dnd.onDragEnd}
          >
            {child.title}
          </li>
        ),
      )}
    </ul>
  );
}

export default KNestedListDragAndDrop;
