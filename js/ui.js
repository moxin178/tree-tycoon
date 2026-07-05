const MAX_FLOATING_TEXTS = 10;

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

export function updateUI(state) {
  setText('gold-display', formatNumber(state.gold));
  setText('wood-display', formatNumber(state.wood));
  setText('axe-display', state.axeLevel);
  setText('upgrade-cost', formatNumber(state.axeUpgradeCost));

  setText('lumberjack-display', state.lumberjackLevel > 0 ? state.lumberjackLevel : '未购买');
  setText('backpack-display', state.backpackCapacity);

  setText('backpack-cost', formatNumber(state.backpackUpgradeCost));
  setText('lumberjack-cost', formatNumber(state.lumberjackUpgradeCost));

  // 加工链资源显示
  setText('planks-display', formatNumber(state.planks));
  setText('furniture-display', formatNumber(state.furniture));
  setText('storage-display', `${state.maxWood}/${state.maxPlanks}/${state.maxFurniture}`);

  // 建筑成本显示
  setText('sawmill-cost', formatNumber(state.sawmillUpgradeCost));
  setText('furniture-factory-cost', formatNumber(state.furnitureFactoryUpgradeCost));
  setText('storage-cost', formatNumber(state.storageUpgradeCost));

  const upgradeBtn = document.getElementById('upgrade-btn');
  if (upgradeBtn) {
    upgradeBtn.disabled = state.gold < state.axeUpgradeCost;
  }

  const buyLumberjackBtn = document.getElementById('buy-lumberjack-btn');
  if (buyLumberjackBtn) {
    buyLumberjackBtn.disabled = state.gold < state.lumberjackUpgradeCost;
    const label = state.lumberjackLevel > 0 ? '升级自动伐木机' : '购买自动伐木机';
    buyLumberjackBtn.innerHTML = `${label} (<span id="lumberjack-cost">${formatNumber(state.lumberjackUpgradeCost)}</span> 金币)`;
  }

  const upgradeBackpackBtn = document.getElementById('upgrade-backpack-btn');
  if (upgradeBackpackBtn) {
    upgradeBackpackBtn.disabled = state.gold < state.backpackUpgradeCost;
  }

  // 出售木板按钮：planks === 0 时禁用
  const sellPlanksBtn = document.getElementById('sell-planks-btn');
  if (sellPlanksBtn) {
    sellPlanksBtn.disabled = state.planks === 0;
  }

  // 出售家具按钮：furniture === 0 时禁用
  const sellFurnitureBtn = document.getElementById('sell-furniture-btn');
  if (sellFurnitureBtn) {
    sellFurnitureBtn.disabled = state.furniture === 0;
  }

  // 购买/升级锯木厂按钮
  const buySawmillBtn = document.getElementById('buy-sawmill-btn');
  if (buySawmillBtn) {
    const sawmillLabel = state.sawmillLevel > 0 ? '升级锯木厂' : '建造锯木厂';
    buySawmillBtn.innerHTML = `${sawmillLabel} (<span id="sawmill-cost">${formatNumber(state.sawmillUpgradeCost)}</span> 金币)`;
    const canAfford = state.gold >= state.sawmillUpgradeCost;
    const meetsUnlock = state.axeLevel >= 2;
    buySawmillBtn.disabled = !canAfford || !meetsUnlock;
  }

  // 购买/升级家具厂按钮
  const buyFurnitureFactoryBtn = document.getElementById('buy-furniture-factory-btn');
  if (buyFurnitureFactoryBtn) {
    const factoryLabel = state.furnitureFactoryLevel > 0 ? '升级家具厂' : '建造家具厂';
    buyFurnitureFactoryBtn.innerHTML = `${factoryLabel} (<span id="furniture-factory-cost">${formatNumber(state.furnitureFactoryUpgradeCost)}</span> 金币)`;
    const canAfford = state.gold >= state.furnitureFactoryUpgradeCost;
    const meetsUnlock = state.sawmillLevel >= 2;
    buyFurnitureFactoryBtn.disabled = !canAfford || !meetsUnlock;
  }

  // 升级仓库按钮：金币不足时禁用
  const upgradeStorageBtn = document.getElementById('upgrade-storage-btn');
  if (upgradeStorageBtn) {
    upgradeStorageBtn.disabled = state.gold < state.storageUpgradeCost;
  }
}

export function showMessage(text) {
  const el = document.getElementById('message');
  if (!el) return;
  el.textContent = text;
  setTimeout(() => {
    el.textContent = '';
  }, 2000);
}

export function showFloatingText(text, x, y) {
  cleanupOldFloatingTexts();

  const el = document.createElement('div');
  el.className = 'floating-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  el.addEventListener('animationend', () => {
    el.remove();
  }, { once: true });
}

function cleanupOldFloatingTexts() {
  const texts = document.querySelectorAll('.floating-text');
  if (texts.length >= MAX_FLOATING_TEXTS) {
    texts[0].remove();
  }
}

function formatNumber(num) {
  if (typeof num !== 'number' || !Number.isFinite(num)) {
    return '0';
  }
  return num.toLocaleString('zh-CN');
}
