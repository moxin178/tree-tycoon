import { WorkerAI } from './WorkerAI.js';

export class EntityManager {
  constructor() {
    this.entities = new Map();
  }

  add(entity) {
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
      if (entity.constructor.name === 'Worker') {
        WorkerAI.update(entity, dt, context);
      }
    }
  }
}
