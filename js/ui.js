const MAX_FLOATING_TEXTS = 10;

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
