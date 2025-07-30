export type ScetchItem = {
  id: number;
  owner_id: number;
  name: string;
  description: string;
};

export type GetScetchesReturnType = Awaited<ReturnType<typeof getScetches>>;

async function getScetches() {
  const res = await fetch('/api/v1/scetches');
  const json = await res.json();

  return json as ScetchItem[];
}

export const scetchesController = {
  getScetches,
};
