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
    description: 'Primary description',
    actions: [
      {
        description: 'Action description',
        icon: 'star',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Action description 2',
        icon: 'star-outline',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Action description 3',
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
