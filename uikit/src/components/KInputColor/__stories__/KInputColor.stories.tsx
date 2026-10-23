import type { Meta, StoryObj } from '@storybook/react-vite';
import KInputColor from '../KInputColor';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KInputColor',
  component: KInputColor,
  tags: ['autodocs'],
  args: { onChange: fn() },
} as Meta;

type Story = StoryObj<typeof KInputColor>;

export const Primary: Story = {
  args: {
    value: '#22c55e',
    label: 'Fill',
  },
};

export const Required: Story = {
  args: {
    value: '#ef4444',
    label: 'Stroke',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    value: '#91a3fb',
    label: 'Disabled',
    disabled: true,
  },
};
