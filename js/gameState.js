function createGameState() {
  return {
    gold: 0,
    wood: 0,
    axeLevel: 1,
    woodPrice: 2,
    axeUpgradeCost: 10,
    lastSaveTime: Date.now(),
  };
}

function addWood(state, amount) {
  if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Amount must be a non-negative number');
  }
  state.wood += amount;
}

function addGold(state, amount) {
  if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
    throw new Error('Amount must be a non-negative number');
  }
  state.gold += amount;
}

module.exports = {
  createGameState,
  addWood,
  addGold,
};
