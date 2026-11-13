import { KCheckbox, KInput } from 'figmaclone-uikit';
import { Folder } from '../../classes/FileSystem';
import { ValueEditProps } from './types';

export type FolderEditProps = ValueEditProps<Folder>;

type FolderPatch = Partial<Pick<Folder, 'name' | 'isHidden'>>;

/** Hiding a folder hides everything inside it, see `Folder.draw` */
export function FolderEdit(props: FolderEditProps) {
  function update(patch: FolderPatch) {
    const v = props.value;
    props.onUpdate(
      new Folder(
        patch.name ?? v.name,
        // Same array: `apply` copies it back onto the folder in the sketch
        v.children,
        patch.isHidden ?? v.isHidden,
      ),
    );
  }

  return (
    <div className="krow">
      <div className="kcol-12">
        <KInput
          value={props.value.name}
          onChange={(name) => update({ name })}
        />
      </div>
      <div className="kcol-12">
        <KCheckbox
          label="Hidden"
          checked={props.value.isHidden}
          onChange={(isHidden) => update({ isHidden })}
        />
      </div>
    </div>
  );
}
