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
