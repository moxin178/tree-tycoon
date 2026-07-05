const { createGameState } = require('../js/gameState');
const { sellWood } = require('../js/upgrades');

describe('upgrades', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('sellWood converts all wood to gold and returns earnings', () => {
    state.wood = 5;
    const earnings = sellWood(state);
    expect(state.wood).toBe(0);
    expect(state.gold).toBe(10);
    expect(earnings).toBe(10);
  });

  test('sellWood with no wood returns zero', () => {
    const earnings = sellWood(state);
    expect(state.gold).toBe(0);
    expect(state.wood).toBe(0);
    expect(earnings).toBe(0);
  });

  test('sellWood respects woodPrice', () => {
    state.wood = 3;
    state.woodPrice = 5;
    const earnings = sellWood(state);
    expect(state.gold).toBe(15);
    expect(earnings).toBe(15);
  });

  test('sellWood handles negative wood gracefully', () => {
    state.wood = -5;
    const earnings = sellWood(state);
    expect(state.gold).toBe(0);
    expect(state.wood).toBe(0);
    expect(earnings).toBe(0);
  });
});
