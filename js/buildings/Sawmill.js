import { Building } from './Building.js';

export class Sawmill extends Building {
  constructor(x, y) {
    super('sawmill', x, y);
    this.processTime = 2;
    this.inputType = 'wood';
    this.outputType = 'planks';
    this.outputRatio = 1;
  }

  process(dt) {
    if (this.inputInventory.wood <= 0) return 0;
    const amount = Math.min(this.inputInventory.wood, this.level);
    this.inputInventory.wood -= amount;
    this.addOutput('planks', amount);
    return amount;
  }
}
