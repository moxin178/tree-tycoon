import {
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  MAX_BUILDING_LEVEL,
  BUILDING_COSTS,
} from '../game/Config.js';

export class Building {
  constructor(type, x, y) {
    this.id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = BUILDING_WIDTH;
    this.height = BUILDING_HEIGHT;
    this.level = 1;
    this.workers = [];
    this.inputInventory = { wood: 0, planks: 0, furniture: 0 };
    this.outputInventory = { wood: 0, planks: 0, furniture: 0 };
  }

  upgrade() {
    if (this.level >= MAX_BUILDING_LEVEL) return false;
    this.level++;
    return true;
  }

  getCost() {
    return BUILDING_COSTS[this.type] ?? 0;
  }

  getMaxWorkers() {
    return 2 + Math.floor((this.level - 1) / 2);
  }

  getInventoryCapacity() {
    return 10 + this.level * 5;
  }

  addInput(resource, amount) {
    this.inputInventory[resource] = Math.min(
      this.inputInventory[resource] + amount,
      this.getInventoryCapacity()
    );
  }

  addOutput(resource, amount) {
    this.outputInventory[resource] = Math.min(
      this.outputInventory[resource] + amount,
      this.getInventoryCapacity()
    );
  }
}
