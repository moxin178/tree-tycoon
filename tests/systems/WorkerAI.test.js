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

  test('race condition: two workers do not consume wood below zero', () => {
    const sawmill = new Sawmill(2, 2);
    sawmill.addInput('wood', 1);

    const worker1 = new Worker(0, 0, WorkerQuality.COMMON);
    worker1.assignedBuildingId = sawmill.id;
    const worker2 = new Worker(0, 0, WorkerQuality.COMMON);
    worker2.assignedBuildingId = sawmill.id;

    const context = {
      buildings: [sawmill],
      world: {},
      entityManager: {},
    };

    // Move both workers into the working state
    WorkerAI.update(worker1, 0.1, context);
    WorkerAI.update(worker2, 0.1, context);

    // Advance both until the single wood is consumed
    for (let i = 0; i < 20; i++) {
      WorkerAI.update(worker1, 0.1, context);
      WorkerAI.update(worker2, 0.1, context);
      if (sawmill.inputInventory.wood === 0) break;
    }

    expect(sawmill.inputInventory.wood).toBe(0);
  });
});
