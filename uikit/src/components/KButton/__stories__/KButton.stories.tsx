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

export const SecondaryTransparent: Story = {
  args: {
    children: 'Secondary and Transparent',
    presetStyle: 'SECONDARY-TRANSPARENT',
  },
};

export const SecondaryTransparentMini: Story = {
  args: {
    children: 'Secondary and Transparent Mini',
    size: 'MINI',
    presetStyle: 'SECONDARY-TRANSPARENT',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
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
