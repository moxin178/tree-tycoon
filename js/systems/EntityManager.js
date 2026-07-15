export class EntityManager {
  constructor() {
    this.entities = new Map();
  }

  add(entity) {
    if (!entity.id) {
      throw new Error('Entity must have an id');
    }
    this.entities.set(entity.id, entity);
  }

  remove(entity) {
    this.entities.delete(entity.id);
  }

  getById(id) {
    return this.entities.get(id);
  }

  getAll() {
    return Array.from(this.entities.values());
  }

  update(dt, context) {
    for (const entity of this.entities.values()) {
      if (typeof entity.update === 'function') {
        entity.update(dt, context);
      }
    }
  }
}
