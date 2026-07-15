import { Game } from './game/Game.js';
import { loadGame, saveGame } from './save/SaveLoad.js';
import { SaveMigrator } from './save/SaveMigrator.js';

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

// Load save if exists
const savedData = loadGame();
if (savedData) {
  if (savedData.saveVersion === 4) {
    game.loadState(savedData);
  } else if (savedData.saveVersion === 3) {
    const migrated = SaveMigrator.migrateV3ToV4(savedData);
    game.loadState(migrated);
  }
}

// Auto save
setInterval(() => {
  saveGame(game.getState());
}, 10000);

game.start();

// Expose game for UI buttons
window.game = game;
