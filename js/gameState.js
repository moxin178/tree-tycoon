export function createGameState() {
  return {
    gold: 0,
    wood: 0,
    axeLevel: 1,
    woodPrice: 2,
    axeUpgradeCost: 10,
    lastSaveTime: Date.now(),
  };
}

function validateAmount(amount) {
  if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Amount must be a non-negative number');
  }
}

export function addWood(state, amount) {
  validateAmount(amount);
  state.wood += amount;
}

export function addGold(state, amount) {
  validateAmount(amount);
  state.gold += amount;
}
