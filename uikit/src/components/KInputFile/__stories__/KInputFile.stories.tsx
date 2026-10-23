import type { Meta, StoryObj } from '@storybook/react-vite';
import KInputFile from '../KInputFile';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KInputFile',
  component: KInputFile,
  tags: ['autodocs'],
  args: { onChange: fn() },
} as Meta;

type Story = StoryObj<typeof KInputFile>;

export const Primary: Story = {
  args: {
    label: 'Sketch',
    accept: '.json',
  },
};

export const WithFiles: Story = {
  args: {
    label: 'Images',
    multiple: true,
    value: [
      new File([''], 'background.png', { type: 'image/png' }),
      new File([''], 'logo.svg', { type: 'image/svg+xml' }),
    ],
  },
};

export const Required: Story = {
  args: {
    label: 'Import',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
