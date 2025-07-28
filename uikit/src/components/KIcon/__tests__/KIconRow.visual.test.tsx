import { test, expect } from '@playwright/experimental-ct-react';
import { KIconRowComposedStories } from './helpersRow';

test.describe('KIconRow', { tag: '@KIconRow' }, () => {
  test('render story: <KIconRow.Row>', async ({ mount }) => {
    const component = await mount(<KIconRowComposedStories.Row />);

    expect(await component.screenshot()).toMatchSnapshot('KIconRow.Row.png');
  });
});
