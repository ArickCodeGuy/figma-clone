const API_PREVIX = '/api/v1/sketches';

export type SketchItem = {
  id: number;
  owner_id: number;
  name: string;
  description: string;
};

export type GetSketchesReturnType = Awaited<ReturnType<typeof getSketches>>;

export function createSketchItem(): SketchItem {
  return {
    id: 0,
    owner_id: 0,
    name: '',
    description: '',
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
