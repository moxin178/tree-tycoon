export function updateUI(state) {
  document.getElementById('gold-display').textContent = state.gold;
  document.getElementById('wood-display').textContent = state.wood;
  document.getElementById('axe-display').textContent = state.axeLevel;
  document.getElementById('upgrade-cost').textContent = state.axeUpgradeCost;

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
