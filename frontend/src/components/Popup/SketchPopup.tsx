import { KButton, KInput, KTitle } from 'figmaclone-uikit';
import { CSSProperties, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createSketchItemFull,
  sketchesController,
  type SketchItem,
} from '../../api/sketchesController';
import { popupClosed } from '../../store/popup';
import { replaceRouteParams } from '../../router/replaceRouteParams';
import {
  localSketchDeleted,
  localSketchSaved,
  selectLocalSketch,
} from '../../store/localSketches';

/**
 * Create or edit a sketch's title and description.
 * Shown with `showSketchPopup(sketch)`; `sketch.id === -1` creates a new one.
 * With `isLocal` (`showLocalSketchPopup`) it edits the sketch stored in the browser
 */
export function SketchPopup(props: { sketch: SketchItem; isLocal?: boolean }) {
  const id = props.sketch.id;
  // The local sketch also has id `-1`, but always exists already
  const isCreate = id === -1 && !props.isLocal;

  const dispatch = useDispatch();
  // Its `content`, which the title and description edit must keep
  const localSketch = useSelector(selectLocalSketch);
  const navigate = useNavigate();
  const [title, setTitle] = useState(props.sketch.title ?? '');
  const [description, setDescription] = useState(
    props.sketch.description ?? '',
  );
  const [isLoading, setIsLoading] = useState(false);

  /** Runs a request, shows its error, closes the popup on success */
  async function run(action: () => Promise<void>) {
    setIsLoading(true);
    try {
      await action();
      dispatch(popupClosed());
    } catch (err) {
      // @@TODO create store for alerts
      // msg: 'Could not reach the server'
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await run(async () => {
      if (props.isLocal) {
        dispatch(
          localSketchSaved({
            ...(localSketch ?? createSketchItemFull()),
            title: title.trim(),
            description,
          }),
        );
        return;
      }

      if (isCreate) {
        const created = await sketchesController.createSketch({
          title: title.trim(),
          description,
          content: '',
        });
        navigate(replaceRouteParams('SKETCH', { id: created.id }));
        return;
      }

      // The update replaces `content` too, so send the current one back
      const current = await sketchesController.getSketch(id);
      await sketchesController.updateSketch({
        ...current,
        title: title.trim(),
        description,
      });
    });
  }

  async function handleDelete() {
    if (isCreate) return;

    if (props.isLocal) {
      await run(async () => {
        dispatch(localSketchDeleted(id));
      });
      return;
    }

    await run(() => sketchesController.deleteSketch(id));
  }

  return (
    <div className="SketchPopup">
      <KTitle>{isCreate ? 'New sketch' : 'Edit sketch'}</KTitle>
      <form onSubmit={handleSubmit}>
        <div
          className="krow"
          style={{ '--column-gap': '10px' } as CSSProperties}
        >
          <div className="kcol-12">
            <KInput value={title} required label="Title" onChange={setTitle} />
          </div>
          <div className="kcol-12">
            <KInput
              value={description}
              label="Description"
              onChange={setDescription}
            />
          </div>
          <div className="kcol-12">
            <KButton type="submit" disabled={isLoading}>
              {isCreate ? 'Create' : 'Save'}
            </KButton>
          </div>
          {!isCreate && (
            <div className="kcol-12">
              <KButton
                type="button"
                presetStyle="SECONDARY"
                disabled={isLoading}
                onClick={handleDelete}
              >
                Delete
              </KButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
