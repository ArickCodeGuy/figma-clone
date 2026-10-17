import { components } from './schema';
import { authHeaders } from './authController';

const API_PREVIX = '/api/v1/sketches';

export type SketchItemFull = components['schemas']['SketchFullDto'];
export type SketchItem = components['schemas']['SketchDto'];

export type GetSketchesReturnType = Awaited<ReturnType<typeof getSketches>>;

export function createSketchItemFull(): SketchItemFull {
  return {
    id: -1,
    title: 'New untitled sketch',
    description: 'No description',
    content: '',
  };
}

export function createSketchItem(): SketchItem {
  return {
    id: -1,
    title: 'New untitled sketch',
    description: 'No description',
  };
}

async function getSketches() {
  const res = await fetch(API_PREVIX, { headers: authHeaders() });
  const json = await res.json();

  return json as SketchItem[];
}

/** Failed sketch request. `message` is ready to show to the user */
export class SketchRequestError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(ERROR_MESSAGES[status] ?? ERROR_MESSAGES[0]);
    this.name = 'SketchRequestError';
    this.status = status;
  }
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Title is required',
  401: 'Log in to manage sketches',
  404: 'Sketch not found',
  0: 'Something went wrong',
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_PREVIX}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...init.headers,
    },
  });

  if (!res.ok) {
    throw new SketchRequestError(res.status);
  }

  return (await res.json()) as T;
}

/** Sketch with `content` */
function getSketch(id: number): Promise<SketchItemFull> {
  return request(`/${id}`);
}

function createSketch(sketch: SketchItemFull): Promise<SketchItemFull> {
  return request('/create', { method: 'POST', body: JSON.stringify(sketch) });
}

/** Replaces title, description and content. Send the current `content` to keep it */
function updateSketch(sketch: SketchItemFull): Promise<SketchItemFull> {
  return request('/update', { method: 'PUT', body: JSON.stringify(sketch) });
}

async function deleteSketch(id: number): Promise<void> {
  await request<boolean>(`/${id}`, { method: 'DELETE' });
}

export const sketchesController = {
  getSketches,
  getSketch,
  createSketch,
  updateSketch,
  deleteSketch,
};
