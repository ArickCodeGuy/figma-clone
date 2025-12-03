import { test, expect } from '@playwright/experimental-ct-react';
import { KTitleComposedStories } from './helpers';

test.describe('KTitle', { tag: '@KTitle' }, () => {
  test('render story: <KTitle.Primary>', async ({ mount }) => {
    const component = await mount(<KTitleComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot('KTitle.Primary.png');
  });
});
