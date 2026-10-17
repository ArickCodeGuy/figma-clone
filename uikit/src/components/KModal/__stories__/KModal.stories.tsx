import type { Meta, StoryObj } from '@storybook/react-vite';
import { KModalStory } from './KModalStory';
import { fn } from 'storybook/test';
import { KTitle } from '../../KTitle';
import { KInput } from '../../KInput';
import { KButton } from '../../KButton';
import { KCheckbox } from '../../KCheckbox';
import type { CSSProperties } from 'react';

export default {
  title: 'Components/KModal',
  component: KModalStory,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof KModalStory>;

export const Primary: Story = {
  args: {
    isShown: true,
    children: <div>KModal.children</div>,
    close: fn,
  },
};

export const Small: Story = {
  args: {
    style: {
      width: '250px',
      height: '250px',
    },
    isShown: true,
    children: (
      <form>
        <KTitle> Login </KTitle>
        <div
          className="krow"
          style={{ '--column-gap': '10px' } as CSSProperties}
        >
          <div className="kcol-12">
            <KInput label="username" value="" />
          </div>
          <div className="kcol-12">
            <KInput
              label="password"
              value=""
              inputProps={{ type: 'password' }}
            />
          </div>
          <div className="kcol-12">
            <KCheckbox checked={true} label="Remember me" />
          </div>
          <div className="kcol-12">
            <KButton type="submit" style={{ marginLeft: 'auto' }}>
              Submit
            </KButton>
          </div>
        </div>
      </form>
    ),
    close: fn,
  },
};
