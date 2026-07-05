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
  state.wood += amount;
}

function addGold(state, amount) {
  state.gold += amount;
}

function getState(state) {
  return state;
}

module.exports = {
  createGameState,
  addWood,
  addGold,
  getState,
};
