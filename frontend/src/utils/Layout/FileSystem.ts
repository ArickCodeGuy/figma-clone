import type { File } from './File';
import { Folder } from './Folder';

export class FileSystem {
  public root = new Folder(0, 'root');

  constructor() {}

  public static move(source: File | Folder, target: Folder): void {
    Folder.removeItem(source);
    Folder.addChild(target, source);
  }

  public static toString(root: Folder): string {
    return JSON.stringify(Folder.toJSON(root));
  }

  public static fromString(s: string) {
    const json = JSON.parse(s);
    const root = Folder.fromJSON(json);

    return root;
  }
}
