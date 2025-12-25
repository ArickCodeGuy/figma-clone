import type { Meta, StoryObj } from '@storybook/react-vite';
import KAccordion from '../KAccordion';
import { KButtonList } from '../../KButtonList';

export default {
  title: 'Components/KAccordion',
  component: KAccordion,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KAccordion>;

export const Primary: Story = {
  args: {
    title: 'Title',
    bottom: 'Bottom',
    isOpen: true,
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary',
    bottom: (
      <KButtonList
        // size={'MINI'}
        items={[
          {
            name: 'account-box',
            children: 'account-box',
          },
          {
            name: 'account-circle',
            children: 'account-circle',
          },
        ]}
      />
    ),
    isOpen: true,
  },
};
