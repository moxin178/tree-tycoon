const { createGameState } = require('./gameState');

const SAVE_KEY = 'treeTycoonSave';

function saveGame(state) {
  state.lastSaveTime = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) {
    return createGameState();
  }
  return JSON.parse(saved);
}

module.exports = { saveGame, loadGame };
