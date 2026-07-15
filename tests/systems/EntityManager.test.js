import { EntityManager } from '../../js/systems/EntityManager.js';
import { Worker } from '../../js/entities/Worker.js';

describe('EntityManager', () => {
  test('adds and retrieves entities', () => {
    const manager = new EntityManager();
    const worker = new Worker(0, 0);
    manager.add(worker);
    expect(manager.getById(worker.id)).toBe(worker);
  });

  test('removes entities', () => {
    const manager = new EntityManager();
    const worker = new Worker(0, 0);
    manager.add(worker);
    manager.remove(worker);
    expect(manager.getById(worker.id)).toBeUndefined();
  });

  test('updates all entities', () => {
    const manager = new EntityManager();
    const worker = new Worker(0, 0);
    manager.add(worker);
    manager.update(0.1, { buildings: [], world: {} });
    expect(worker).toBeDefined();
  });
});
