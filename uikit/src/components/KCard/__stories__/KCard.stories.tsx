import type { Meta, StoryObj } from '@storybook/react-vite';
import KCard from '../KCard';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KCard',
  component: KCard,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KCard>;

export const Primary: Story = {
  args: {
    title: 'Primary ' + 'very '.repeat(10) + 'long title',
    description: 'Image description',
    actions: [
      {
        description: 'Remove from favorite',
        icon: 'star',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Add to favorite',
        icon: 'star-outline',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Something something',
        icon: 'close',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Action description 4',
        icon: 'bookmark',
        onClick: () => {
          fn();
        },
      },
    ],
  },
};
