import { SAVE_VERSION } from '../game/Config.js';

const SAVE_KEY = 'treeTycoonSaveV4';

export function saveGame(state) {
  try {
    const data = { ...state, lastSaveTime: Date.now(), saveVersion: SAVE_VERSION };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('存档失败', error);
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn('读档失败', error);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
