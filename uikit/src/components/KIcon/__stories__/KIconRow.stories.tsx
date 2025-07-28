import type { Meta, StoryObj } from '@storybook/react-vite';
import { KIconStoriesRow } from './KIconStoriesRow';
import { ICON_NAMES_ARR } from '../iconNamesArr';

export default {
  title: 'Components/KIcon',
  component: KIconStoriesRow,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KIconStoriesRow>;

export const Row: Story = {
  args: {
    items: ICON_NAMES_ARR,
  },
};
