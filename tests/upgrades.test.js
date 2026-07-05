import { createGameState } from '../js/gameState.js';
import { sellWood, sellPlanks, sellFurniture, upgradeAxe, buyLumberjack, upgradeLumberjack, upgradeBackpack, buySawmill, upgradeSawmill, buyFurnitureFactory, upgradeFurnitureFactory, upgradeStorage } from '../js/upgrades.js';

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
    state.gold = 150;
    buyLumberjack(state);
    const result = upgradeLumberjack(state);
    expect(result.success).toBe(true);
    expect(state.lumberjackLevel).toBe(2);
    expect(state.lumberjackUpgradeCost).toBe(112); // 50 * 1.5 * 1.5 = 112.5, floor = 112
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

describe('sellPlanks', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('sellPlanks converts all planks to gold at price 6', () => {
    state.planks = 5;
    const earnings = sellPlanks(state);
    expect(state.planks).toBe(0);
    expect(state.gold).toBe(30);
    expect(earnings).toBe(30);
  });

  test('sellPlanks with no planks returns zero', () => {
    const earnings = sellPlanks(state);
    expect(state.gold).toBe(0);
    expect(state.planks).toBe(0);
    expect(earnings).toBe(0);
  });

  test('sellPlanks handles negative planks gracefully', () => {
    state.planks = -5;
    const earnings = sellPlanks(state);
    expect(state.gold).toBe(0);
    expect(state.planks).toBe(0);
    expect(earnings).toBe(0);
  });
});

describe('sellFurniture', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('sellFurniture converts all furniture to gold at price 30', () => {
    state.furniture = 3;
    const earnings = sellFurniture(state);
    expect(state.furniture).toBe(0);
    expect(state.gold).toBe(90);
    expect(earnings).toBe(90);
  });

  test('sellFurniture with no furniture returns zero', () => {
    const earnings = sellFurniture(state);
    expect(state.gold).toBe(0);
    expect(state.furniture).toBe(0);
    expect(earnings).toBe(0);
  });

  test('sellFurniture handles negative furniture gracefully', () => {
    state.furniture = -2;
    const earnings = sellFurniture(state);
    expect(state.gold).toBe(0);
    expect(state.furniture).toBe(0);
    expect(earnings).toBe(0);
  });
});

describe('sawmill', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('buySawmill succeeds when axe level >= 2 and enough gold', () => {
    state.axeLevel = 2;
    state.gold = 100;
    const result = buySawmill(state);
    expect(result.success).toBe(true);
    expect(state.sawmillLevel).toBe(1);
    expect(state.gold).toBe(0);
  });

  test('buySawmill fails if axe level < 2', () => {
    state.gold = 100;
    const result = buySawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('需要斧头等级 ≥ 2');
    expect(state.sawmillLevel).toBe(0);
  });

  test('buySawmill fails if already built', () => {
    state.axeLevel = 2;
    state.gold = 200;
    buySawmill(state);
    const result = buySawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('已建造锯木厂');
  });

  test('buySawmill fails if not enough gold', () => {
    state.axeLevel = 2;
    state.gold = 50;
    const result = buySawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
    expect(state.sawmillLevel).toBe(0);
  });

  test('upgradeSawmill increases level and cost', () => {
    state.axeLevel = 2;
    state.gold = 300;
    buySawmill(state);
    const result = upgradeSawmill(state);
    expect(result.success).toBe(true);
    expect(state.sawmillLevel).toBe(2);
    expect(state.sawmillUpgradeCost).toBe(256); // 100 * 1.6 * 1.6 = 256
  });

  test('upgradeSawmill fails if not built', () => {
    state.gold = 200;
    const result = upgradeSawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('未建造锯木厂');
  });

  test('upgradeSawmill fails at max level 10', () => {
    state.axeLevel = 2;
    state.gold = 50000;
    buySawmill(state);
    for (let i = 0; i < 9; i++) {
      upgradeSawmill(state);
    }
    expect(state.sawmillLevel).toBe(10);
    const result = upgradeSawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('锯木厂已达最高等级');
  });

  test('upgradeSawmill fails if not enough gold', () => {
    state.axeLevel = 2;
    state.gold = 100;
    buySawmill(state);
    state.gold = 50;
    const result = upgradeSawmill(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
  });
});

describe('furnitureFactory', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('buyFurnitureFactory succeeds when sawmill level >= 2 and enough gold', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 500;
    const result = buyFurnitureFactory(state);
    expect(result.success).toBe(true);
    expect(state.furnitureFactoryLevel).toBe(1);
    expect(state.gold).toBe(0);
  });

  test('buyFurnitureFactory fails if sawmill level < 2', () => {
    state.gold = 500;
    const result = buyFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('需要锯木厂等级 ≥ 2');
    expect(state.furnitureFactoryLevel).toBe(0);
  });

  test('buyFurnitureFactory fails if already built', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 1000;
    buyFurnitureFactory(state);
    const result = buyFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('已建造家具厂');
  });

  test('buyFurnitureFactory fails if not enough gold', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 200;
    const result = buyFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
    expect(state.furnitureFactoryLevel).toBe(0);
  });

  test('upgradeFurnitureFactory increases level and cost', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 1500;
    buyFurnitureFactory(state);
    const result = upgradeFurnitureFactory(state);
    expect(result.success).toBe(true);
    expect(state.furnitureFactoryLevel).toBe(2);
    expect(state.furnitureFactoryUpgradeCost).toBe(1280); // 500 * 1.6 * 1.6 = 1280
  });

  test('upgradeFurnitureFactory fails if not built', () => {
    state.gold = 1000;
    const result = upgradeFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('未建造家具厂');
  });

  test('upgradeFurnitureFactory fails at max level 10', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 200000;
    buyFurnitureFactory(state);
    for (let i = 0; i < 9; i++) {
      upgradeFurnitureFactory(state);
    }
    expect(state.furnitureFactoryLevel).toBe(10);
    const result = upgradeFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('家具厂已达最高等级');
  });

  test('upgradeFurnitureFactory fails if not enough gold', () => {
    state.axeLevel = 2;
    state.sawmillLevel = 2;
    state.gold = 500;
    buyFurnitureFactory(state);
    state.gold = 200;
    const result = upgradeFurnitureFactory(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
  });
});

describe('storage', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('upgradeStorage increases all storage limits and cost', () => {
    state.gold = 50;
    const result = upgradeStorage(state);
    expect(result.success).toBe(true);
    expect(state.maxWood).toBe(20);
    expect(state.maxPlanks).toBe(20);
    expect(state.maxFurniture).toBe(20);
    expect(state.storageUpgradeCost).toBe(75); // 50 * 1.5 = 75
  });

  test('upgradeStorage fails if not enough gold', () => {
    state.gold = 10;
    const result = upgradeStorage(state);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('金币不足');
    expect(state.maxWood).toBe(10);
  });
});
