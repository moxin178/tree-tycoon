export const TileType = {
  EMPTY: 'empty',
  FOREST: 'forest',
  BUILDING: 'building',
  ROAD: 'road',
  LOCKED: 'locked',
};

export class Tile {
  constructor(type = TileType.EMPTY, locked = false) {
    this.type = type;
    this.locked = locked;
    this.buildingId = null;
    this.roadConnected = false;
  }
}
