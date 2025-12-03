import type { Meta, StoryObj } from '@storybook/react-vite';
import KButtonList from '../KButtonList';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KButtonList',
  component: KButtonList,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KButtonList>;

export const Primary: Story = {
  args: {
    items: [
      {
        name: 'close',
        onClick: () => fn,
        title: 'Title for button',
      },
      {
        name: 'star-outline',
        onClick: () => fn,
        title: 'Title for button 2',
      },
    ],
    style: {
      flexDirection: 'column',
    },
    size: 'MINI',
  },
};
