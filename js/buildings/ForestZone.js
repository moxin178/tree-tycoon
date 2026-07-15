import { Building } from './Building.js';

export class ForestZone extends Building {
  constructor(x, y, width = 4, height = 4) {
    super('forestZone', x, y);
    this.width = width;
    this.height = height;
    this.maxTrees = width * height;
    this.trees = this.maxTrees;
    this.regenRate = 0.5; // trees per second
    this.woodPerTree = 1;
    this.regenAccumulator = 0;
  }

  harvest(amount) {
    const actual = Math.min(amount, this.trees);
    this.trees -= actual;
    return actual * this.woodPerTree;
  }

  update(dt) {
    this.regenAccumulator += dt * this.regenRate;
    if (this.regenAccumulator >= 1) {
      const regen = Math.floor(this.regenAccumulator);
      this.trees = Math.min(this.maxTrees, this.trees + regen);
      this.regenAccumulator -= regen;
    }
  }
}
