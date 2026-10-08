import { ScetchSideMenuProps } from './types';
import './styles.scss';
import { KButton, KButtonProps, KList, KTitle } from 'figmaclone-uikit';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store/store';
import { ScetchFigureEdit } from '../ScetchFigureEdit/ScetchFigureEdit';
import { CirclePlacerHandState } from '../../classes/handStates/circlePlacerHandState';
import { RectanglePlacerHandState } from '../../classes/handStates/rectanglePlacerHandState';

export function ScetchSideMenu(props: ScetchSideMenuProps) {
  const actions: KButtonProps[] = [
    {
      title: 'Choose & Drag',
      size: 'MINI',
      iconLeft: 'arrow-pointer',
      onClick: () => {
        console.log('Choose & Drag');
      },
    },
    {
      title: 'Move canvas',
      size: 'MINI',
      iconLeft: 'hand',
      onClick: () => {
        console.log('Move canvas');
      },
    },
  ];

  const figures: KButtonProps[] = [
    {
      title: 'Line',
      size: 'MINI',
      iconLeft: 'lines-leaning',
      onClick: () => {
        console.log('Line');
      },
    },
    {
      title: 'Circle',
      size: 'MINI',
      iconLeft: 'circle',
      onClick: () => {
        state.handState = new CirclePlacerHandState();
      },
    },
    {
      title: 'Rectangle',
      size: 'MINI',
      iconLeft: 'square',
      onClick: () => {
        state.handState = new RectanglePlacerHandState();
      },
    },
  ];

  const state = useSelector<StoreState, StoreState['canvas']['state']>(
    (state) => state.canvas.state,
  );

  return (
    <div className="ScetchSideMenu">
      <div className="side-menu-list">
        <div>
          <KTitle> Actions </KTitle>
          <KList component={KButton} items={actions} />
        </div>
        <div>
          <KTitle> Figures </KTitle>
          <KList component={KButton} items={figures} />
        </div>
        <div>
          <KTitle> Edit figure </KTitle>
          <ScetchFigureEdit />
        </div>
      </div>
    </div>
  );
}
