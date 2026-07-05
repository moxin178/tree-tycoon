import { TileType } from './Tile.js';

export class MapGenerator {
  static generateInitialMap(world) {
    const forestThickness = 2;

    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        const isEdge = x < forestThickness || x >= world.width - forestThickness ||
                       y < forestThickness || y >= world.height - forestThickness;

        if (isEdge) {
          world.setTile(x, y, TileType.FOREST);
        }
      }
    }
  }
}
