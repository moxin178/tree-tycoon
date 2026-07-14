import { Pathfinder } from '../../js/world/Pathfinder.js';
import { World } from '../../js/world/World.js';
import { TileType } from '../../js/world/Tile.js';

describe('Pathfinder', () => {
  test('finds straight path on empty map', () => {
    const world = new World(5, 5);
    const path = Pathfinder.findPath(world, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(path).not.toBeNull();
    expect(path.length).toBe(3);
    expect(path[0]).toEqual({ x: 0, y: 0 });
    expect(path[2]).toEqual({ x: 2, y: 0 });
  });

  test('finds path around obstacle', () => {
    const world = new World(5, 5);
    world.setTile(1, 0, TileType.BUILDING);
    world.setTile(1, 1, TileType.BUILDING);
    world.setTile(1, 2, TileType.BUILDING);
    const path = Pathfinder.findPath(world, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(path).not.toBeNull();
    expect(path.some(p => p.x === 1 && (p.y === 0 || p.y === 1 || p.y === 2))).toBe(false);
  });

  test('returns null when no path', () => {
    const world = new World(3, 3);
    world.setTile(1, 0, TileType.BUILDING);
    world.setTile(1, 1, TileType.BUILDING);
    world.setTile(1, 2, TileType.BUILDING);
    const path = Pathfinder.findPath(world, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(path).toBeNull();
  });
});
