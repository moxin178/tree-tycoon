import { createGameState } from '../js/gameState.js';
import { sellWood, upgradeAxe, buyLumberjack, upgradeLumberjack, upgradeBackpack } from '../js/upgrades.js';

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
    test('upgradeAxe increases axe level and costs gold', () => {
      state.gold = 20;
      const result = upgradeAxe(state);
      expect(result.success).toBe(true);
      expect(state.axeLevel).toBe(2);
      expect(state.gold).toBe(15);
    });

    test('upgradeAxe increases cost after upgrade', () => {
      state.gold = 100;
      upgradeAxe(state);
      expect(state.axeUpgradeCost).toBe(7); // 5 * 1.5 = 7.5, floor = 7
      upgradeAxe(state);
      expect(state.axeUpgradeCost).toBe(10); // 7 * 1.5 = 10.5, floor = 10
    });

    test('upgradeAxe fails if not enough gold', () => {
      state.gold = 4;
      const result = upgradeAxe(state);
      expect(result.success).toBe(false);
      expect(result.reason).toBe('金币不足');
      expect(state.axeLevel).toBe(1);
      expect(state.gold).toBe(4);
    });
  });
});

describe('lumberjack', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('buyLumberjack enables lumberjack and costs gold', () => {
    state.gold = 50;
    const result = buyLumberjack(state);
    expect(result.success).toBe(true);
    expect(state.lumberjackLevel).toBe(1);
    expect(state.gold).toBe(0);
  });

  test('buyLumberjack fails if already owned', () => {
    state.gold = 100;
    buyLumberjack(state);
    const result = buyLumberjack(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('已拥有自动伐木机');
  });

  test('buyLumberjack fails if not enough gold', () => {
    state.gold = 10;
    const result = buyLumberjack(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
  });

  test('upgradeLumberjack increases level and cost', () => {
    state.gold = 100;
    buyLumberjack(state);
    const result = upgradeLumberjack(state);
    expect(result.success).toBe(true);
    expect(state.lumberjackLevel).toBe(2);
    expect(state.lumberjackUpgradeCost).toBe(75); // 50 * 1.5
  });

  test('upgradeLumberjack fails if not owned', () => {
    state.gold = 100;
    const result = upgradeLumberjack(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('未拥有自动伐木机');
  });

  test('upgradeLumberjack fails if not enough gold', () => {
    state.gold = 50;
    buyLumberjack(state);
    const result = upgradeLumberjack(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
  });
});

describe('backpack', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('upgradeBackpack increases capacity and cost', () => {
    state.gold = 30;
    const result = upgradeBackpack(state);
    expect(result.success).toBe(true);
    expect(state.backpackCapacity).toBe(20);
    expect(state.backpackUpgradeCost).toBe(48); // 30 * 1.6
  });

  test('upgradeBackpack increases cost on second upgrade', () => {
    state.gold = 100;
    upgradeBackpack(state); // 30 -> 48, capacity 20
    upgradeBackpack(state); // 48 -> 76, capacity 30
    expect(state.backpackCapacity).toBe(30);
    expect(state.backpackUpgradeCost).toBe(76);
    expect(state.gold).toBe(22); // 100 - 30 - 48
  });

  test('upgradeBackpack fails if not enough gold', () => {
    state.gold = 10;
    const result = upgradeBackpack(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
  });
});
