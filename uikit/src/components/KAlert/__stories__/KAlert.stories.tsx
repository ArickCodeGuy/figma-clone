import type { Meta, StoryObj } from '@storybook/react-vite';
import KAlert from '../KAlert';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KAlert',
  component: KAlert,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KAlert>;

export const Success: Story = {
  args: {
    type: 'SUCCESS',
    title: 'Sketch saved',
    children: 'All changes are stored on the server.',
  },
};

export const Warning: Story = {
  args: {
    type: 'WARNING',
    title: 'Not logged in',
    children: 'The sketch is saved in this browser only.',
  },
};

export const Error: Story = {
  args: {
    type: 'ERROR',
    title: 'Could not save',
    children: 'Could not reach the server.',
    onClose: fn(),
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'ERROR',
    children: 'Wrong username or password',
  },
};
