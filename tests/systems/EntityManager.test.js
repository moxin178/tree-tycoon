import { EntityManager } from '../../js/systems/EntityManager.js';
import { Worker, WorkerQuality } from '../../js/entities/Worker.js';
import { Sawmill } from '../../js/buildings/Sawmill.js';

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
    const worker = new Worker(0, 0, WorkerQuality.COMMON);
    const sawmill = new Sawmill(2, 2);
    sawmill.addInput('wood', 5);
    worker.assignedBuildingId = sawmill.id;
    manager.add(worker);

    const context = { buildings: [sawmill], world: {} };

    expect(worker.state).toBe('idle');
    manager.update(0.1, context);
    expect(worker.state).toBe('working');
  });
});
