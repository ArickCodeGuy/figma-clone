import type { Meta, StoryObj } from '@storybook/react-vite';
import KNestedListDragAndDrop from '../KNestedListDragAndDrop';
import { fn } from 'storybook/test';

export default {
  title: 'Components/KNestedListDragAndDrop',
  component: KNestedListDragAndDrop,
  tags: ['autodocs'],
  args: { onUpdate: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof KNestedListDragAndDrop>;

export const Primary: Story = {
  args: {
    onClick: (id) => {
      console.log('click', id);
    },
    value: {
      id: 1,
      title: 'Layers',
      children: [
        { id: 2, title: 'Rectangle' },
        {
          id: 3,
          title: 'Group A',
          className: 'active',
          children: [
            { id: 4, title: 'Circle' },
            { id: 5, title: 'Line' },
          ],
        },
        { id: 6, title: 'Text' },
        { id: 7, title: 'Group B (empty)', children: [] },
      ],
    },
  },
};

export const Empty: Story = {
  args: {
    value: { id: 1, title: 'Layers', children: [] },
  },
};
