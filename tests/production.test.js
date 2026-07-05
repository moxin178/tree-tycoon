import { createGameState } from '../js/gameState.js';
import { processProduction } from '../js/production.js';

describe('production', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('produces wood based on axe and lumberjack level', () => {
    state.axeLevel = 3;
    state.lumberjackLevel = 2;
    processProduction(state);
    expect(state.wood).toBe(6); // 3 * 2 * 1
  });

  test('does nothing if lumberjack not owned', () => {
    state.lumberjackLevel = 0;
    processProduction(state);
    expect(state.wood).toBe(0);
    expect(state.gold).toBe(0);
  });

  test('auto-sells when backpack is full', () => {
    state.axeLevel = 5;
    state.lumberjackLevel = 1;
    state.backpackCapacity = 10;
    state.wood = 6;
    processProduction(state);
    expect(state.wood).toBe(0);
    expect(state.gold).toBe(22); // (6 + 5) * 2 = 22
  });

  test('does not auto-sell when backpack is not full', () => {
    state.axeLevel = 2;
    state.lumberjackLevel = 1;
    state.backpackCapacity = 10;
    state.wood = 3;
    processProduction(state);
    expect(state.wood).toBe(5); // 3 + 2
    expect(state.gold).toBe(0);
  });

  test('produces zero when axe level is zero', () => {
    state.axeLevel = 0;
    state.lumberjackLevel = 1;
    processProduction(state);
    expect(state.wood).toBe(0);
  });
});
