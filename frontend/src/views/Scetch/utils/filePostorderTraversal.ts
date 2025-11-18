import { File } from '../../../utils/Layout/File';
import { FILE_ID, FileSystem } from '../../../utils/Layout/FileSystem';
import { Folder } from '../../../utils/Layout/Folder';

export function filePostorderTraversal(fileSystem: FileSystem): FILE_ID[] {
  const res: FILE_ID[] = [];

  function dfs(curr: Folder | File = fileSystem.root): void {
    if (!curr) return;

    if ('children' in curr) {
      for (const next of curr.children) {
        dfs(next);
      }
    }

    if (curr instanceof File) res.push(curr.id);
  }
  dfs();

  return res;
}
