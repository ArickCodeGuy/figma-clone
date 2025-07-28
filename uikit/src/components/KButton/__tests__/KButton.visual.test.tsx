import { test, expect } from '@playwright/experimental-ct-react';
import { KButtonComposedStories } from './helpers';

test.describe('KButton', { tag: '@KButton' }, () => {
  test('render story: <KButton.Primary>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.Primary />);

    expect(await component.screenshot()).toMatchSnapshot('KButton.Primary.png');
  });

  test('render story: <KButton.MiniIconButton>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.MiniIconButton />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButton.MiniIconButton.png'
    );
  });

  test('render story: <KButton.MiniWithIcons>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.MiniWithIcons />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButton.MiniWithIcons.png'
    );
  });
});
