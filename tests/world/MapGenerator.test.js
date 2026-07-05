import { MapGenerator } from '../../js/world/MapGenerator.js';
import { World } from '../../js/world/World.js';
import { TileType } from '../../js/world/Tile.js';

describe('MapGenerator', () => {
  test('generateInitialMap creates forest ring and central empty area', () => {
    const world = new World(20, 20);
    MapGenerator.generateInitialMap(world);

    expect(world.getTile(0, 0).type).toBe(TileType.FOREST);
    expect(world.getTile(19, 19).type).toBe(TileType.FOREST);
    expect(world.getTile(10, 10).type).toBe(TileType.EMPTY);
  });

  test('generateInitialMap creates locked outer ring', () => {
    const world = new World(20, 20);
    MapGenerator.generateInitialMap(world);

    // Outer-most ring should be locked
    expect(world.getTile(0, 0).locked).toBe(false); // forest is inner
    expect(world.getTile(-1, -1)).toBe(null);
  });
});
