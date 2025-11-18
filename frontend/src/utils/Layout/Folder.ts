import { File, type FileAsJSON } from './File';
import { FILE_ID } from './FileSystem';

export type FolderAsJSON = ReturnType<typeof File.toJSON> & {
  type: 'folder';
  children: (FolderAsJSON | FileAsJSON)[];
};

export class Folder extends File {
  public type = 'folder';
  public children: (Folder | File)[];

  constructor(id: FILE_ID, name: string) {
    super(id, name);
    this.children = [];
  }

  /**
   * Adds a file or folder to the current folder.
   */
  public static addChild(parent: Folder, child: File | Folder): void {
    if (parent.children[child.id]) {
      throw new Error(`An item with the id: '${child.id}' already exists.`);
    }
    parent.children.push(child);
    child.parent = parent;
  }

  /**
   * Removes an item from `parent` `Folder`
   */
  public static removeItem(item: Folder | File): void {
    const parent = item.parent;

    if (!parent) return;

    parent.children = parent.children.filter((i) => i.id !== item.id);
  }

  // Override toJSON for folders to include children.
  public static toJSON(folder: Folder): FolderAsJSON {
    const serialized: FolderAsJSON = {
      ...File.toJSON(folder),
      type: 'folder',
      children: [],
    };
    for (const id in folder.children) {
      const folderOrFile = folder.children[id];

      if (folderOrFile instanceof Folder) {
        serialized.children[id] = Folder.toJSON(folder.children[id] as Folder);
      } else {
        serialized.children[id] = File.toJSON(folder.children[id]);
      }
    }
    return serialized;
  }

  public static fromJSON(json: Object): Folder | File | null {
    // @ts-expect-error
    const { id, name, type, children } = json;

    if (!id || !name || typeof id !== 'number' || typeof name !== 'string')
      return null;

    const parent = new Folder(id, name);

    if (type !== 'folder') return File.fromJSON({ id, name });

    for (const id in children) {
      const child = Folder.fromJSON(children[id]);

      if (!child) continue;

      Folder.addChild(parent, child);
    }
    return parent;
  }
}
