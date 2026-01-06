import { test, expect } from '@playwright/experimental-ct-react';
import { KListComposedStories } from './helpers';

test.describe('KList', { tag: '@KList' }, () => {
  test('render story: <KList.Primary>', async ({ mount }) => {
    const component = await mount(<KListComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot('KList.Primary.png');
  });
});
