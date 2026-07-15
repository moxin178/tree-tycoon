import { ForestZone } from '../../js/buildings/ForestZone.js';

describe('ForestZone', () => {
  test('forest zone has trees', () => {
    const zone = new ForestZone(0, 0, 4, 4);
    expect(zone.trees).toBeGreaterThan(0);
  });

  test('harvesting reduces trees and triggers regen', () => {
    const zone = new ForestZone(0, 0, 4, 4);
    const initial = zone.trees;
    zone.harvest(1);
    expect(zone.trees).toBe(initial - 1);
    zone.update(2); // regenRate 0.5 -> 1 tree per 2 seconds
    expect(zone.trees).toBeGreaterThan(initial - 1);
  });

  test('harvest does not exceed available trees', () => {
    const zone = new ForestZone(0, 0, 2, 2);
    zone.trees = 1;
    const harvested = zone.harvest(10);
    expect(harvested).toBe(1);
    expect(zone.trees).toBe(0);
  });

  test('regeneration caps at max trees', () => {
    const zone = new ForestZone(0, 0, 2, 2);
    zone.trees = zone.maxTrees;
    zone.update(10);
    expect(zone.trees).toBe(zone.maxTrees);
  });
});
