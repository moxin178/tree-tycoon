import { saveGame, loadGame, clearSave } from '../../js/save/SaveLoad.js';

beforeEach(() => {
  global.localStorage = {
    store: {},
    setItem(key, value) {
      this.store[key] = value;
    },
    getItem(key) {
      return this.store[key] || null;
    },
    removeItem(key) {
      delete this.store[key];
    },
  };
});

afterEach(() => {
  clearSave();
});

describe('SaveLoad', () => {
  test('save and load game state', () => {
    const state = { saveVersion: 4, gold: 100 };
    saveGame(state);
    const loaded = loadGame();
    expect(loaded.gold).toBe(100);
  });

  test('load returns null when no save exists', () => {
    expect(loadGame()).toBeNull();
  });

  test('save adds lastSaveTime and saveVersion', () => {
    const state = { gold: 50 };
    saveGame(state);
    const loaded = loadGame();
    expect(loaded.saveVersion).toBe(4);
    expect(loaded.lastSaveTime).toBeGreaterThan(0);
  });
});
