import { Building } from '../../js/buildings/Building.js';
import { Sawmill } from '../../js/buildings/Sawmill.js';
import { ForestZone } from '../../js/buildings/ForestZone.js';
import { FurnitureFactory } from '../../js/buildings/FurnitureFactory.js';
import { Warehouse } from '../../js/buildings/Warehouse.js';
import { ParkingLot } from '../../js/buildings/ParkingLot.js';
import { Road } from '../../js/buildings/Road.js';
import { MAX_BUILDING_LEVEL } from '../../js/game/Config.js';

describe('Building', () => {
  test('building has correct position and size', () => {
    const b = new Sawmill(5, 5);
    expect(b.x).toBe(5);
    expect(b.y).toBe(5);
    expect(b.width).toBe(2);
    expect(b.height).toBe(3);
  });

  test('upgrade increases level up to max', () => {
    const b = new Sawmill(0, 0);
    expect(b.level).toBe(1);
    b.upgrade();
    expect(b.level).toBe(2);
    b.level = MAX_BUILDING_LEVEL;
    expect(b.upgrade()).toBe(false);
  });

  test('worker capacity scales with level', () => {
    const b = new Sawmill(0, 0);
    expect(b.getMaxWorkers()).toBe(2);
    b.upgrade();
    b.upgrade();
    expect(b.getMaxWorkers()).toBeGreaterThan(2);
  });

  test('getCost returns configured cost for known building type', () => {
    const b = new Sawmill(0, 0);
    expect(b.getCost()).toBe(100);
  });
});

describe('ForestZone', () => {
  test('has forestZone type and regen properties', () => {
    const b = new ForestZone(1, 2);
    expect(b.type).toBe('forestZone');
    expect(b.regenRate).toBe(0.5);
    expect(b.woodPerTree).toBe(1);
  });
});

describe('FurnitureFactory', () => {
  test('converts planks to furniture', () => {
    const b = new FurnitureFactory(3, 4);
    expect(b.type).toBe('furnitureFactory');
    expect(b.inputType).toBe('planks');
    expect(b.outputType).toBe('furniture');
    expect(b.processTime).toBe(3);
  });
});

describe('Warehouse', () => {
  test('has storage and can add resources', () => {
    const b = new Warehouse(0, 0);
    expect(b.type).toBe('warehouse');
    expect(b.storage).toEqual({ wood: 0, planks: 0, furniture: 0 });
    b.addStorage('wood', 5);
    expect(b.storage.wood).toBe(5);
  });
});

describe('ParkingLot', () => {
  test('has truck capacity and load tracking', () => {
    const b = new ParkingLot(0, 0);
    expect(b.type).toBe('parkingLot');
    expect(b.truckCapacity).toBe(50);
    expect(b.currentLoad).toBe(0);
  });
});

describe('Road', () => {
  test('stores position', () => {
    const r = new Road(7, 8);
    expect(r.x).toBe(7);
    expect(r.y).toBe(8);
  });
});
