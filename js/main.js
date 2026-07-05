import { loadGame, saveGame } from './saveLoad.js';
import { chopWood } from './clicker.js';
import { sellWood, upgradeAxe, buyLumberjack, upgradeLumberjack, upgradeBackpack } from './upgrades.js';
import { calculateOfflineReward } from './offlineCalc.js';
import { processProduction } from './production.js';
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

  tree.addEventListener('animationend', () => {
    tree.classList.remove('shake');
  }, { once: true });

  const rect = tree.getBoundingClientRect();
  const x = event != null ? event.clientX : rect.left + rect.width / 2;
  const y = event != null ? event.clientY : rect.top;
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

document.getElementById('buy-lumberjack-btn').addEventListener('click', () => {
  const isOwned = state.lumberjackLevel > 0;
  const result = isOwned ? upgradeLumberjack(state) : buyLumberjack(state);
  if (result.success) {
    const message = isOwned
      ? `自动伐木机升级到等级 ${state.lumberjackLevel}`
      : '购买自动伐木机成功';
    showMessage(message);
    saveGame(state);
  } else {
    showMessage(result.reason);
  }
  updateUI(state);
});

document.getElementById('upgrade-backpack-btn').addEventListener('click', () => {
  const result = upgradeBackpack(state);
  if (result.success) {
    showMessage(`背包容量提升到 ${state.backpackCapacity}`);
    saveGame(state);
  } else {
    showMessage(result.reason);
  }
  updateUI(state);
});

// 每秒生产循环
setInterval(() => {
  processProduction(state);
  updateUI(state);
  saveGame(state);
}, 1000);

// 自动保存
setInterval(() => {
  saveGame(state);
}, 5000);
