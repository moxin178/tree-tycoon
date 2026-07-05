import { World } from '../../js/world/World.js';
import { TileType } from '../../js/world/Tile.js';

describe('World', () => {
  test('creates map with correct size', () => {
    const world = new World(20, 20);
    expect(world.width).toBe(20);
    expect(world.height).toBe(20);
  });

  test('getTile returns tile at position', () => {
    const world = new World(20, 20);
    const tile = world.getTile(5, 5);
    expect(tile.type).toBe(TileType.EMPTY);
  });

  test('setTile changes tile type', () => {
    const world = new World(20, 20);
    world.setTile(5, 5, TileType.ROAD);
    expect(world.getTile(5, 5).type).toBe(TileType.ROAD);
  });

  test('isWalkable returns true for empty and road', () => {
    const world = new World(20, 20);
    expect(world.isWalkable(0, 0)).toBe(true);
    world.setTile(0, 0, TileType.ROAD);
    expect(world.isWalkable(0, 0)).toBe(true);
    world.setTile(0, 0, TileType.BUILDING);
    expect(world.isWalkable(0, 0)).toBe(false);
  });

  test('isBuildable returns true only for empty unlocked tiles', () => {
    const world = new World(20, 20);
    expect(world.isBuildable(0, 0)).toBe(true);
    world.setTile(0, 0, TileType.ROAD);
    expect(world.isBuildable(0, 0)).toBe(false);
    world.setTile(1, 1, TileType.LOCKED);
    expect(world.isBuildable(1, 1)).toBe(false);
  });

  test('unlockTile changes locked to empty', () => {
    const world = new World(20, 20);
    world.setTile(10, 10, TileType.LOCKED);
    world.unlockTile(10, 10);
    expect(world.getTile(10, 10).type).toBe(TileType.EMPTY);
    expect(world.getTile(10, 10).locked).toBe(false);
  });
});
