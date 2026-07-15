import { Building } from './Building.js';

export class FurnitureFactory extends Building {
  constructor(x, y) {
    super('furnitureFactory', x, y);
    this.processTime = 3;
    this.inputType = 'planks';
    this.outputType = 'furniture';
    this.outputRatio = 1;
  }
}
