import { BuildingValidator } from '../../js/buildings/BuildingValidator.js';
import { World } from '../../js/world/World.js';
import { TileType } from '../../js/world/Tile.js';
import { Road } from '../../js/buildings/Road.js';

describe('BuildingValidator', () => {
  test('allows placement on empty tiles adjacent to road', () => {
    const world = new World(10, 10);
    world.setTile(2, 3, TileType.ROAD);
    const result = BuildingValidator.canPlace(world, 2, 0);
    expect(result.valid).toBe(true);
  });

  test('rejects placement not adjacent to road', () => {
    const world = new World(10, 10);
    const result = BuildingValidator.canPlace(world, 2, 2);
    expect(result.valid).toBe(false);
  });

  test('rejects placement on non-empty tiles', () => {
    const world = new World(10, 10);
    world.setTile(2, 3, TileType.ROAD);
    world.setTile(2, 0, TileType.FOREST);
    const result = BuildingValidator.canPlace(world, 2, 0);
    expect(result.valid).toBe(false);
  });
});
