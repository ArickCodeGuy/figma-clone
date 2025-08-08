import type { Meta, StoryObj } from '@storybook/react-vite';
import KCardSceleton from '../KCardSceleton';

export default {
  title: 'Components/KCard',
  component: KCardSceleton,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KCardSceleton>;

export const Sceleton: Story = {};
