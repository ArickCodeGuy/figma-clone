import type { File } from './File';
import { Folder } from './Folder';

export type FileContents = Map<FILE_ID, string>;

export type FILE_ID = number;

export class FileSystem {
  public root = new Folder(1, 'root');
  public fileContents: FileContents = new Map();

  constructor() {}

  public static move(source: File | Folder, target: Folder): void {
    Folder.removeItem(source);
    Folder.addChild(target, source);
  }

  public static toString(root: Folder, fileContents: FileContents): string {
    return JSON.stringify({
      root: Folder.toJSON(root),
    });
  }

  public static fromString(s: string) {
    const json = JSON.parse(s);
    const root = Folder.fromJSON(json.root);

    return {
      root,
    };
  }
}
