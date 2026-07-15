import { Truck } from '../entities/Truck.js';

export class TruckSystem {
  constructor() {
    this.truck = null;
    this.arrivalTimer = 0;
  }

  update(dt, parkingLot, economy) {
    if (!this.truck) {
      this.arrivalTimer += dt;
      if (this.arrivalTimer >= 5) {
        this.truck = new Truck(parkingLot.truckCapacity);
        this.arrivalTimer = 0;
      }
      return;
    }

    if (this.truck.state === 'arriving') {
      this.truck.progress += dt;
      if (this.truck.progress >= 1) {
        this.truck.state = 'loading';
        this.truck.progress = 0;
      }
    } else if (this.truck.state === 'loading') {
      if (this.truck.isFull()) {
        this.truck.state = 'leaving';
      }
    } else if (this.truck.state === 'leaving') {
      this.truck.progress += dt;
      if (this.truck.progress >= 1) {
        this.sellLoad(this.truck, economy);
        this.truck = null;
      }
    }
  }

  sellLoad(truck, economy) {
    for (const [type, amount] of Object.entries(truck.loadByType)) {
      economy.sellResource(type, amount);
    }
  }
}
