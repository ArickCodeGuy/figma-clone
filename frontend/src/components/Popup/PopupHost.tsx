import { KModal } from 'figmaclone-uikit';
import { useDispatch, useSelector } from 'react-redux';
import type { StoreState } from '../../store/store';
import { popupClosed } from '../../store/popup';
import { POPUPS } from './popups';
import type { ComponentType } from 'react';

/** The one `KModal` of the app. Rendered once in `App`, controlled by the `popup` slice */
export function PopupHost() {
  const popup = useSelector<StoreState, StoreState['popup']>(
    (state) => state.popup,
  );
  const dispatch = useDispatch();

  // `contentProps` were stored together with `name` by `showPopup.ts`, so they match
  const Content = popup.name
    ? (POPUPS[popup.name] as ComponentType<object>)
    : null;

  return (
    <KModal
      isShown={popup.isShown}
      close={() => dispatch(popupClosed())}
      className={popup.modalProps.className}
      style={popup.modalProps.style}
    >
      {Content && <Content key={popup.showId} {...popup.contentProps} />}
    </KModal>
  );
}
