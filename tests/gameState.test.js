import { createGameState, addWood, addGold } from '../js/gameState.js';

describe('gameState', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('createGameState returns initial state with economy fields', () => {
    expect(state.gold).toBe(0);
    expect(state.wood).toBe(0);
    expect(state.axeLevel).toBe(1);
    expect(state.woodPrice).toBe(2);
    expect(state.axeUpgradeCost).toBe(5);
    expect(state.lumberjackLevel).toBe(0);
    expect(state.lumberjackBaseRate).toBe(1);
    expect(state.lumberjackUpgradeCost).toBe(50);
    expect(state.backpackCapacity).toBe(10);
    expect(state.backpackUpgradeCost).toBe(30);
    expect(state.lastSaveTime).toBeDefined();
    expect(state.saveVersion).toBe(2);
  });

  test('addWood increases wood count', () => {
    addWood(state, 5);
    expect(state.wood).toBe(5);
  });

  test('addGold increases gold count', () => {
    addGold(state, 10);
    expect(state.gold).toBe(10);
  });

  test('addWood throws on negative amount', () => {
    expect(() => addWood(state, -1)).toThrow('Amount must be a non-negative number');
  });

  test('addGold throws on negative amount', () => {
    expect(() => addGold(state, -1)).toThrow('Amount must be a non-negative number');
  });

  test('addWood allows zero amount', () => {
    addWood(state, 0);
    expect(state.wood).toBe(0);
  });

  test('addGold allows zero amount', () => {
    addGold(state, 0);
    expect(state.gold).toBe(0);
  });

  test('addWood throws on NaN', () => {
    expect(() => addWood(state, NaN)).toThrow('Amount must be a non-negative number');
  });

  test('addGold throws on NaN', () => {
    expect(() => addGold(state, NaN)).toThrow('Amount must be a non-negative number');
  });

  test('addWood throws on Infinity', () => {
    expect(() => addWood(state, Infinity)).toThrow('Amount must be a non-negative number');
  });

  test('addGold throws on string', () => {
    expect(() => addGold(state, '10')).toThrow('Amount must be a non-negative number');
  });

  test('lastSaveTime is a recent timestamp', () => {
    const before = Date.now();
    const newState = createGameState();
    const after = Date.now();
    expect(typeof newState.lastSaveTime).toBe('number');
    expect(newState.lastSaveTime).toBeGreaterThanOrEqual(before);
    expect(newState.lastSaveTime).toBeLessThanOrEqual(after);
  });

  test('state instances are independent', () => {
    const state1 = createGameState();
    const state2 = createGameState();
    addWood(state1, 5);
    expect(state2.wood).toBe(0);
  });
});
