/**
 * Implementation of doubly linked list node class
 */
export class Node<T> {
  val?: T;
  prev?: Node<T>;
  next?: Node<T>;

  constructor(val?: T) {
    this.val = val;
  }

  /**
   * Cuts `node` from list
   *
   * @returns `node`
   */
  remove(node: Node<T>): Node<T> {
    const prev = node.prev,
      next = node.next;

    if (prev) prev.next = node.next;
    if (next) next.prev = node.prev;

    delete node.prev;
    delete node.next;

    return node;
  }

  /**
   * Set `target.next = node`
   *
   * @returns `node`
   */
  append(target: Node<T>, node: Node<T>): Node<T> {
    node.next = target.next;
    node.prev = target;
    target.next = node;

    return node;
  }
}
