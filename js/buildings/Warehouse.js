import { Building } from './Building.js';

export class Warehouse extends Building {
  constructor(x, y) {
    super('warehouse', x, y);
    this.storage = { wood: 0, planks: 0, furniture: 0 };
  }

  addStorage(resource, amount) {
    this.storage[resource] = Math.min(
      this.storage[resource] + amount,
      this.getInventoryCapacity()
    );
  }

  addResource(type, amount) {
    this.addStorage(type, amount);
  }

  takeResource(type, amount) {
    const actual = Math.min(this.storage[type], amount);
    this.storage[type] -= actual;
    return actual;
  }
}
