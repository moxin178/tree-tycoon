const { createGameState, addGold } = require('../js/gameState');
const { saveGame, loadGame, SAVE_VERSION } = require('../js/saveLoad');

// 模拟 localStorage
const mockStorage = {};
global.localStorage = {
  setItem(key, value) {
    mockStorage[key] = value;
  },
  getItem(key) {
    return mockStorage[key] || null;
  },
  removeItem(key) {
    delete mockStorage[key];
  },
};

describe('saveLoad', () => {
  beforeEach(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  });

  test('saveGame stores state as JSON', () => {
    const state = createGameState();
    addGold(state, 100);
    saveGame(state);
    const saved = JSON.parse(localStorage.getItem('treeTycoonSave'));
    expect(saved.gold).toBe(100);
    expect(saved.saveVersion).toBe(SAVE_VERSION);
  });

  test('saveGame does not mutate original state', () => {
    const state = createGameState();
    const originalTime = state.lastSaveTime;
    saveGame(state);
    expect(state.lastSaveTime).toBe(originalTime);
  });

  test('loadGame restores saved state', () => {
    const state = createGameState();
    addGold(state, 100);
    saveGame(state);

    const loaded = loadGame();
    expect(loaded.gold).toBe(100);
    expect(loaded.saveVersion).toBe(SAVE_VERSION);
  });

  test('loadGame returns default state if no save', () => {
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.wood).toBe(0);
    expect(loaded.axeLevel).toBe(1);
  });

  test('loadGame returns default state for corrupted save', () => {
    localStorage.setItem('treeTycoonSave', 'not-valid-json');
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.wood).toBe(0);
  });
});
