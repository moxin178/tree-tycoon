import { Building } from './Building.js';

export class FurnitureFactory extends Building {
  constructor(x, y) {
    super('furnitureFactory', x, y);
    this.processTime = 3;
    this.inputType = 'planks';
    this.outputType = 'furniture';
    this.outputRatio = 1;
  }

  process(dt) {
    if (this.inputInventory.planks <= 0) return 0;
    const amount = Math.min(this.inputInventory.planks, this.level);
    this.inputInventory.planks -= amount;
    this.addOutput('furniture', amount);
    return amount;
  }
}
