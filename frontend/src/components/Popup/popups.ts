import type { ComponentType } from 'react';
import type { PopupContentProps, PopupName } from '../../store/popup';
import { LoginPopup } from './LoginPopup';
import { KModalProps } from 'figmaclone-uikit';
import { SketchPopup } from './SketchPopup';

/** Content component of every popup. Opened by the functions in `showPopup.ts` */
export const POPUPS: { [N in PopupName]: ComponentType<PopupContentProps[N]> } = {
  login: LoginPopup,
  sketch: SketchPopup,
};

export const POPUPS_PROPS: Record<PopupName, KModalProps> = {
  login: {
    style: {
      width: '250px',
      height: '250px',
    },
  },
  sketch: {},
};
