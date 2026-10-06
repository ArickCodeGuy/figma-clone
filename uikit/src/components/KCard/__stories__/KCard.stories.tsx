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
    link: '/',
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
        icon: 'star-half',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Something something',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
      {
        description: 'Save',
        icon: 'bookmark',
        onClick: () => {
          fn();
        },
      },
    ],
  },
};

export const ActionsOverflow: Story = {
  args: {
    title: 'ActionsOverflow',
    actions: [
      {
        description: '1',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
      {
        description: '2',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
      {
        description: '3',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
      {
        description: '4',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
      {
        description: '5',
        icon: 'x',
        onClick: () => {
          fn();
        },
      },
    ],
  },
};
