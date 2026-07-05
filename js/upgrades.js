export function sellWood(state) {
  const woodToSell = Math.max(0, state.wood);
  const earnings = woodToSell * state.woodPrice;
  state.gold += earnings;
  state.wood = 0;
  return earnings;
}

export function upgradeAxe(state) {
  if (state.gold < state.axeUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.axeUpgradeCost;
  state.axeLevel += 1;
  state.axeUpgradeCost = Math.floor(state.axeUpgradeCost * 1.5);
  return { success: true };
}

export function buyLumberjack(state) {
  if (state.lumberjackLevel > 0) {
    return { success: false, reason: '已拥有自动伐木机' };
  }
  if (state.gold < state.lumberjackUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.lumberjackUpgradeCost;
  state.lumberjackLevel = 1;
  return { success: true };
}

export function upgradeLumberjack(state) {
  if (state.lumberjackLevel === 0) {
    return { success: false, reason: '未拥有自动伐木机' };
  }
  if (state.gold < state.lumberjackUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.lumberjackUpgradeCost;
  state.lumberjackLevel += 1;
  state.lumberjackUpgradeCost = Math.floor(state.lumberjackUpgradeCost * 1.5);
  return { success: true };
}

export function upgradeBackpack(state) {
  if (state.gold < state.backpackUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.backpackUpgradeCost;
  state.backpackCapacity += 10;
  state.backpackUpgradeCost = Math.floor(state.backpackUpgradeCost * 1.6);
  return { success: true };
}
