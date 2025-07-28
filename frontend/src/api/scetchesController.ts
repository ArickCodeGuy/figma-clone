export type ScetchItem = {
  id: number;
};

async function getScetches() {
  const res = await fetch('/api/v1/scetches');
  const json = await res.json();

  return json as ScetchItem[];
}

export const scetchesController = {
  getScetches,
};
