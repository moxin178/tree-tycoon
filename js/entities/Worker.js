import { Entity } from './Entity.js';

export const WorkerQuality = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
};

const QUALITY_ORDER = [
  WorkerQuality.COMMON,
  WorkerQuality.RARE,
  WorkerQuality.EPIC,
  WorkerQuality.LEGENDARY,
];

const QUALITY_STATS = {
  [WorkerQuality.COMMON]: { speed: 1, efficiency: 1, capacity: 1 },
  [WorkerQuality.RARE]: { speed: 1.2, efficiency: 1.3, capacity: 1.5 },
  [WorkerQuality.EPIC]: { speed: 1.5, efficiency: 1.8, capacity: 2 },
  [WorkerQuality.LEGENDARY]: { speed: 2, efficiency: 2.5, capacity: 3 },
};

export class Worker extends Entity {
  constructor(x, y, quality = WorkerQuality.COMMON) {
    super(x, y);
    this.quality = QUALITY_ORDER.includes(quality) ? quality : WorkerQuality.COMMON;
    this.assignedBuildingId = null;
    this.state = 'idle';
    this.carrying = { type: null, amount: 0 };
    this.updateStats();
  }

  updateStats() {
    const stats = QUALITY_STATS[this.quality];
    this.speed = stats.speed;
    this.efficiency = stats.efficiency;
    this.capacity = stats.capacity;
  }

  upgradeQuality() {
    const index = QUALITY_ORDER.indexOf(this.quality);
    if (index < QUALITY_ORDER.length - 1) {
      this.quality = QUALITY_ORDER[index + 1];
      this.updateStats();
      return true;
    }
    return false;
  }
}
