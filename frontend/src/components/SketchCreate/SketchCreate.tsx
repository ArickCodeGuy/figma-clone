import { KCard } from 'figmaclone-uikit';
import { useNavigate } from 'react-router-dom';
import { replaceRouteParams } from '../../router/replaceRouteParams';
import { LOCAL_SKETCH_ID } from '../../api/localSketches';
import {
  createSketchItemFull,
  sketchesController,
} from '../../api/sketchesController';
import { useAuthToken } from '../../hooks/useAuthToken';
import { showLoginPopup } from '../Popup/showPopup';
import { clearLocalSketches } from '../../store/localSketches';
import { useDispatch } from 'react-redux';

type SketchCreateProps = {
  /** Opens the sketch stored in localStorage instead of creating one on the backend */
  isLocal?: boolean;
};

export function SketchCreate(props: SketchCreateProps) {
  const navigate = useNavigate();
  const token = useAuthToken();
  const dispatch = useDispatch();

  async function handleOnClick() {
    if (props.isLocal) {
      dispatch(clearLocalSketches());
      navigate(replaceRouteParams('SKETCH', { id: LOCAL_SKETCH_ID }));
      return;
    }

    // Backend sketches belong to a user
    if (!token) {
      showLoginPopup();
      return;
    }

    // Create sketch and navigate to it
    const { title, description, content } = createSketchItemFull();
    const item = await sketchesController.createSketch({
      title,
      description,
      content,
    });
    navigate(replaceRouteParams('SKETCH', { id: item.id }));
  }

  return <KCard title="Create new sketch" onClick={handleOnClick} />;
}
