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
import { CircleHandState } from '../../classes/HandState/Figures/CirCleHandState';

export function ScetchSideMenu(props: ScetchSideMenuProps) {
  const actions: KButtonProps[] = [
    {
      title: 'Choose & Drag',
      size: 'MINI',
      iconLeft: 'cursor-default',
      onClick: () => {
        console.log('Choose & Drag');
      },
    },
    {
      title: 'Move canvas',
      size: 'MINI',
      iconLeft: 'hand-back-left',
      onClick: () => {
        console.log('Move canvas');
      },
    },
  ];

  const figures: KButtonProps[] = [
    {
      title: 'Line',
      size: 'MINI',
      iconLeft: 'vector-line',
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
        console.log('Square');
      },
    },
  ];

  const state = useSelector<StoreState, StoreState['canvas']['state']>(
    (state) => state.canvas.state
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
