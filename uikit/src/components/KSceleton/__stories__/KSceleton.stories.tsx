import type { Meta, StoryObj } from '@storybook/react-vite';
import KSceleton from '../KSceleton';

export default {
  title: 'Components/KSceleton',
  component: KSceleton,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KSceleton>;

export const Primary: Story = {
  args: {
    width: 128,
    height: 128,
  },
};

export const NoAnimate: Story = {
  args: {
    width: 128,
    height: 128,
    animate: false,
  },
};
