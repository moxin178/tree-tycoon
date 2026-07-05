import { SAVE_VERSION } from './constants.js';

function validateAmount(amount) {
  if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Amount must be a non-negative number');
  }
}

export function createGameState() {
  return {
    gold: 0,
    wood: 0,
    axeLevel: 1,
    woodPrice: 2,
    axeUpgradeCost: 5,
    lumberjackLevel: 0,
    lumberjackBaseRate: 1,
    lumberjackUpgradeCost: 50,
    backpackCapacity: 10,
    backpackUpgradeCost: 30,
    lastSaveTime: Date.now(),
    saveVersion: SAVE_VERSION,
  };
}

export function addWood(state, amount) {
  validateAmount(amount);
  state.wood += amount;
}

export function addGold(state, amount) {
  validateAmount(amount);
  state.gold += amount;
}
