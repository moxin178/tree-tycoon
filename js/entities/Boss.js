import { Entity } from './Entity.js';

export class Boss extends Entity {
  constructor(x, y) {
    super(x, y);
    this.targetX = x;
    this.targetY = y;
    this.speed = 120;
  }

  update(dt) {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const move = this.speed * dt;

    if (dist <= move) {
      this.x = this.targetX;
      this.y = this.targetY;
    } else {
      this.x += (dx / dist) * move;
      this.y += (dy / dist) * move;
    }
  }

  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
}
