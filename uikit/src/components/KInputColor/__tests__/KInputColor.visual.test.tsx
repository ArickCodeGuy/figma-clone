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

  test('a click on the field lands on the native color input', async ({
    mount,
    page,
  }) => {
    const component = await mount(<KInputColorComposedStories.Primary />);

    // Text, swatch and palette button are all covered by the native input
    const box = (await component.getByRole('textbox').boundingBox())!;
    for (const x of [box.x + 5, box.x + box.width / 2, box.x + box.width - 25]) {
      const hit = await page.evaluate(
        ([px, py]) => {
          const el = document.elementFromPoint(px, py) as HTMLInputElement;
          return `${el.tagName}:${el.type}`;
        },
        [x, box.y + box.height / 2],
      );
      expect(hit).toBe('INPUT:color');
    }
  });

  test('picker reports the color like a browser does', async ({ mount }) => {
    const changes: string[] = [];
    const component = await mount(
      <KInputColorComposedStories.Primary onChange={(v) => changes.push(v)} />,
    );

    // The picker sets the value internally, bypassing React's value setter
    await component
      .locator('input[type="color"]')
      .evaluate((el: HTMLInputElement) => {
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value',
        )!.set!.call(el, '#abcdef');
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });

    await expect(component.getByRole('textbox')).toHaveValue('#abcdef');
    await expect.poll(() => changes).toEqual(['#abcdef']);
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
