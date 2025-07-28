import { test, expect } from '@playwright/experimental-ct-react';
import { KCardComposedStories } from './helpers';

test.describe('KCard', { tag: '@KCard' }, () => {
  test('render story: <KCard.Primary>', async ({ mount }) => {
    const component = await mount(<KCardComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot('KCard.Primary.png');
  });
});
