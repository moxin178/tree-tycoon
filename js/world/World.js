import { Tile, TileType } from './Tile.js';
import { MAP_WIDTH, MAP_HEIGHT } from '../game/Config.js';

export class World {
  constructor(width = MAP_WIDTH, height = MAP_HEIGHT) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row.push(new Tile());
      }
      this.tiles.push(row);
    }
  }

  getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    return this.tiles[y][x];
  }

  setTile(x, y, type) {
    const tile = this.getTile(x, y);
    if (tile) tile.type = type;
  }

  isWalkable(x, y) {
    const tile = this.getTile(x, y);
    if (!tile) return false;
    return tile.type === TileType.EMPTY || tile.type === TileType.ROAD;
  }

  isBuildable(x, y) {
    const tile = this.getTile(x, y);
    if (!tile) return false;
    return tile.type === TileType.EMPTY && !tile.locked;
  }

  unlockTile(x, y) {
    const tile = this.getTile(x, y);
    if (tile && tile.type === TileType.LOCKED) {
      tile.type = TileType.EMPTY;
      tile.locked = false;
    }
  }
}
