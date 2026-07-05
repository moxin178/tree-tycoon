const { createGameState, addWood, addGold, getState } = require('../js/gameState');

describe('gameState', () => {
  test('createGameState returns initial state', () => {
    const state = createGameState();
    expect(state.gold).toBe(0);
    expect(state.wood).toBe(0);
    expect(state.axeLevel).toBe(1);
    expect(state.woodPrice).toBe(2);
    expect(state.axeUpgradeCost).toBe(10);
  });

  test('addWood increases wood count', () => {
    const state = createGameState();
    addWood(state, 5);
    expect(state.wood).toBe(5);
  });

  test('addGold increases gold count', () => {
    const state = createGameState();
    addGold(state, 10);
    expect(state.gold).toBe(10);
  });
});
