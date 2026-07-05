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
    state.maxWood = 100; // 避免被 maxWood 截断影响测试
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

  test('auto-sells when wood exactly equals backpack capacity', () => {
    state.axeLevel = 2;
    state.lumberjackLevel = 1;
    state.backpackCapacity = 10;
    state.maxWood = 100;
    state.wood = 8;
    processProduction(state);
    expect(state.wood).toBe(0);
    expect(state.gold).toBe(20); // 10 * 2
  });

  test('applies lumberjackBaseRate multiplier', () => {
    state.axeLevel = 2;
    state.lumberjackLevel = 1;
    state.lumberjackBaseRate = 3;
    processProduction(state);
    expect(state.wood).toBe(6); // 2 * 1 * 3
  });

  // 新增测试：库存限制
  test('lumberjack sells overflow wood when maxWood is reached', () => {
    state.axeLevel = 5;
    state.lumberjackLevel = 2;
    state.wood = 8;
    state.maxWood = 10;
    state.backpackCapacity = 100; // 避免自动出售干扰
    processProduction(state);
    expect(state.wood).toBe(10); // 8 + 10 = 18, but capped at 10
    expect(state.gold).toBe(16); // (18 - 10) * 2 = 16
  });

  test('sawmill production is capped by maxPlanks', () => {
    state.sawmillLevel = 3;
    state.wood = 5;
    state.planks = 8;
    state.maxPlanks = 10;
    processProduction(state);
    expect(state.wood).toBe(3); // 5 - 2 = 3 (only 2 space left for planks)
    expect(state.planks).toBe(10); // 8 + 2 = 10
  });

  test('furniture factory production is capped by maxFurniture', () => {
    state.furnitureFactoryLevel = 4;
    state.planks = 6;
    state.furniture = 7;
    state.maxFurniture = 10;
    processProduction(state);
    expect(state.planks).toBe(3); // 6 - 3 = 3
    expect(state.furniture).toBe(10); // 7 + 3 = 10 (only 3 space left)
  });

  // 新增测试：三层加工链同时运行
  test('full processing chain runs together', () => {
    state.axeLevel = 2;
    state.lumberjackLevel = 1;
    state.sawmillLevel = 2;
    state.furnitureFactoryLevel = 1;
    state.wood = 3;
    state.planks = 1;
    state.furniture = 0;
    state.maxWood = 20;
    state.maxPlanks = 20;
    state.maxFurniture = 20;
    state.backpackCapacity = 100;
    processProduction(state);
    expect(state.wood).toBe(3); // 3 + 2 - 2 = 3
    expect(state.planks).toBe(2); // 1 + 2 - 1 = 2
    expect(state.furniture).toBe(1); // 0 + 1 = 1
  });

  // 新增测试：建筑未建造时不生产
  test('sawmill does not produce when not built', () => {
    state.sawmillLevel = 0;
    state.wood = 5;
    state.planks = 0;
    processProduction(state);
    expect(state.wood).toBe(5);
    expect(state.planks).toBe(0);
  });

  test('furniture factory does not produce when not built', () => {
    state.furnitureFactoryLevel = 0;
    state.planks = 5;
    state.furniture = 0;
    processProduction(state);
    expect(state.planks).toBe(5);
    expect(state.furniture).toBe(0);
  });

  // 新增测试：库存满时停产
  test('sawmill stops when planks storage is full', () => {
    state.sawmillLevel = 3;
    state.wood = 10;
    state.planks = 10;
    state.maxPlanks = 10;
    state.backpackCapacity = 100; // 避免自动出售干扰
    processProduction(state);
    expect(state.wood).toBe(10);
    expect(state.planks).toBe(10);
  });

  test('furniture factory stops when furniture storage is full', () => {
    state.furnitureFactoryLevel = 3;
    state.planks = 10;
    state.furniture = 10;
    state.maxFurniture = 10;
    processProduction(state);
    expect(state.planks).toBe(10);
    expect(state.furniture).toBe(10);
  });

  test('lumberjack continues producing and sells overflow at maxWood', () => {
    state.axeLevel = 2;
    state.lumberjackLevel = 1;
    state.wood = 10;
    state.maxWood = 10;
    state.backpackCapacity = 100; // 避免自动出售干扰
    processProduction(state);
    expect(state.wood).toBe(10);
    expect(state.gold).toBe(4); // 2 * 2 = 4
  });
});
