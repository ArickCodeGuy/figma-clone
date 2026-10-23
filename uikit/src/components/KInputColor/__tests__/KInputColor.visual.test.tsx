import { test, expect } from '@playwright/experimental-ct-react';
import { KInputColorComposedStories } from './helpers';

test.describe('KInputColor', { tag: '@KInputColor' }, () => {
  test('render story: <KInputColor.Primary>', async ({ mount }) => {
    const component = await mount(<KInputColorComposedStories.Primary />);

    await expect(component).toHaveClass(/KInputColor/);
    await expect(component.getByRole('textbox')).toHaveValue('#22c55e');
    await expect(component.getByRole('textbox')).toHaveAttribute('readonly');

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputColor.Primary.png',
    );
  });

  test('render story: <KInputColor.Required>', async ({ mount }) => {
    const component = await mount(<KInputColorComposedStories.Required />);

    await expect(component).toContainText('Stroke *');

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputColor.Required.png',
    );
  });

  test('render story: <KInputColor.Disabled>', async ({ mount }) => {
    const component = await mount(<KInputColorComposedStories.Disabled />);

    await expect(component.getByRole('textbox')).toBeDisabled();
    await expect(
      component.getByRole('button', { name: 'Choose color' }),
    ).toBeDisabled();

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputColor.Disabled.png',
    );
  });

  test('picking a color updates the field', async ({ mount }) => {
    const changes: string[] = [];
    const component = await mount(
      <KInputColorComposedStories.Primary
        onChange={(v) => changes.push(v)}
      />,
    );

    // Hidden native input: the picker itself can't be driven, set its value like the picker does
    await component.locator('input[type="color"]').fill('#123456', { force: true });

    await expect(component.getByRole('textbox')).toHaveValue('#123456');
    await expect.poll(() => changes).toEqual(['#123456']);
  });

  test('action button does not submit a form', async ({ mount }) => {
    let submitted = false;
    const component = await mount(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitted = true;
        }}
      >
        <KInputColorComposedStories.Primary />
      </form>,
    );

    await expect(
      component.getByRole('button', { name: 'Choose color' }),
    ).toHaveAttribute('type', 'button');
    expect(submitted).toBe(false);
  });
});
