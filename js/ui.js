const MAX_FLOATING_TEXTS = 10;

export function updateUI(state) {
  document.getElementById('gold-display').textContent = formatNumber(state.gold);
  document.getElementById('wood-display').textContent = formatNumber(state.wood);
  document.getElementById('axe-display').textContent = state.axeLevel;
  document.getElementById('upgrade-cost').textContent = formatNumber(state.axeUpgradeCost);

  const lumberjackDisplay = document.getElementById('lumberjack-display');
  if (lumberjackDisplay) {
    lumberjackDisplay.textContent = state.lumberjackLevel > 0 ? state.lumberjackLevel : '未购买';
  }

  const backpackDisplay = document.getElementById('backpack-display');
  if (backpackDisplay) {
    backpackDisplay.textContent = state.backpackCapacity;
  }

  const backpackCostDisplay = document.getElementById('backpack-cost');
  if (backpackCostDisplay) {
    backpackCostDisplay.textContent = formatNumber(state.backpackUpgradeCost);
  }

  const lumberjackCostDisplay = document.getElementById('lumberjack-cost');
  if (lumberjackCostDisplay) {
    lumberjackCostDisplay.textContent = formatNumber(state.lumberjackUpgradeCost);
  }

  const upgradeBtn = document.getElementById('upgrade-btn');
  if (upgradeBtn) {
    upgradeBtn.disabled = state.gold < state.axeUpgradeCost;
  }

  const buyLumberjackBtn = document.getElementById('buy-lumberjack-btn');
  if (buyLumberjackBtn) {
    buyLumberjackBtn.disabled = state.gold < state.lumberjackUpgradeCost;
    const label = state.lumberjackLevel > 0 ? '升级自动伐木机' : '购买自动伐木机';
    buyLumberjackBtn.childNodes[0].textContent = `${label} (`;
  }

  const upgradeBackpackBtn = document.getElementById('upgrade-backpack-btn');
  if (upgradeBackpackBtn) {
    upgradeBackpackBtn.disabled = state.gold < state.backpackUpgradeCost;
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
  return num.toLocaleString('zh-CN');
}
