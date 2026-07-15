export const WorkerState = {
  IDLE: 'idle',
  MOVING: 'moving',
  WORKING: 'working',
  CARRYING: 'carrying',
};

export class WorkerAI {
  static update(worker, dt, context) {
    switch (worker.state) {
      case WorkerState.IDLE:
        WorkerAI.findTask(worker, context);
        break;
      case WorkerState.MOVING:
        WorkerAI.move(worker, dt, context);
        break;
      case WorkerState.WORKING:
        WorkerAI.work(worker, dt, context);
        break;
      case WorkerState.CARRYING:
        WorkerAI.carry(worker, dt, context);
        break;
      default:
        worker.state = WorkerState.IDLE;
        break;
    }
  }

  static findTask(worker, context) {
    const building = context.buildings.find(b => b.id === worker.assignedBuildingId);
    if (!building) {
      worker.state = WorkerState.IDLE;
      return;
    }

    // Simple behavior: sawmill worker takes wood from input and processes
    if (building.type === 'sawmill' && building.inputInventory.wood > 0) {
      worker.target = { x: building.x, y: building.y };
      worker.state = WorkerState.WORKING;
      worker.workProgress = 0;
    } else {
      worker.state = WorkerState.IDLE;
    }
  }

  static move(worker, dt, context) {
    // Movement implementation in next task
  }

  static work(worker, dt, context) {
    const building = context.buildings.find(b => b.id === worker.assignedBuildingId);
    if (!building || building.inputInventory.wood < 1) {
      worker.state = WorkerState.IDLE;
      return;
    }

    worker.workProgress += dt * worker.efficiency;
    if (worker.workProgress >= 1) {
      building.inputInventory.wood -= 1;
      building.addOutput('planks', 1);
      worker.workProgress = 0;
      worker.state = WorkerState.IDLE;
    }
  }

  static carry(worker, dt, context) {
    // Carry implementation in next task
  }
}
