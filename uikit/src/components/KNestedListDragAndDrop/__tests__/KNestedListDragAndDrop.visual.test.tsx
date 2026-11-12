import {
  test,
  expect,
  type MountResult,
} from '@playwright/experimental-ct-react';
import { KNestedListDragAndDropComposedStories } from './helpers';
import type {
  KNestedListDragAndDropItem,
  KNestedListDragAndDropUl,
} from '../types';

type Shape =
  | KNestedListDragAndDropItem['id']
  | [KNestedListDragAndDropItem['id'], Shape[]];

/** Rendered tree as ids: `[listId, [itemId, [nestedListId, [...]]]]` */
function readTree(component: MountResult): Promise<Shape> {
  return component.evaluate((root) => {
    function read(ul: Element): Shape {
      const children: Shape[] = [];
      for (const li of Array.from(ul.children)) {
        if (li.classList.contains('KNestedListDragAndDrop-item')) {
          children.push(Number((li as HTMLElement).dataset.id));
        } else if (li.classList.contains('KNestedListDragAndDrop-nested')) {
          children.push(read(li.firstElementChild!));
        }
      }
      return [Number((ul as HTMLElement).dataset.id), children];
    }
    return read(root.querySelector('.KNestedListDragAndDrop-ul')!);
  });
}

function toShape(ul: KNestedListDragAndDropUl): Shape {
  return [
    ul.id,
    (ul.children ?? []).map((c) =>
      'children' in c && Array.isArray(c.children) ? toShape(c) : c.id,
    ),
  ];
}

const item = (component: MountResult, id: number) =>
  component.locator(`.KNestedListDragAndDrop-item[data-id="${id}"]`);
const list = (component: MountResult, id: number) =>
  component.locator(`.KNestedListDragAndDrop-ul[data-id="${id}"]`);
const listTitle = (component: MountResult, id: number) =>
  list(component, id).locator('> .KNestedListDragAndDrop-title');

/** Point inside the left or right half of list `id`, on its title row */
async function listHalf(
  component: MountResult,
  id: number,
  half: 'left' | 'right',
) {
  const ul = (await list(component, id).boundingBox())!;
  const title = (await listTitle(component, id).boundingBox())!;
  const x = half === 'left' ? ul.width * 0.25 : ul.width * 0.75;
  return { x: ul.x - title.x + x, y: title.height / 2 };
}

const INITIAL: Shape = [1, [2, [3, [4, 5]], 6, [7, []]]];

test.describe(
  'KNestedListDragAndDrop',
  { tag: '@KNestedListDragAndDrop' },
  () => {
    test('render story: <KNestedListDragAndDrop.Primary>', async ({
      mount,
    }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      expect(await readTree(component)).toEqual(INITIAL);
      expect(await component.screenshot()).toMatchSnapshot(
        'KNestedListDragAndDrop.Primary.png',
      );
    });

    test('render story: <KNestedListDragAndDrop.Empty>', async ({ mount }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Empty />,
      );

      expect(await readTree(component)).toEqual([1, []]);
      expect(await component.screenshot()).toMatchSnapshot(
        'KNestedListDragAndDrop.Empty.png',
      );
    });

    test('item onto item: after it', async ({ mount }) => {
      const updates: Shape[] = [];
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary
          onUpdate={(tree) => updates.push(toShape(tree))}
        />,
      );

      await item(component, 6).dragTo(item(component, 2));

      const expected: Shape = [1, [2, 6, [3, [4, 5]], [7, []]]];
      expect(await readTree(component)).toEqual(expected);
      await expect.poll(() => updates).toEqual([expected]);
    });

    test('item into a nested list: after the nested item', async ({
      mount,
    }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      await item(component, 2).dragTo(item(component, 4));

      expect(await readTree(component)).toEqual([
        1,
        [[3, [4, 2, 5]], 6, [7, []]],
      ]);
    });

    test('right half of a list: first inside it', async ({ mount }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      await item(component, 6).dragTo(listTitle(component, 3), {
        targetPosition: await listHalf(component, 3, 'right'),
      });

      expect(await readTree(component)).toEqual([
        1,
        [2, [3, [6, 4, 5]], [7, []]],
      ]);
    });

    test('right half of an empty list: inside it', async ({ mount }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      await item(component, 2).dragTo(listTitle(component, 7), {
        targetPosition: await listHalf(component, 7, 'right'),
      });

      expect(await readTree(component)).toEqual([
        1,
        [[3, [4, 5]], 6, [7, [2]]],
      ]);
    });

    test('left half of a list: after it, same level', async ({ mount }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      // Out of the group, right after it
      await item(component, 4).dragTo(listTitle(component, 3), {
        targetPosition: await listHalf(component, 3, 'left'),
      });

      expect(await readTree(component)).toEqual([
        1,
        [2, [3, [5]], 4, 6, [7, []]],
      ]);
    });

    test('a whole list moves with its items', async ({ mount }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      await listTitle(component, 3).dragTo(listTitle(component, 7), {
        targetPosition: await listHalf(component, 7, 'right'),
      });

      expect(await readTree(component)).toEqual([
        1,
        [2, 6, [7, [[3, [4, 5]]]]],
      ]);
    });

    test('a list can not go inside itself', async ({ mount }) => {
      const updates: Shape[] = [];
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary
          onUpdate={(tree) => updates.push(toShape(tree))}
        />,
      );

      await listTitle(component, 3).dragTo(item(component, 4));

      expect(await readTree(component)).toEqual(INITIAL);
      expect(updates).toEqual([]);
    });

    test('shows where the item will land', async ({ mount, page }) => {
      const component = await mount(
        <KNestedListDragAndDropComposedStories.Primary />,
      );

      await item(component, 6).hover();
      await page.mouse.down();

      const right = await listHalf(component, 3, 'right');
      await listTitle(component, 3).hover({ position: right });
      await listTitle(component, 3).hover({
        position: { x: right.x + 1, y: right.y },
      });
      await expect(list(component, 3)).toHaveClass(
        /KNestedListDragAndDrop-ul--drop-inside/,
      );

      const left = await listHalf(component, 3, 'left');
      await listTitle(component, 3).hover({ position: left });
      await expect(list(component, 3)).toHaveClass(
        /KNestedListDragAndDrop-ul--drop-after/,
      );

      await item(component, 2).hover();
      await item(component, 2).hover({ position: { x: 10, y: 5 } });
      await expect(item(component, 2)).toHaveClass(
        /KNestedListDragAndDrop-item--drop-after/,
      );

      await page.mouse.up();
      await expect(component.locator('[class*="--drop-"]')).toHaveCount(0);
    });
  },
);
