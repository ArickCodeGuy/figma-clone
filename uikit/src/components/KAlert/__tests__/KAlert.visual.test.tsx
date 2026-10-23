import { test, expect } from '@playwright/experimental-ct-react';
import { KAlertComposedStories } from './helpers';

test.describe('KAlert', { tag: '@KAlert' }, () => {
  test('render story: <KAlert.Success>', async ({ mount }) => {
    const component = await mount(<KAlertComposedStories.Success />);

    await expect(component).toHaveClass(/KAlert--type-SUCCESS/);
    await expect(component).toHaveAttribute('role', 'status');

    expect(await component.screenshot()).toMatchSnapshot('KAlert.Success.png');
  });

  test('render story: <KAlert.Warning>', async ({ mount }) => {
    const component = await mount(<KAlertComposedStories.Warning />);

    await expect(component).toHaveClass(/KAlert--type-WARNING/);
    await expect(component).toHaveAttribute('role', 'alert');

    expect(await component.screenshot()).toMatchSnapshot('KAlert.Warning.png');
  });

  test('render story: <KAlert.Error>', async ({ mount }) => {
    const component = await mount(<KAlertComposedStories.Error />);

    await expect(component).toHaveClass(/KAlert--type-ERROR/);
    await expect(component).toHaveAttribute('role', 'alert');

    expect(await component.screenshot()).toMatchSnapshot('KAlert.Error.png');
  });

  test('render story: <KAlert.WithoutTitle>', async ({ mount }) => {
    const component = await mount(<KAlertComposedStories.WithoutTitle />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KAlert.WithoutTitle.png',
    );
  });

  test('close button calls onClose', async ({ mount }) => {
    let closed = 0;
    const component = await mount(
      <KAlertComposedStories.Error onClose={() => closed++} />,
    );

    await component.getByRole('button', { name: 'Close' }).click();
    expect(closed).toBe(1);
  });

  test('no close button without onClose', async ({ mount }) => {
    const component = await mount(<KAlertComposedStories.Success />);

    await expect(component.getByRole('button')).toHaveCount(0);
  });
});
