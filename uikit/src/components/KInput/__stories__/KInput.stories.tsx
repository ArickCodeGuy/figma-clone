import type { Meta, StoryObj } from '@storybook/react-vite';
import KInput from '../KInput';

export default {
  title: 'Components/KInput',
  component: KInput,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KInput>;

export const Primary: Story = {
  args: {
    value: 'Dummy text '.repeat(10),
    label: 'label '.repeat(20),
    onInput: function (v) {
      this.value = v;
    },
  },
};
