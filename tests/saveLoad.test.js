import { createGameState, addGold } from '../js/gameState.js';
import { saveGame, loadGame, SAVE_VERSION } from '../js/saveLoad.js';

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
    expect(saved.planks).toBe(0);
    expect(saved.furniture).toBe(0);
    expect(saved.sawmillLevel).toBe(0);
    expect(saved.furnitureFactoryLevel).toBe(0);
    expect(saved.maxWood).toBe(10);
    expect(saved.maxPlanks).toBe(10);
    expect(saved.maxFurniture).toBe(10);
    expect(saved.storageUpgradeCost).toBe(50);
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
    expect(loaded.planks).toBe(0);
    expect(loaded.furniture).toBe(0);
    expect(loaded.sawmillLevel).toBe(0);
    expect(loaded.furnitureFactoryLevel).toBe(0);
    expect(loaded.maxWood).toBe(10);
    expect(loaded.maxPlanks).toBe(10);
    expect(loaded.maxFurniture).toBe(10);
    expect(loaded.storageUpgradeCost).toBe(50);
  });

  test('loadGame returns default state if no save', () => {
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.wood).toBe(0);
    expect(loaded.axeLevel).toBe(1);
    expect(loaded.planks).toBe(0);
    expect(loaded.furniture).toBe(0);
    expect(loaded.sawmillLevel).toBe(0);
    expect(loaded.furnitureFactoryLevel).toBe(0);
    expect(loaded.maxWood).toBe(10);
    expect(loaded.maxPlanks).toBe(10);
    expect(loaded.maxFurniture).toBe(10);
  });

  test('loadGame returns default state for corrupted save', () => {
    localStorage.setItem('treeTycoonSave', 'not-valid-json');
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.wood).toBe(0);
  });

  test('loadGame returns default state for outdated save version', () => {
    const state = createGameState();
    const outdated = { ...state, saveVersion: 1 };
    localStorage.setItem('treeTycoonSave', JSON.stringify(outdated));
    const loaded = loadGame();
    expect(loaded.gold).toBe(0);
    expect(loaded.saveVersion).toBe(SAVE_VERSION);
  });

  test('loadGame filters out unknown keys', () => {
    const state = createGameState();
    const data = { ...state, hacked: true, saveVersion: SAVE_VERSION };
    localStorage.setItem('treeTycoonSave', JSON.stringify(data));
    const loaded = loadGame();
    expect(loaded.hacked).toBeUndefined();
  });

  test('saveGame handles localStorage errors gracefully', () => {
    const state = createGameState();
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('Quota exceeded');
    };
    expect(() => saveGame(state)).not.toThrow();
    localStorage.setItem = originalSetItem;
  });

  test('saveGame does not mutate any original state fields', () => {
    const state = createGameState();
    const original = { ...state };
    saveGame(state);
    expect(state.gold).toBe(original.gold);
    expect(state.wood).toBe(original.wood);
    expect(state.planks).toBe(original.planks);
    expect(state.furniture).toBe(original.furniture);
    expect(state.lastSaveTime).toBe(original.lastSaveTime);
  });
});
