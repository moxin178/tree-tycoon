export class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `${this.constructor.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
