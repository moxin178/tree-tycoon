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
