import { test, expect } from '@playwright/experimental-ct-react';
import { KButtonListComposedStories } from './helpers';

test.describe('KButtonList', { tag: '@KButtonList' }, () => {
  test('render story: <KButtonList.Primary>', async ({ mount }) => {
    const component = await mount(<KButtonListComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButtonList.Primary.png'
    );
  });
});
