import {
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  BUILDING_WIDTH,
  BUILDING_HEIGHT,
  MAX_BUILDING_LEVEL,
  SAVE_VERSION,
} from '../../js/game/Config.js';

describe('Config', () => {
  test('TILE_SIZE is 48', () => {
    expect(TILE_SIZE).toBe(48);
  });

  test('BUILDING size is 2x3 tiles', () => {
    expect(BUILDING_WIDTH).toBe(2);
    expect(BUILDING_HEIGHT).toBe(3);
  });

  test('MAX_BUILDING_LEVEL is 12', () => {
    expect(MAX_BUILDING_LEVEL).toBe(12);
  });

  test('SAVE_VERSION is 4', () => {
    expect(SAVE_VERSION).toBe(4);
  });
});
