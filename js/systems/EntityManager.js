import { Worker } from '../entities/Worker.js';
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
      if (typeof entity.update === 'function') {
        entity.update(dt, context);
      } else if (entity instanceof Worker) {
        WorkerAI.update(entity, dt, context);
      }
    }
  }
}
