import { Tile, TileType } from '../../js/world/Tile.js';

describe('Tile', () => {
  test('TileType has required types', () => {
    expect(TileType.EMPTY).toBe('empty');
    expect(TileType.FOREST).toBe('forest');
    expect(TileType.BUILDING).toBe('building');
    expect(TileType.ROAD).toBe('road');
    expect(TileType.LOCKED).toBe('locked');
  });

  test('new Tile defaults to empty and unlocked', () => {
    const tile = new Tile();
    expect(tile.type).toBe(TileType.EMPTY);
    expect(tile.locked).toBe(false);
  });
});
