import { BUILDING_WIDTH, BUILDING_HEIGHT } from '../game/Config.js';
import { TileType } from '../world/Tile.js';

export class BuildingValidator {
  static canPlace(world, x, y) {
    // Check building footprint
    for (let dy = 0; dy < BUILDING_HEIGHT; dy++) {
      for (let dx = 0; dx < BUILDING_WIDTH; dx++) {
        const tile = world.getTile(x + dx, y + dy);
        if (!tile || tile.type !== TileType.EMPTY || tile.locked) {
          return { valid: false, reason: '地块不可用' };
        }
      }
    }

    // Check adjacent road
    const hasRoad = BuildingValidator.hasAdjacentRoad(world, x, y);
    if (!hasRoad) {
      return { valid: false, reason: '必须邻接道路' };
    }

    return { valid: true, reason: '' };
  }

  static hasAdjacentRoad(world, x, y) {
    for (let dy = -1; dy <= BUILDING_HEIGHT; dy++) {
      for (let dx = -1; dx <= BUILDING_WIDTH; dx++) {
        if (dx >= 0 && dx < BUILDING_WIDTH && dy >= 0 && dy < BUILDING_HEIGHT) continue;
        // 只检查四边相邻的地块，跳过对角角落
        if ((dx === -1 || dx === BUILDING_WIDTH) && (dy === -1 || dy === BUILDING_HEIGHT)) continue;
        const tile = world.getTile(x + dx, y + dy);
        if (tile && tile.type === TileType.ROAD) return true;
      }
    }
    return false;
  }
}
