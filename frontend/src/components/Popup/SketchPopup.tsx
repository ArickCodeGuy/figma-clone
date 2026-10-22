import { KButton, KInput, KTitle } from 'figmaclone-uikit';
import { CSSProperties, useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  SketchRequestError,
  sketchesController,
  type SketchItem,
} from '../../api/sketchesController';
import { popupClosed } from '../../store/popup';
import { replaceRouteParams } from '../../router/replaceRouteParams';

/**
 * Create or edit a sketch's title and description.
 * Shown with `showSketchPopup(sketch)`; `sketch.id === -1` creates a new one
 */
export function SketchPopup(props: { sketch: SketchItem }) {
  const id = props.sketch.id;
  const isCreate = id === -1;

  const dispatch = useDispatch();
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
