import { sellWood } from './upgrades.js';

/**
 * 处理每秒自动生产：
 * 1. 如果拥有自动伐木机，按 axeLevel * lumberjackLevel * baseRate 产出原木
 * 2. 如果原木达到或超过背包容量，自动全部出售（不保留溢出部分）
 */
export function processProduction(state) {
  if (state.lumberjackLevel > 0) {
    const production = state.axeLevel * state.lumberjackLevel * state.lumberjackBaseRate;
    state.wood += production;
  }

  if (state.wood >= state.backpackCapacity) {
    sellWood(state);
  }
}
