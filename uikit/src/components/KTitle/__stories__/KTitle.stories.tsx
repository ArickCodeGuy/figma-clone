import type { Meta, StoryObj } from '@storybook/react-vite';
import KTitle from '../KTitle';
import { fn } from 'storybook/internal/test';

export default {
  title: 'Components/KTitle',
  component: KTitle,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KTitle>;

export const Primary: Story = {
  args: {
    children: 'Title',
    actions: [
      {
        icon: 'account-box',
        onClick: fn,
      },
    ],
  },
};
