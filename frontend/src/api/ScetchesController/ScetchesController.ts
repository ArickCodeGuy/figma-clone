const API_PREVIX = '/api/v1/scetches';

export type ScetchItem = {
  id: number;
  owner_id: number;
  name: string;
  description: string;
};

export type GetScetchesReturnType = Awaited<ReturnType<typeof getScetches>>;

export function createScetchItem(): ScetchItem {
  return {
    id: 0,
    owner_id: 0,
    name: '',
    description: '',
  };
}

async function getScetches() {
  const res = await fetch(API_PREVIX);
  const json = await res.json();

  return json as ScetchItem[];
}

export const ScetchesController = {
  getScetches,
};
