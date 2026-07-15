import { Sawmill } from '../../js/buildings/Sawmill.js';
import { FurnitureFactory } from '../../js/buildings/FurnitureFactory.js';
import { Warehouse } from '../../js/buildings/Warehouse.js';

describe('Production Chain', () => {
  test('sawmill converts wood to planks', () => {
    const sawmill = new Sawmill(0, 0);
    sawmill.addInput('wood', 5);
    sawmill.process(1);
    expect(sawmill.outputInventory.planks).toBeGreaterThan(0);
  });

  test('furniture factory converts planks to furniture', () => {
    const factory = new FurnitureFactory(0, 0);
    factory.addInput('planks', 5);
    factory.process(1);
    expect(factory.outputInventory.furniture).toBeGreaterThan(0);
  });

  test('warehouse stores and returns resources', () => {
    const warehouse = new Warehouse(0, 0);
    warehouse.addResource('wood', 10);
    expect(warehouse.storage.wood).toBe(10);
    const taken = warehouse.takeResource('wood', 3);
    expect(taken).toBe(3);
    expect(warehouse.storage.wood).toBe(7);
  });

  test('warehouse take does not exceed stored amount', () => {
    const warehouse = new Warehouse(0, 0);
    warehouse.addResource('planks', 2);
    const taken = warehouse.takeResource('planks', 5);
    expect(taken).toBe(2);
    expect(warehouse.storage.planks).toBe(0);
  });
});
