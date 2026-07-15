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
    expect(worker.state).not.toBe('idle');
  });
});
