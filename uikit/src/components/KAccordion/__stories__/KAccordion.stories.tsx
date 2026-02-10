import type { Meta, StoryObj } from '@storybook/react-vite';
import KAccordion from '../KAccordion';
import { KList } from '../../KList';
import { KButton } from '../../KButton';

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
  },
};

export const Secondary: Story = {
  args: {
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium exercitationem id, quasi odit vero quidem voluptates quis, cupiditate facilis laboriosam deleniti voluptate ut sapiente cumque. Minus quidem officiis voluptate enim explicabo, veniam vitae rem. Magni dicta incidunt quod ad quasi excepturi soluta. Officiis modi, possimus sed blanditiis sit cupiditate beatae!',
    bottom: (
      <>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro optio
          nesciunt eaque, officiis sequi autem enim neque reiciendis id nostrum
          consectetur commodi quo laborum itaque laudantium incidunt asperiores
          repellat exercitationem omnis, nulla cum odit odio harum expedita?
          Quasi unde laborum a? Fugiat a, quam aspernatur ullam dolorem nobis
          placeat perferendis.
        </p>
        <KList
          component={KButton}
          items={[
            {
              iconLeft: 'user',
              children: 'user',
            },
            {
              iconLeft: 'angle-up',
              children: 'angle-up',
            },
          ]}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quam
          excepturi, iste debitis neque eos, exercitationem, accusamus assumenda
          ipsa sit saepe. Atque dolor, modi perspiciatis eveniet impedit dolorem
          commodi voluptates, quibusdam hic, minima aliquid. Architecto
          perspiciatis pariatur fuga debitis voluptate unde dignissimos libero
          quod dolorem itaque, reiciendis incidunt sint reprehenderit?
        </p>
      </>
    ),
    isOpen: true,
  },
};
