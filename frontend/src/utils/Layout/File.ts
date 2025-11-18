import { FILE_ID } from './FileSystem';
import type { Folder } from './Folder';

export type FileAsJSON = { id: FILE_ID; name: string };

export class File {
  public id: FILE_ID;
  public name: string;
  public parent?: Folder;

  constructor(id: FILE_ID, name: string, parent?: Folder) {
    if (!name || name.includes('/')) {
      throw new Error('File name cannot be empty or contain slashes.');
    }
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  public static getPath(file: File): string {
    if (file.parent) {
      return `${File.getPath(file.parent)}/${file.name}`;
    }
    return file.name;
  }

  public static toJSON(file: File): FileAsJSON {
    const { id, name } = file;
    return { id, name } as const;
  }

  public static fromJSON(json: Object): File | null {
    // @ts-expect-error
    const { id, name } = json;

    if (!id || !name || typeof id !== 'number' || typeof name !== 'string')
      return null;

    return new File(id, name);
  }
}
