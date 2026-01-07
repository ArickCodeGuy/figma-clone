import type { Meta, StoryObj } from '@storybook/react-vite';
import { KModalStory } from './KModalStory';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KModal',
  component: KModalStory,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KModalStory>;

export const Primary: Story = {
  args: {
    isShown: true,
    children: <div>Hello</div>,
    close: fn,
  },
};
