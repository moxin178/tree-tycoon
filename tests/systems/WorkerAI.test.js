import { WorkerAI } from '../../js/systems/WorkerAI.js';
import { Worker, WorkerQuality } from '../../js/entities/Worker.js';
import { Sawmill } from '../../js/buildings/Sawmill.js';

describe('WorkerAI', () => {
  test('idle worker finds task based on assigned building', () => {
    const worker = new Worker(0, 0, WorkerQuality.COMMON);
    const sawmill = new Sawmill(2, 2);
    sawmill.addInput('wood', 5);
    worker.assignedBuildingId = sawmill.id;

    const context = {
      buildings: [sawmill],
      world: {},
      entityManager: {},
    };

    WorkerAI.update(worker, 0.1, context);
    expect(worker.state).toBe('working');
  });

  test('working consumes wood and produces planks', () => {
    const worker = new Worker(0, 0, WorkerQuality.COMMON);
    const sawmill = new Sawmill(2, 2);
    sawmill.addInput('wood', 5);
    worker.assignedBuildingId = sawmill.id;

    const context = {
      buildings: [sawmill],
      world: {},
      entityManager: {},
    };

    worker.efficiency = 1;
    worker.state = 'working';
    worker.workProgress = 0;

    WorkerAI.update(worker, 1, context);

    expect(sawmill.inputInventory.wood).toBe(4);
    expect(sawmill.outputInventory.planks).toBe(1);
    expect(worker.workProgress).toBe(0);
    expect(worker.state).toBe('idle');
  });

  test('worker stays idle when input wood is zero', () => {
    const worker = new Worker(0, 0, WorkerQuality.COMMON);
    const sawmill = new Sawmill(2, 2);
    worker.assignedBuildingId = sawmill.id;

    const context = {
      buildings: [sawmill],
      world: {},
      entityManager: {},
    };

    WorkerAI.update(worker, 0.1, context);
    expect(worker.state).toBe('idle');
  });
});
