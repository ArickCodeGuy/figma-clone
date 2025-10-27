import { Node } from './Node';

// 1
// [1, 2, 3]
// [1, [2, [3]]]
export type NestedArray<T = unknown> = T | NestedArray<T>[];
export type NestedLinkedListNode<T> = NestedArray<Node<T>>;

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

  fromNestedArray(arr: NestedArray<T>): NestedLinkedListNode<T> {
    const node: NestedLinkedListNode<T> = new Node();

    return node.next!;
  }
}
