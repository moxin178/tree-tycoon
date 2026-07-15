import { Truck } from '../../js/entities/Truck.js';

describe('Truck', () => {
  test('truck loads resources', () => {
    const truck = new Truck(50);
    truck.load('furniture', 10);
    expect(truck.currentLoad).toBe(10);
    expect(truck.getLoad('furniture')).toBe(10);
  });

  test('truck detects full', () => {
    const truck = new Truck(50);
    truck.load('furniture', 50);
    expect(truck.isFull()).toBe(true);
  });

  test('truck load respects capacity', () => {
    const truck = new Truck(50);
    const loaded = truck.load('furniture', 60);
    expect(loaded).toBe(50);
    expect(truck.currentLoad).toBe(50);
    expect(truck.getLoad('furniture')).toBe(50);
  });

  test('truck tracks multiple resource types', () => {
    const truck = new Truck(50);
    truck.load('planks', 20);
    truck.load('furniture', 20);
    expect(truck.currentLoad).toBe(40);
    expect(truck.getLoad('planks')).toBe(20);
    expect(truck.getLoad('furniture')).toBe(20);
  });
});
