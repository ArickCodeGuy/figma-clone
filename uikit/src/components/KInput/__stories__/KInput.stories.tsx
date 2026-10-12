import type { Meta, StoryObj } from '@storybook/react-vite';
import KInput from '../KInput';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KInput',
  component: KInput,
  tags: ['autodocs'],
  args: { onChange: fn(), onInput: fn() },
} as Meta;

type Story = StoryObj<typeof KInput>;

export const Primary: Story = {
  args: {
    value: 'Dummy text '.repeat(10),
    label: 'label '.repeat(20),
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    label: 'Name',
    placeholder: 'Type your name',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'Read only value',
    label: 'Read only',
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled value',
    label: 'Disabled',
    disabled: true,
  },
};
