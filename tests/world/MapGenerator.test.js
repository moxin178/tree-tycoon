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

  test('generateInitialMap keeps central area empty', () => {
    const world = new World(20, 20);
    MapGenerator.generateInitialMap(world);

    expect(world.getTile(10, 10).type).toBe(TileType.EMPTY);
    expect(world.getTile(-1, -1)).toBe(null);
  });
});
