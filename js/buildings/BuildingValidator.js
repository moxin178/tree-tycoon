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

    if (!BuildingValidator.isConnectedToEdge(world, x, y)) {
      return { valid: false, reason: '道路必须连通到地图边缘' };
    }

    return { valid: true, reason: '' };
  }

  static isConnectedToEdge(world, x, y) {
    const visited = new Set();
    const queue = [];

    // Start from adjacent road tiles
    for (let dy = -1; dy <= BUILDING_HEIGHT; dy++) {
      for (let dx = -1; dx <= BUILDING_WIDTH; dx++) {
        if (dx >= 0 && dx < BUILDING_WIDTH && dy >= 0 && dy < BUILDING_HEIGHT) continue;
        // 只检查四边相邻的地块，跳过对角角落
        if ((dx === -1 || dx === BUILDING_WIDTH) && (dy === -1 || dy === BUILDING_HEIGHT)) continue;
        const tile = world.getTile(x + dx, y + dy);
        if (tile && tile.type === TileType.ROAD) {
          const key = `${x + dx},${y + dy}`;
          queue.push({ x: x + dx, y: y + dy });
          visited.add(key);
        }
      }
    }

    while (queue.length > 0) {
      const current = queue.shift();
      if (current.x === 0 || current.y === 0 ||
          current.x === world.width - 1 || current.y === world.height - 1) {
        return true;
      }

      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        const tile = world.getTile(nx, ny);
        const key = `${nx},${ny}`;
        if (tile && tile.type === TileType.ROAD && !visited.has(key)) {
          visited.add(key);
          queue.push({ x: nx, y: ny });
        }
      }
    }

    return false;
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
