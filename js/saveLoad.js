import { createGameState } from './gameState.js';
import { SAVE_VERSION } from './constants.js';

export const SAVE_KEY = 'treeTycoonSave';
export { SAVE_VERSION };

export function saveGame(state) {
  const data = {
    ...state,
    lastSaveTime: Date.now(),
    saveVersion: SAVE_VERSION,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) {
    return createGameState();
  }
  try {
    const data = JSON.parse(saved);
    if (typeof data.saveVersion !== 'number') {
      return createGameState();
    }
    const defaultState = createGameState();
    const merged = { ...defaultState };
    for (const key in data) {
      if (data[key] !== undefined) {
        merged[key] = data[key];
      }
    }
    return merged;
  } catch (error) {
    console.warn('存档解析失败，使用默认状态', error);
    return createGameState();
  }
}
