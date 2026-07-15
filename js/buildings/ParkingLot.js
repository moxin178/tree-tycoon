import { Building } from './Building.js';

export class ParkingLot extends Building {
  constructor(x, y) {
    super('parkingLot', x, y);
    this.truckCapacity = 50;
    this.currentLoad = 0;
    this.truckArrivalTime = 0;
  }
}
