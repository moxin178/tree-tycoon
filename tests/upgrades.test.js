import { createGameState } from '../js/gameState.js';
import { sellWood, upgradeAxe } from '../js/upgrades.js';

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

  describe('upgradeAxe', () => {
    beforeEach(() => {
      state = createGameState();
    });

    test('upgradeAxe increases axe level and costs gold', () => {
      state.gold = 20;
      const result = upgradeAxe(state);
      expect(result.success).toBe(true);
      expect(state.axeLevel).toBe(2);
      expect(state.gold).toBe(10);
    });

    test('upgradeAxe increases cost after upgrade', () => {
      state.gold = 100;
      upgradeAxe(state);
      expect(state.axeUpgradeCost).toBe(15); // 10 * 1.5 = 15
      upgradeAxe(state);
      expect(state.axeUpgradeCost).toBe(22); // 15 * 1.5 = 22.5, floor = 22
    });

    test('upgradeAxe fails if not enough gold', () => {
      state.gold = 5;
      const result = upgradeAxe(state);
      expect(result.success).toBe(false);
      expect(result.reason).toBe('金币不足');
      expect(state.axeLevel).toBe(1);
      expect(state.gold).toBe(5);
    });
  });
});
