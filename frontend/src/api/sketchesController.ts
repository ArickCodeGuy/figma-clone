import { components } from './schema';

const API_PREVIX = '/api/v1/sketches';

export type SketchItem = components['schemas']['SketchFullDto'];

export type GetSketchesReturnType = Awaited<ReturnType<typeof getSketches>>;

export function createSketchItem(): SketchItem {
  return {
    id: 0,
    title: '',
    description: '',
    content: '',
  };
}

async function getSketches() {
  const res = await fetch(API_PREVIX);
  const json = await res.json();

  return json as SketchItem[];
}

export const sketchesController = {
  getSketches,
};
