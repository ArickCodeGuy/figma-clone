import { test, expect } from '@playwright/experimental-ct-react';
import { KCheckboxComposedStories } from './helpers';

test.describe('KCheckbox', { tag: '@KCheckbox' }, () => {
  test('render story: <KCheckbox.Primary>', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.Primary />);

    await expect(component).toHaveClass(/KCheckbox/);
    await expect(component.getByRole('checkbox')).not.toBeChecked();

    expect(await component.screenshot()).toMatchSnapshot(
      'KCheckbox.Primary.png',
    );
  });

  test('render story: <KCheckbox.Checked>', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.Checked />);

    await expect(component).toHaveClass(/KCheckbox--checked/);
    await expect(component.getByRole('checkbox')).toBeChecked();

    expect(await component.screenshot()).toMatchSnapshot(
      'KCheckbox.Checked.png',
    );
  });

  test('render story: <KCheckbox.WithoutLabel>', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.WithoutLabel />);

    expect(await component.screenshot()).toMatchSnapshot(
      'KCheckbox.WithoutLabel.png',
    );
  });

  test('render story: <KCheckbox.Disabled>', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.Disabled />);

    await expect(component).toHaveClass(/KCheckbox--disabled/);
    await expect(component.getByRole('checkbox')).toBeDisabled();

    expect(await component.screenshot()).toMatchSnapshot(
      'KCheckbox.Disabled.png',
    );
  });

  test('render story: <KCheckbox.DisabledChecked>', async ({ mount }) => {
    const component = await mount(
      <KCheckboxComposedStories.DisabledChecked />,
    );

    expect(await component.screenshot()).toMatchSnapshot(
      'KCheckbox.DisabledChecked.png',
    );
  });

  test('toggles on click', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.Primary />);
    const checkbox = component.getByRole('checkbox');

    await component.click();
    await expect(checkbox).toBeChecked();
    await expect(component).toHaveClass(/KCheckbox--checked/);

    await component.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('does not toggle when disabled', async ({ mount }) => {
    const component = await mount(<KCheckboxComposedStories.Disabled />);

    await component.click({ force: true });
    await expect(component.getByRole('checkbox')).not.toBeChecked();
  });
});
