import { TILE_SIZE } from '../game/Config.js';
import { TileType } from '../world/Tile.js';

export class Renderer {
  constructor() {
    this.colors = {
      [TileType.EMPTY]: '#E8F5E9',
      [TileType.FOREST]: '#2E7D32',
      [TileType.ROAD]: '#9E9E9E',
      [TileType.BUILDING]: '#8D6E63',
      [TileType.LOCKED]: '#E0E0E0',
    };
  }

  render(ctx, world, camera, entities, buildings) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.renderTiles(ctx, world, camera);
    this.renderBuildings(ctx, buildings, camera);
    this.renderEntities(ctx, entities, camera);
  }

  renderTiles(ctx, world, camera) {
    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        const tile = world.getTile(x, y);
        const screen = camera.worldToScreen(x * TILE_SIZE, y * TILE_SIZE);

        ctx.fillStyle = this.colors[tile.type];
        ctx.fillRect(screen.x, screen.y, TILE_SIZE, TILE_SIZE);

        ctx.strokeStyle = '#C8E6C9';
        ctx.strokeRect(screen.x, screen.y, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  renderBuildings(ctx, buildings, camera) {
    for (const building of buildings) {
      const screen = camera.worldToScreen(building.x * TILE_SIZE, building.y * TILE_SIZE);
      const w = building.width * TILE_SIZE;
      const h = building.height * TILE_SIZE;

      ctx.fillStyle = '#8D6E63';
      ctx.fillRect(screen.x, screen.y, w, h);

      ctx.fillStyle = '#5D4037';
      ctx.fillRect(screen.x + 4, screen.y + 4, w - 8, h - 8);

      ctx.fillStyle = '#FFF';
      ctx.font = '12px Arial';
      ctx.fillText(building.type, screen.x + 6, screen.y + 18);
    }
  }

  renderEntities(ctx, entities, camera) {
    for (const entity of entities) {
      const screen = camera.worldToScreen(entity.x, entity.y);
      ctx.fillStyle = '#FF7043';
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
