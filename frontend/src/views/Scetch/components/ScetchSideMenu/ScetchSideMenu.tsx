import { ScetchSideMenuProps } from './types';
import './styles.scss';
import {
  KAccordion,
  KButton,
  KButtonProps,
  KList,
  KTitle,
} from 'figmaclone-uikit';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store/store';
import { CircleHandState } from '../../classes/HandState/Figures/CircleHandState';
import { SquareHandState } from '../../classes/HandState/Figures/SquareHandState';

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
        state.handState = new CircleHandState();
      },
    },
    {
      title: 'Square',
      size: 'MINI',
      iconLeft: 'square',
      onClick: () => {
        state.handState = new SquareHandState();
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
      </div>
    </div>
  );
}
