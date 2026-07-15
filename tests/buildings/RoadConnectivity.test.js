import { BuildingValidator } from '../../js/buildings/BuildingValidator.js';
import { World } from '../../js/world/World.js';
import { TileType } from '../../js/world/Tile.js';

describe('Road Connectivity', () => {
  test('detects road connected to map edge', () => {
    const world = new World(10, 10);
    for (let x = 0; x < 10; x++) world.setTile(x, 0, TileType.ROAD);
    expect(BuildingValidator.isConnectedToEdge(world, 2, 0)).toBe(true);
  });

  test('detects disconnected road', () => {
    const world = new World(10, 10);
    world.setTile(2, 2, TileType.ROAD);
    expect(BuildingValidator.isConnectedToEdge(world, 2, 2)).toBe(false);
  });

  test('canPlace rejects building with disconnected road', () => {
    const world = new World(10, 10);
    world.setTile(2, 3, TileType.ROAD);
    const result = BuildingValidator.canPlace(world, 2, 0);
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('道路必须连通到地图边缘');
  });

  test('canPlace accepts building with road connected to edge', () => {
    const world = new World(10, 10);
    for (let y = 3; y < 10; y++) world.setTile(2, y, TileType.ROAD);
    const result = BuildingValidator.canPlace(world, 2, 0);
    expect(result.valid).toBe(true);
  });
});
