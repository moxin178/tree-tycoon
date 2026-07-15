import { Building } from './Building.js';

export class Sawmill extends Building {
  constructor(x, y) {
    super('sawmill', x, y);
    this.processTime = 2;
    this.inputType = 'wood';
    this.outputType = 'planks';
    this.outputRatio = 1;
  }
}
