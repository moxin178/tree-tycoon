import { SAVE_VERSION } from './Config.js';

export function createGameState() {
  return {
    saveVersion: SAVE_VERSION,
    gold: 0,
    diamonds: 0,
    world: null,
    buildings: [],
    workers: [],
    boss: { x: 0, y: 0 },
    camera: { x: 0, y: 0 },
    lastSaveTime: Date.now(),
  };
}
