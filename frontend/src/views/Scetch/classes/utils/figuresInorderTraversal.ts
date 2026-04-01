import { BaseFigure } from '../Figures/Base/BaseFigure';
import { FolderFigure } from '../Figures/Folder/FolderFigure';

export function figuresInorderTraversal(root: BaseFigure): BaseFigure[] {
  const res: BaseFigure[] = [];
  const stack: BaseFigure[] = [root];

  while (stack.length) {
    const curr = stack.pop()!;
    res.push(curr);

    if (curr instanceof FolderFigure) {
      for (let i = curr.children.length - 1; i >= 0; i--) {
        stack.push(curr.children[i]);
      }
    }
  }

  return res;
}
