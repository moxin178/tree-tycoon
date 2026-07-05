import { sellWood } from './upgrades.js';

export function processProduction(state) {
  // 1. 自动伐木机产出原木，超过库存上限的部分自动出售
  if (state.lumberjackLevel > 0) {
    const production = state.axeLevel * state.lumberjackLevel * state.lumberjackBaseRate;
    const newWood = state.wood + production;
    if (newWood > state.maxWood) {
      const overflow = newWood - state.maxWood;
      state.gold += overflow * state.woodPrice;
      state.wood = state.maxWood;
    } else {
      state.wood = newWood;
    }
  }

  // 2. 锯木厂加工木板
  if (state.sawmillLevel > 0) {
    const input = Math.min(state.wood, state.sawmillLevel);
    const outputSpace = state.maxPlanks - state.planks;
    const actualOutput = Math.min(input, outputSpace);
    state.wood -= actualOutput;
    state.planks += actualOutput;
  }

  // 3. 家具厂加工家具
  if (state.furnitureFactoryLevel > 0) {
    const input = Math.min(state.planks, state.furnitureFactoryLevel);
    const outputSpace = state.maxFurniture - state.furniture;
    const actualOutput = Math.min(input, outputSpace);
    state.planks -= actualOutput;
    state.furniture += actualOutput;
  }

  // 4. 背包满自动出售原木
  if (state.wood >= state.backpackCapacity) {
    sellWood(state);
  }
}
