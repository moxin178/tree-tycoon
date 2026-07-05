import { createGameState } from '../js/gameState.js';
import { chopWood } from '../js/clicker.js';

describe('clicker', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('chopWood adds wood based on axe level', () => {
    chopWood(state);
    expect(state.wood).toBe(1);
  });

  test('chopWood with axe level 3 adds 3 wood', () => {
    state.axeLevel = 3;
    chopWood(state);
    expect(state.wood).toBe(3);
  });

  test('chopWood does not modify gold', () => {
    state.gold = 50;
    chopWood(state);
    expect(state.gold).toBe(50);
  });
});
