import { test, expect } from '@playwright/experimental-ct-react';
import { KSceletonComposedStories } from './helpers';

test.describe('KSceleton', { tag: '@KSceleton' }, () => {
  test('render story: <KSceleton.Primary>', async ({ mount }) => {
    const component = await mount(<KSceletonComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KSceleton.Primary.png'
    );
  });

  test('render story: <KSceleton.NoAnimate>', async ({ mount }) => {
    const component = await mount(<KSceletonComposedStories.NoAnimate />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KSceleton.NoAnimate.png'
    );
  });
});
