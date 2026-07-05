export function sellWood(state) {
  if (state.wood < 0) {
    state.wood = 0;
  }
  const earnings = state.wood * state.woodPrice;
  state.gold += earnings;
  state.wood = 0;
  return earnings;
}

export function sellPlanks(state) {
  if (state.planks < 0) {
    state.planks = 0;
  }
  const price = 6;
  const earnings = state.planks * price;
  state.gold += earnings;
  state.planks = 0;
  return earnings;
}

export function sellFurniture(state) {
  if (state.furniture < 0) {
    state.furniture = 0;
  }
  const price = 30;
  const earnings = state.furniture * price;
  state.gold += earnings;
  state.furniture = 0;
  return earnings;
}

// 斧头升级（原有）
export function upgradeAxe(state) {
  if (state.gold < state.axeUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.axeUpgradeCost;
  state.axeLevel += 1;
  state.axeUpgradeCost = Math.floor(state.axeUpgradeCost * 1.5);
  return { success: true };
}

// 伐木机（原有）
export function buyLumberjack(state) {
  if (state.lumberjackLevel > 0) {
    return { success: false, reason: '已拥有自动伐木机' };
  }
  if (state.gold < state.lumberjackUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.lumberjackUpgradeCost;
  state.lumberjackLevel = 1;
  state.lumberjackUpgradeCost = Math.floor(state.lumberjackUpgradeCost * 1.5);
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

// 背包（原有）
export function upgradeBackpack(state) {
  if (state.gold < state.backpackUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.backpackUpgradeCost;
  state.backpackCapacity += 10;
  state.backpackUpgradeCost = Math.floor(state.backpackUpgradeCost * 1.6);
  return { success: true };
}

// 锯木厂
export function buySawmill(state) {
  if (state.axeLevel < 2) {
    return { success: false, reason: '需要斧头等级 ≥ 2' };
  }
  if (state.sawmillLevel > 0) {
    return { success: false, reason: '已建造锯木厂' };
  }
  if (state.gold < state.sawmillUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.sawmillUpgradeCost;
  state.sawmillLevel = 1;
  state.sawmillUpgradeCost = Math.floor(state.sawmillUpgradeCost * 1.6);
  return { success: true };
}

export function upgradeSawmill(state) {
  if (state.sawmillLevel === 0) {
    return { success: false, reason: '未建造锯木厂' };
  }
  if (state.sawmillLevel >= 10) {
    return { success: false, reason: '锯木厂已达最高等级' };
  }
  if (state.gold < state.sawmillUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.sawmillUpgradeCost;
  state.sawmillLevel += 1;
  state.sawmillUpgradeCost = Math.floor(state.sawmillUpgradeCost * 1.6);
  return { success: true };
}

// 家具厂
export function buyFurnitureFactory(state) {
  if (state.sawmillLevel < 2) {
    return { success: false, reason: '需要锯木厂等级 ≥ 2' };
  }
  if (state.furnitureFactoryLevel > 0) {
    return { success: false, reason: '已建造家具厂' };
  }
  if (state.gold < state.furnitureFactoryUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.furnitureFactoryUpgradeCost;
  state.furnitureFactoryLevel = 1;
  state.furnitureFactoryUpgradeCost = Math.floor(state.furnitureFactoryUpgradeCost * 1.6);
  return { success: true };
}

export function upgradeFurnitureFactory(state) {
  if (state.furnitureFactoryLevel === 0) {
    return { success: false, reason: '未建造家具厂' };
  }
  if (state.furnitureFactoryLevel >= 10) {
    return { success: false, reason: '家具厂已达最高等级' };
  }
  if (state.gold < state.furnitureFactoryUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.furnitureFactoryUpgradeCost;
  state.furnitureFactoryLevel += 1;
  state.furnitureFactoryUpgradeCost = Math.floor(state.furnitureFactoryUpgradeCost * 1.6);
  return { success: true };
}

// 仓库升级
export function upgradeStorage(state) {
  if (state.gold < state.storageUpgradeCost) {
    return { success: false, reason: '金币不足' };
  }
  state.gold -= state.storageUpgradeCost;
  state.maxWood += 10;
  state.maxPlanks += 10;
  state.maxFurniture += 10;
  state.storageUpgradeCost = Math.floor(state.storageUpgradeCost * 1.5);
  return { success: true };
}
