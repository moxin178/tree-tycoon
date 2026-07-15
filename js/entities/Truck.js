import { Entity } from './Entity.js';

export class Truck extends Entity {
  constructor(capacity = 50) {
    super(-100, -100);
    this.capacity = capacity;
    this.currentLoad = 0;
    this.loadByType = {};
    this.state = 'arriving'; // arriving, loading, leaving, gone
    this.progress = 0;
  }

  load(type, amount) {
    const available = Math.min(amount, this.capacity - this.currentLoad);
    this.loadByType[type] = (this.loadByType[type] || 0) + available;
    this.currentLoad += available;
    return available;
  }

  isFull() {
    return this.currentLoad >= this.capacity;
  }

  getLoad(type) {
    return this.loadByType[type] || 0;
  }
}
