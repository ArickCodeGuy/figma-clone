import { test, expect } from '@playwright/experimental-ct-react';
import { KInputFileComposedStories } from './helpers';

test.describe('KInputFile', { tag: '@KInputFile' }, () => {
  test('render story: <KInputFile.Primary>', async ({ mount }) => {
    const component = await mount(<KInputFileComposedStories.Primary />);

    await expect(component).toHaveClass(/KInputFile/);
    await expect(component.getByRole('textbox')).toHaveValue('');
    await expect(component.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'No file chosen',
    );
    await expect(component.getByRole('button', { name: 'Clear' })).toHaveCount(
      0,
    );

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputFile.Primary.png',
    );
  });

  test('render story: <KInputFile.WithFiles>', async ({ mount }) => {
    const component = await mount(<KInputFileComposedStories.WithFiles />);

    await expect(component.getByRole('textbox')).toHaveValue(
      'background.png, logo.svg',
    );

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputFile.WithFiles.png',
    );
  });

  test('render story: <KInputFile.Required>', async ({ mount }) => {
    const component = await mount(<KInputFileComposedStories.Required />);

    await expect(component).toContainText('Import *');

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputFile.Required.png',
    );
  });

  test('render story: <KInputFile.Disabled>', async ({ mount }) => {
    const component = await mount(<KInputFileComposedStories.Disabled />);

    await expect(component.getByRole('textbox')).toBeDisabled();

    expect(await component.screenshot()).toMatchSnapshot(
      'KInputFile.Disabled.png',
    );
  });

  test('choosing and clearing files', async ({ mount }) => {
    // `File` objects don't survive the trip from the browser to the test, so count them
    const changes: number[] = [];
    const component = await mount(
      <KInputFileComposedStories.Primary
        multiple
        onChange={(files) => changes.push(files.length)}
      />,
    );

    await component.locator('input[type="file"]').setInputFiles([
      { name: 'a.json', mimeType: 'application/json', buffer: Buffer.from('{}') },
      { name: 'b.json', mimeType: 'application/json', buffer: Buffer.from('{}') },
    ]);
    await expect(component.getByRole('textbox')).toHaveValue('a.json, b.json');

    await component.getByRole('button', { name: 'Clear' }).click();
    await expect(component.getByRole('textbox')).toHaveValue('');

    await expect.poll(() => changes).toEqual([2, 0]);
  });

  test('opens the file dialog from the action and the field', async ({
    mount,
    page,
  }) => {
    const component = await mount(<KInputFileComposedStories.Primary />);

    const fromAction = page.waitForEvent('filechooser');
    await component.getByRole('button', { name: 'Choose file' }).click();
    await fromAction;

    const fromField = page.waitForEvent('filechooser');
    await component.getByRole('textbox').click();
    await fromField;
  });

  test('required blocks form submit until a file is chosen', async ({
    mount,
  }) => {
    const component = await mount(
      <form>
        <KInputFileComposedStories.Required />
      </form>,
    );

    const isValid = () =>
      component.evaluate((form) => (form as HTMLFormElement).checkValidity());

    expect(await isValid()).toBe(false);

    await component.locator('input[type="file"]').setInputFiles({
      name: 'a.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{}'),
    });
    expect(await isValid()).toBe(true);
  });
});
