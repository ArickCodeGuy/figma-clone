import type { Meta, StoryObj } from '@storybook/react-vite';
import KSelect from '../KSelect';
import { fn } from 'storybook/test';
import type { KSelectOption } from '../types';

export default {
  title: 'Components/KSelect',
  component: KSelect,
  tags: ['autodocs'],
  args: { onChange: fn() },
} as Meta;

type Story = StoryObj<typeof KSelect<string>>;

const options: KSelectOption<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
];

const shapes: KSelectOption<string>[] = [
  { value: 'line', label: 'Line', icon: 'slash' },
  { value: 'circle', label: 'Circle', icon: 'circle' },
  { value: 'square', label: 'Square', icon: 'square' },
];

/** Leaves room for the dropdown, so it fits in screenshots and docs */
const withDropdownSpace = (Story: React.ComponentType) => (
  <div style={{ display: 'inline-block', minHeight: 340, minWidth: 240 }}>
    <Story />
  </div>
);

export const Primary: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Choose a fruit',
    options,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Fruit',
    options,
    value: 'banana',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Shape',
    options: shapes,
    value: 'circle',
    isOpen: true,
  },
  decorators: [withDropdownSpace],
};

export const Opened: Story = {
  args: {
    label: 'Fruit',
    options,
    value: 'banana',
    isOpen: true,
  },
  decorators: [withDropdownSpace],
};

export const Disabled: Story = {
  args: {
    label: 'Fruit',
    options,
    value: 'apple',
    disabled: true,
  },
};
