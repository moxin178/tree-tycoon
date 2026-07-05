const { createGameState, addGold } = require('../js/gameState');
const { saveGame, loadGame } = require('../js/saveLoad');

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
  });

  test('saveGame updates lastSaveTime', () => {
    const state = createGameState();
    const before = Date.now();
    saveGame(state);
    const after = Date.now();
    const saved = JSON.parse(localStorage.getItem('treeTycoonSave'));
    expect(saved.lastSaveTime).toBeGreaterThanOrEqual(before);
    expect(saved.lastSaveTime).toBeLessThanOrEqual(after);
  });

  test('loadGame restores saved state', () => {
    const state = createGameState();
    addGold(state, 100);
    saveGame(state);

    const loaded = loadGame();
    expect(loaded.gold).toBe(100);
  });

  test('loadGame returns default state if no save', () => {
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.wood).toBe(0);
    expect(loaded.axeLevel).toBe(1);
  });
});
