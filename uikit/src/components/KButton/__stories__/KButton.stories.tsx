import type { Meta, StoryObj } from '@storybook/react-vite';
import KButton from '../KButton';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KButton',
  component: KButton,
  tags: ['autodocs'],
  args: { onClick: fn() },
} as Meta;

type Story = StoryObj<typeof KButton>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    presetStyle: 'SECONDARY',
  },
};

export const MiniIconTransparentButton: Story = {
  args: {
    iconLeft: 'x',
    size: 'MINI',
    presetStyle: 'TRANSPARENT',
  },
};

export const MiniWithIcons: Story = {
  args: {
    children: 'mini',
    iconLeft: 'star',
    iconRight: { name: 'star' },
    size: 'MINI',
  },
};
