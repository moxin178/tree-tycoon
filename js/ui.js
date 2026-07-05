export function updateUI(state) {
  document.getElementById('gold-display').textContent = formatNumber(state.gold);
  document.getElementById('wood-display').textContent = formatNumber(state.wood);
  document.getElementById('axe-display').textContent = state.axeLevel;
  document.getElementById('upgrade-cost').textContent = formatNumber(state.axeUpgradeCost);

  const upgradeBtn = document.getElementById('upgrade-btn');
  upgradeBtn.disabled = state.gold < state.axeUpgradeCost;
}

export function showMessage(text) {
  const el = document.getElementById('message');
  el.textContent = text;
  setTimeout(() => {
    el.textContent = '';
  }, 2000);
}

export function showFloatingText(text, x, y) {
  const el = document.createElement('div');
  el.className = 'floating-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 1000);
}

function formatNumber(num) {
  return num.toLocaleString('zh-CN');
}
