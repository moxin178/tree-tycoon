import { loadGame, saveGame } from './saveLoad.js';
import { chopWood } from './clicker.js';
import { sellWood, upgradeAxe } from './upgrades.js';
import { calculateOfflineReward } from './offlineCalc.js';
import { updateUI, showMessage, showFloatingText } from './ui.js';

let state = loadGame();

// 计算离线收益
if (state.lastSaveTime) {
  const reward = calculateOfflineReward(state, state.lastSaveTime);
  if (reward.wood > 0) {
    state.wood += reward.wood;
    showMessage(`离线收益：获得 ${reward.wood} 根原木`);
  }
}

updateUI(state);

function triggerChop(event) {
  const amount = state.axeLevel;
  chopWood(state);
  updateUI(state);

  const tree = document.getElementById('tree');
  tree.classList.remove('shake');
  void tree.offsetWidth; // 强制重绘
  tree.classList.add('shake');

  const rect = tree.getBoundingClientRect();
  const x = event ? event.clientX : rect.left + rect.width / 2;
  const y = event ? event.clientY : rect.top;
  showFloatingText(`+${amount} 原木`, x, y);
}

// 绑定事件
document.getElementById('chop-btn').addEventListener('click', (e) => triggerChop(e));
document.getElementById('tree').addEventListener('click', (e) => triggerChop(e));

document.getElementById('sell-btn').addEventListener('click', () => {
  if (state.wood === 0) {
    showMessage('没有原木可出售');
    return;
  }
  const earnings = sellWood(state);
  showMessage(`出售原木，获得 ${earnings} 金币`);
  updateUI(state);
  saveGame(state);
});

document.getElementById('upgrade-btn').addEventListener('click', () => {
  const result = upgradeAxe(state);
  if (result.success) {
    showMessage(`斧头升级到等级 ${state.axeLevel}`);
    saveGame(state);
  } else {
    showMessage(result.reason);
  }
  updateUI(state);
});

// 自动保存
setInterval(() => {
  saveGame(state);
}, 5000);
