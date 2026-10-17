import { store } from '../../store/store';
import {
  popupClosed,
  popupShown,
  type PopupContentProps,
  type PopupName,
} from '../../store/popup';
import type { SketchItem } from '../../api/sketchesController';
import { POPUPS_PROPS } from './popups';

function openPopup<N extends PopupName>(
  name: N,
  contentProps: PopupContentProps[N],
): void {
  const modalProps = POPUPS_PROPS[name];
  store.dispatch(popupShown({ name, modalProps, contentProps }));
}

/** Login / registration form */
export function showLoginPopup(): void {
  openPopup('login', {});
}

/** Create or edit a sketch. Pass `createSketchItem()` (id `-1`) to create a new one */
export function showSketchPopup(sketch: SketchItem): void {
  openPopup('sketch', { sketch });
}

export function closePopup(): void {
  store.dispatch(popupClosed());
}
