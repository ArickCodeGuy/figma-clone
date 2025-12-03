import type { Meta, StoryObj } from '@storybook/react-vite';
import KIcon from '../KIcon';

export default {
  title: 'Components/KIcon',
  component: KIcon,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KIcon>;

export const Primary: Story = {
  args: {
    name: 'close',
    size: 16,
  },
};
