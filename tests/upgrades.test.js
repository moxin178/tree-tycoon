const { createGameState } = require('../js/gameState');
const { sellWood } = require('../js/upgrades');

describe('upgrades', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('sellWood converts all wood to gold', () => {
    state.wood = 5;
    sellWood(state);
    expect(state.wood).toBe(0);
    expect(state.gold).toBe(10); // 5 * 2
  });

  test('sellWood with no wood does nothing', () => {
    sellWood(state);
    expect(state.gold).toBe(0);
    expect(state.wood).toBe(0);
  });

  test('sellWood respects woodPrice', () => {
    state.wood = 3;
    state.woodPrice = 5;
    sellWood(state);
    expect(state.gold).toBe(15);
  });
});
