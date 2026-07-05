const { createGameState } = require('../js/gameState');

const SAVE_KEY = 'treeTycoonSave';
const SAVE_VERSION = 1;

function saveGame(state) {
  const data = {
    ...state,
    lastSaveTime: Date.now(),
    saveVersion: SAVE_VERSION,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) {
    return createGameState();
  }
  try {
    const data = JSON.parse(saved);
    if (typeof data.saveVersion !== 'number') {
      return createGameState();
    }
    return {
      ...createGameState(),
      ...data,
    };
  } catch (error) {
    console.warn('存档解析失败，使用默认状态', error);
    return createGameState();
  }
}

module.exports = { saveGame, loadGame, SAVE_VERSION };
