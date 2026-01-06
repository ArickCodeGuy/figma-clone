import type { Meta, StoryObj } from '@storybook/react-vite';
import KList from '../KList';
import { fn } from 'storybook/test';
import { KButton, type KButtonProps } from '../../KButton';

export default {
  title: 'Components/KList',
  component: KList,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KList<KButtonProps>>;

export const Primary: Story = {
  args: {
    component: KButton,
    items: [
      {
        iconLeft: 'close',
        onClick: () => fn,
        title: 'Title for button',
      },
      {
        iconLeft: 'star-outline',
        onClick: () => fn,
        title: 'Title for button 2',
      },
    ],
  },
};
