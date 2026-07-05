import { sellWood } from './upgrades.js';

export function processProduction(state) {
  if (state.lumberjackLevel > 0) {
    const production = state.axeLevel * state.lumberjackLevel * state.lumberjackBaseRate;
    state.wood += production;
  }

  if (state.wood >= state.backpackCapacity) {
    sellWood(state);
  }
}
