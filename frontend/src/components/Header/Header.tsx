import './styles.scss';
import { KButton } from 'figmaclone-uikit';
import { showLoginPopup, showSketchPopup } from '../Popup/showPopup';
import { createSketchItem } from '../../api/sketchesController';

export function Burger() {
  return (
    <div className="Burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <Burger />

        <KButton onClick={() => showLoginPopup}>Login</KButton>
        {/* <KButton onClick={() => showSketchPopup(createSketchItem())}>
          Sketch
        </KButton> */}
      </div>
    </header>
  );
}
