import { Pathfinder } from '../world/Pathfinder.js';
import { TILE_SIZE } from '../game/Config.js';

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
    const buildings = Array.isArray(context?.buildings) ? context.buildings : [];
    const building = buildings.find(b => b.id === worker.assignedBuildingId);
    if (!building) {
      worker.state = WorkerState.IDLE;
      return;
    }

    switch (building.type) {
      case 'forestZone': {
        const harvested = building.harvest(worker.capacity);
        if (harvested > 0) {
          worker.carrying = { type: 'wood', amount: harvested };
          worker.state = WorkerState.CARRYING;
          worker.targetBuilding = this.findNearestBuilding(buildings, building, ['sawmill', 'warehouse']);
        } else {
          worker.state = WorkerState.IDLE;
        }
        break;
      }

      case 'sawmill':
        if (building.inputInventory.wood > 0) {
          worker.state = WorkerState.WORKING;
          worker.workProgress = 0;
        } else if (building.outputInventory.planks > 0) {
          worker.carrying = {
            type: 'planks',
            amount: Math.min(worker.capacity, building.outputInventory.planks),
          };
          building.outputInventory.planks -= worker.carrying.amount;
          worker.state = WorkerState.CARRYING;
          worker.targetBuilding = this.findNearestBuilding(buildings, building, ['furnitureFactory', 'warehouse']);
        } else {
          worker.state = WorkerState.IDLE;
        }
        break;

      case 'furnitureFactory':
        if (building.inputInventory.planks > 0) {
          worker.state = WorkerState.WORKING;
          worker.workProgress = 0;
        } else if (building.outputInventory.furniture > 0) {
          worker.carrying = {
            type: 'furniture',
            amount: Math.min(worker.capacity, building.outputInventory.furniture),
          };
          building.outputInventory.furniture -= worker.carrying.amount;
          worker.state = WorkerState.CARRYING;
          worker.targetBuilding = this.findNearestBuilding(buildings, building, ['warehouse']);
        } else {
          worker.state = WorkerState.IDLE;
        }
        break;

      case 'warehouse':
        worker.state = WorkerState.IDLE;
        break;

      default:
        worker.state = WorkerState.IDLE;
        break;
    }
  }

  static findNearestBuilding(buildings, from, types) {
    return buildings
      .filter(b => types.includes(b.type))
      .sort((a, b) => {
        const da = Math.hypot(a.x - from.x, a.y - from.y);
        const db = Math.hypot(b.x - from.x, b.y - from.y);
        return da - db;
      })[0] || null;
  }

  static setTarget(worker, targetX, targetY, context) {
    if (!context?.world) {
      worker.state = WorkerState.IDLE;
      return;
    }

    const start = {
      x: Math.floor(worker.x / TILE_SIZE),
      y: Math.floor(worker.y / TILE_SIZE),
    };
    const end = { x: targetX, y: targetY };
    worker.path = Pathfinder.findPath(context.world, start, end);
    if (worker.path && worker.path.length > 0) {
      worker.state = WorkerState.MOVING;
      worker.pathIndex = 0;
    }
  }

  static move(worker, dt, context) {
    if (typeof worker.speed !== 'number' || worker.speed <= 0 || Number.isNaN(worker.speed)) {
      worker.state = WorkerState.IDLE;
      return;
    }

    if (!worker.path || worker.pathIndex >= worker.path.length) {
      worker.state = WorkerState.IDLE;
      return;
    }

    const targetTile = worker.path[worker.pathIndex];
    const targetX = targetTile.x * TILE_SIZE + TILE_SIZE / 2;
    const targetY = targetTile.y * TILE_SIZE + TILE_SIZE / 2;

    const dx = targetX - worker.x;
    const dy = targetY - worker.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const moveDist = worker.speed * TILE_SIZE * dt;

    if (dist < Number.EPSILON || dist <= moveDist) {
      worker.x = targetX;
      worker.y = targetY;
      worker.pathIndex++;
      if (worker.pathIndex >= worker.path.length) {
        worker.state = WorkerState.IDLE;
      }
    } else {
      worker.x += (dx / dist) * moveDist;
      worker.y += (dy / dist) * moveDist;
    }
  }

  static work(worker, dt, context) {
    const buildings = Array.isArray(context?.buildings) ? context.buildings : [];
    const building = buildings.find(b => b.id === worker.assignedBuildingId);
    if (!building) {
      worker.state = WorkerState.IDLE;
      return;
    }

    worker.workProgress += dt * worker.efficiency;
    if (worker.workProgress >= building.processTime) {
      if (building.type === 'sawmill' && building.inputInventory.wood > 0) {
        building.inputInventory.wood -= 1;
        building.addOutput('planks', 1);
      } else if (building.type === 'furnitureFactory' && building.inputInventory.planks > 0) {
        building.inputInventory.planks -= 1;
        building.addOutput('furniture', 1);
      }
      worker.workProgress = 0;
      worker.state = WorkerState.IDLE;
    }
  }

  static carry(worker, dt, context) {
    const target = worker.targetBuilding;
    if (!target) {
      worker.state = WorkerState.IDLE;
      return;
    }

    const targetX = target.x * TILE_SIZE + TILE_SIZE / 2;
    const targetY = target.y * TILE_SIZE + TILE_SIZE / 2;
    const dist = Math.hypot(targetX - worker.x, targetY - worker.y);

    if (dist < 5) {
      // Deliver
      if (worker.carrying.type === 'wood') {
        if (target.type === 'sawmill') {
          target.addInput('wood', worker.carrying.amount);
        } else if (target.type === 'warehouse') {
          target.addResource('wood', worker.carrying.amount);
        }
      } else if (worker.carrying.type === 'planks') {
        if (target.type === 'furnitureFactory') {
          target.addInput('planks', worker.carrying.amount);
        } else if (target.type === 'warehouse') {
          target.addResource('planks', worker.carrying.amount);
        }
      } else if (worker.carrying.type === 'furniture') {
        if (target.type === 'warehouse') {
          target.addResource('furniture', worker.carrying.amount);
        }
      }

      worker.carrying = { type: null, amount: 0 };
      worker.state = WorkerState.IDLE;
    } else {
      const speed = worker.speed * TILE_SIZE * dt;
      worker.x += ((targetX - worker.x) / dist) * speed;
      worker.y += ((targetY - worker.y) / dist) * speed;
    }
  }
}
