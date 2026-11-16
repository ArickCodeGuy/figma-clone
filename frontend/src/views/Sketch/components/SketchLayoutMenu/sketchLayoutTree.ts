import type {
  KNestedListDragAndDropNode,
  KNestedListDragAndDropUl,
} from 'figmaclone-uikit';
import { Base, Folder } from '../../classes/FileSystem';

/**
 * Sketch elements have no ids, so each object gets one the first time it is shown.
 * A `WeakMap` keeps the id stable for the object's lifetime without leaking deleted ones
 */
const ids = new WeakMap<Base, number>();
let lastId = 0;

function getId(element: Base): number {
  let id = ids.get(element);
  if (id === undefined) {
    id = ++lastId;
    ids.set(element, id);
  }
  return id;
}

export type SketchLayoutTree = {
  /** For `KNestedListDragAndDrop` */
  value: KNestedListDragAndDropUl;
  /** List ids back to the sketch elements */
  elements: Map<number, Base>;
  /** Changes whenever names, nesting, order or visibility change */
  signature: string;
};

/** `root` as a `KNestedListDragAndDrop` tree: folders are lists, shapes are items */
export function toSketchLayoutTree(
  root: Folder,
  selected: Base | undefined,
): SketchLayoutTree {
  const elements = new Map<number, Base>();
  let signature = '';

  function convert(element: Base): KNestedListDragAndDropNode {
    const id = getId(element);
    elements.set(id, element);
    signature += `${id}:${element.name}:${element.isHidden ? 1 : 0}`;

    const className =
      [
        element === selected ? 'active' : '',
        element.isHidden ? 'SketchLayoutMenu-node--hidden' : '',
      ]
        .filter(Boolean)
        .join(' ') || undefined;

    if (!(element instanceof Folder)) {
      signature += ',';
      return { id, title: element.name, className };
    }

    signature += '[';
    const children = element.children.map(convert);
    signature += '],';
    return { id, title: element.name, className, children };
  }

  const value = convert(root) as KNestedListDragAndDropUl;
  const selectedId = selected ? getId(selected) : '';
  return { value, elements, signature: `${selectedId}|${signature}` };
}

/**
 * Applies a reordered tree from `KNestedListDragAndDrop` to the sketch,
 * in place: the folders keep their identity, only their `children` arrays change
 */
export function applySketchLayoutTree(
  tree: KNestedListDragAndDropUl,
  elements: Map<number, Base>,
): void {
  const folder = elements.get(Number(tree.id));
  if (!(folder instanceof Folder)) return;

  folder.children = (tree.children ?? [])
    .map((child) => elements.get(Number(child.id)))
    .filter((element): element is Base => element !== undefined);

  for (const child of tree.children ?? []) {
    if ('children' in child && Array.isArray(child.children)) {
      applySketchLayoutTree(child, elements);
    }
  }
}
