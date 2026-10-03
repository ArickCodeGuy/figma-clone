import { Base, Folder } from '../FileSystem';

/** Returns `Base` figures that are not `Folder` */
export function getClickableFigures(root: Base): Base[] {
  const res: Base[] = [];
  const stack: Base[] = [root];

  while (stack.length) {
    const curr = stack.pop()!;
    res.push(curr);

    if (curr instanceof Folder) {
      for (let i = curr.children.length - 1; i >= 0; i--) {
        stack.push(curr.children[i]);
      }
    }
  }

  return res;
}
