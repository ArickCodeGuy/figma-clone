import { test, expect } from '@playwright/experimental-ct-react';
import { KAccordionComposedStories } from './helpers';

test.describe('KAccordion', { tag: '@KAccordion' }, () => {
  test('render story: <KAccordion.Primary>', async ({ mount }) => {
    const component = await mount(<KAccordionComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KAccordion.Primary.png'
    );
  });

  test('render story: <KAccordion.Secondary>', async ({ mount }) => {
    const component = await mount(<KAccordionComposedStories.Secondary />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KAccordion.Secondary.png'
    );
  });
});
