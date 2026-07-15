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

  test('throws when adding an entity without an id', () => {
    const manager = new EntityManager();
    const entity = { update: () => {} };
    expect(() => manager.add(entity)).toThrow('Entity must have an id');
  });

  test('removes entities', () => {
    const manager = new EntityManager();
    const worker = new Worker(0, 0);
    manager.add(worker);
    manager.remove(worker);
    expect(manager.getById(worker.id)).toBeUndefined();
  });

  test('calls update on entities that expose an update method', () => {
    const manager = new EntityManager();
    const entity = {
      id: 'entity_1',
      calledWith: null,
      update(dt, context) {
        this.calledWith = { dt, context };
      },
    };
    manager.add(entity);

    const context = { buildings: [], world: {} };
    manager.update(0.1, context);

    expect(entity.calledWith).toEqual({ dt: 0.1, context });
  });

  test('does not fail when an entity has no update method', () => {
    const manager = new EntityManager();
    const entity = { id: 'entity_2' };
    manager.add(entity);

    const context = { buildings: [], world: {} };
    expect(() => manager.update(0.1, context)).not.toThrow();
  });

  test('updates workers through their update method', () => {
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
