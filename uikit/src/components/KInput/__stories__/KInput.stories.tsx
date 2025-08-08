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
    value: 'Dummy text',
    onInput: function (v) {
      this.value = v;
    },
  },
};
