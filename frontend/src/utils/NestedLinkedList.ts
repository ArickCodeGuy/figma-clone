import { Node } from './Node';

// [1, 2, 3]
// [1, [2, [3]]]
export type NestedArray<T = unknown> = Array<T | NestedArray<T>>;
// node.val = 1
// node.val = new Node(1);
export type NestedLinkedListNode<T> = Node<T | NestedLinkedListNode<T>>;

export class NestedLinkedList<T> {
  head: NestedLinkedListNode<T>;
  map: Map<T, NestedLinkedListNode<T>> = new Map();

  constructor(arr: NestedArray<T>) {
    this.head = new Node<T>();
  }

  insertAfter(
    fromNode: NestedLinkedListNode<T>,
    toNode: NestedLinkedListNode<T>
  ) {}

  toString(): string {
    return '';
  }

  fromString(s: string): NestedLinkedListNode<T> {
    return this.fromNestedArray(JSON.parse(s) as NestedArray<T>);
  }

  /**
   * Converts nested array to nested doubly linked list
   */
  fromNestedArray(arr: NestedArray<T>): NestedLinkedListNode<T> {
    const tempHead: NestedLinkedListNode<T> = new Node();

    return tempHead.next!;
  }
}
