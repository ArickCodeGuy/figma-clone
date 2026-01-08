import { ScetchSideMenuProps } from './types';
import './styles.scss';
import {
  KAccordion,
  KButton,
  KButtonProps,
  KList,
  KTitle,
} from 'figmaclone-uikit';

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
        console.log('Circle');
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
