import { test, expect } from '@playwright/experimental-ct-react';
import { KSelectComposedStories } from './helpers';

test.describe('KSelect', { tag: '@KSelect' }, () => {
  test('render story: <KSelect.Primary>', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.Primary />);

    await expect(component).toHaveClass(/KSelect/);
    await expect(component.getByRole('combobox')).toHaveValue('');
    await expect(component.getByRole('combobox')).toHaveAttribute(
      'placeholder',
      'Choose a fruit',
    );
    await expect(component.getByRole('combobox')).toHaveAttribute(
      'readonly',
    );
    await expect(component.getByRole('listbox')).toBeHidden();

    expect(await component.screenshot()).toMatchSnapshot('KSelect.Primary.png');
  });

  test('render story: <KSelect.WithValue>', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.WithValue />);

    await expect(component.getByRole('combobox')).toHaveValue('Banana');

    expect(await component.screenshot()).toMatchSnapshot(
      'KSelect.WithValue.png',
    );
  });

  test('render story: <KSelect.WithIcons>', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.WithIcons />);

    await expect(component.getByRole('listbox')).toBeVisible();

    // Finishes the option highlight transition before the screenshot
    expect(
      await component.screenshot({ animations: 'disabled' }),
    ).toMatchSnapshot('KSelect.WithIcons.png');
  });

  test('render story: <KSelect.Opened>', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.Opened />);

    await expect(component.getByRole('listbox')).toBeVisible();
    await expect(
      component.getByRole('option', { name: 'Banana' }),
    ).toHaveAttribute('aria-selected', 'true');

    // Finishes the option highlight transition before the screenshot
    expect(
      await component.screenshot({ animations: 'disabled' }),
    ).toMatchSnapshot('KSelect.Opened.png');
  });

  test('render story: <KSelect.Disabled>', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.Disabled />);

    await expect(component).toHaveClass(/KSelect--disabled/);

    expect(await component.screenshot()).toMatchSnapshot(
      'KSelect.Disabled.png',
    );
  });

  test('picks an option with the mouse', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.Primary />);
    const combobox = component.getByRole('combobox');

    await combobox.click();
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');
    await expect(component.getByRole('listbox')).toBeVisible();

    // Disabled options can't be picked
    await component
      .getByRole('option', { name: 'Durian' })
      .click({ force: true });
    await expect(component.getByRole('listbox')).toBeVisible();

    await component.getByRole('option', { name: 'Cherry' }).click();
    await expect(combobox).toHaveValue('Cherry');
    await expect(component.getByRole('listbox')).toBeHidden();
  });

  test('picks an option with the keyboard', async ({ mount, page }) => {
    const component = await mount(<KSelectComposedStories.Primary />);
    const combobox = component.getByRole('combobox');

    await combobox.focus();
    await page.keyboard.press('ArrowDown'); // opens, "Apple" is active
    await expect(component.getByRole('listbox')).toBeVisible();

    await page.keyboard.press('ArrowDown'); // "Banana"
    await page.keyboard.press('ArrowDown'); // "Cherry"
    await page.keyboard.press('ArrowDown'); // skips disabled "Durian"
    await page.keyboard.press('Enter');

    await expect(combobox).toHaveValue('Elderberry');
    await expect(component.getByRole('listbox')).toBeHidden();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(component.getByRole('listbox')).toBeHidden();
    await expect(combobox).toHaveValue('Elderberry');
  });

  test('closes on outside click', async ({ mount, page }) => {
    const component = await mount(<KSelectComposedStories.Primary />);

    await component.getByRole('combobox').click();
    await expect(component.getByRole('listbox')).toBeVisible();

    await page.mouse.click(1000, 600);
    await expect(component.getByRole('listbox')).toBeHidden();
  });

  test('does not open when disabled', async ({ mount }) => {
    const component = await mount(<KSelectComposedStories.Disabled />);

    await component.getByRole('combobox').click({ force: true });
    await expect(component.getByRole('listbox')).toBeHidden();
  });
});
