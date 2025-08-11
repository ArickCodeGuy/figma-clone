import { test, expect } from '@playwright/experimental-ct-react';
import { KButtonComposedStories } from './helpers';

test.describe('KButton', { tag: '@KButton' }, () => {
  test('render story: <KButton.Primary>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.Primary />);

    expect(component).toHaveClass(/KButton/);
    expect(component).toHaveClass(/KButton--size-DEFAULT/);
    expect(component).toHaveClass(/KButton--preset-style-DEFAULT/);

    expect(await component.screenshot()).toMatchSnapshot('KButton.Primary.png');
  });

  test('render story: <KButton.Secondary>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.Secondary />);

    expect(component).toHaveClass(/KButton--preset-style-SECONDARY/);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButton.Secondary.png'
    );
  });

  test('render story: <KButton.MiniIconTransparentButton>', async ({
    mount,
  }) => {
    const component = await mount(
      <KButtonComposedStories.MiniIconTransparentButton />
    );

    expect(component).toHaveClass(/KButton--size-MINI/);
    expect(component).toHaveClass(/KButton--preset-style-TRANSPARENT/);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButton.MiniIconTransparentButton.png'
    );
  });

  test('render story: <KButton.MiniWithIcons>', async ({ mount }) => {
    const component = await mount(<KButtonComposedStories.MiniWithIcons />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KButton.MiniWithIcons.png'
    );
  });
});
