import type { Meta, StoryObj } from '@storybook/react-vite';
import KCheckbox from '../KCheckbox';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KCheckbox',
  component: KCheckbox,
  tags: ['autodocs'],
  args: { onChange: fn() },
} as Meta;

type Story = StoryObj<typeof KCheckbox>;

export const Primary: Story = {
  args: {
    label: 'Show grid',
    required: true,
  },
};

export const Checked: Story = {
  args: {
    label: 'Snap to grid',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    title: 'Visible',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    checked: true,
  },
};
