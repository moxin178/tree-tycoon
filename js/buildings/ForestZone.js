import { Building } from './Building.js';

export class ForestZone extends Building {
  constructor(x, y) {
    super('forestZone', x, y);
    this.regenRate = 1;
    this.woodPerTree = 1;
  }
}
