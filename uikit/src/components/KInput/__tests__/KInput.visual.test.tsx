import { test, expect } from '@playwright/experimental-ct-react';
import { KInputComposedStories } from './helpers';

test.describe('KInput', { tag: '@KInput' }, () => {
  test('render story: <KInput.Primary>', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.Primary />);

    await expect(component).toHaveClass(/KInput/);
    await expect(component).toHaveClass(/KInput--size-DEFAULT/);
    await expect(component.getByRole('textbox')).toHaveValue(
      'Dummy text '.repeat(10),
    );

    expect(await component.screenshot()).toMatchSnapshot('KInput.Primary.png');
  });

  test('render story: <KInput.WithPlaceholder>', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.WithPlaceholder />);
    const input = component.getByRole('textbox');

    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('placeholder', 'Type your name');
    await expect(component.locator('.KInput-label')).toHaveText('Name');

    expect(await component.screenshot()).toMatchSnapshot(
      'KInput.WithPlaceholder.png',
    );
  });

  test('render story: <KInput.ReadOnly>', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.ReadOnly />);

    await expect(component.getByRole('textbox')).toHaveAttribute('readonly');

    expect(await component.screenshot()).toMatchSnapshot(
      'KInput.ReadOnly.png',
    );
  });

  test('render story: <KInput.Disabled>', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.Disabled />);

    await expect(component.getByRole('textbox')).toBeDisabled();

    expect(await component.screenshot()).toMatchSnapshot(
      'KInput.Disabled.png',
    );
  });

  test('label names the input', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.WithPlaceholder />);

    await expect(component.getByRole('textbox', { name: 'Name' })).toBeVisible();
  });

  test('keeps typed text', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.WithPlaceholder />);
    const input = component.getByRole('textbox');

    // Key by key, so every `input` event is checked
    await input.pressSequentially('Hello');
    await expect(input).toHaveValue('Hello');

    await input.press('Backspace');
    await expect(input).toHaveValue('Hell');

    await input.fill('Replaced');
    await expect(input).toHaveValue('Replaced');
  });

  test('ignores typing when read only', async ({ mount }) => {
    const component = await mount(<KInputComposedStories.ReadOnly />);
    const input = component.getByRole('textbox');

    await input.focus();
    await input.press('End');
    await input.pressSequentially('!!!');

    await expect(input).toHaveValue('Read only value');
  });

  test('passes inputProps to the inner input', async ({ mount }) => {
    const component = await mount(
      <KInputComposedStories.WithPlaceholder
        inputProps={{ id: 'k-input-test', 'aria-describedby': 'hint' }}
      />,
    );
    const input = component.getByRole('textbox');

    await expect(input).toHaveAttribute('id', 'k-input-test');
    await expect(input).toHaveAttribute('aria-describedby', 'hint');
  });
});
