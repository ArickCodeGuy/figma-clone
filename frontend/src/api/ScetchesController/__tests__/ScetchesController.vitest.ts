import { describe, expect, test } from 'vitest';
import { createScetchItem, ScetchesController } from '../ScetchesController';

describe('Test ScetchesController', () => {
  test('Fetch scetches', () => {
    // @@TODO Serialized Error: { code: 'ERR_INVALID_URL', input: '/api/v1/scetches' }
    // server.proxy.api doesn't work
    ScetchesController.getScetches().then(async (res) => {
      expect(res.length).toBeGreaterThan(1);
      expect(res[0]).toMatchObject(createScetchItem());
    });
  });
});
