import { ForestZone } from '../buildings/ForestZone.js';
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

  static createForestBuildings(world) {
    // Create forest zone buildings around edges
    // Simplified: one big forest zone per edge
    return [
      new ForestZone(0, 0, world.width, 2),
      new ForestZone(0, world.height - 2, world.width, 2),
      new ForestZone(0, 2, 2, world.height - 4),
      new ForestZone(world.width - 2, 2, 2, world.height - 4),
    ];
  }
}
