import { SAVE_VERSION } from '../game/Config.js';

export class SaveMigrator {
  static migrateV3ToV4(oldData) {
    return {
      saveVersion: SAVE_VERSION,
      gold: oldData.gold || 0,
      diamonds: 0,
      world: null,
      buildings: [],
      workers: [],
      boss: { x: 0, y: 0 },
      camera: { x: 0, y: 0 },
      lastSaveTime: Date.now(),
      migratedFromV3: true,
    };
  }
}
