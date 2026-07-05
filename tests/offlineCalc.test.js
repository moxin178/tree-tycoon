import { createGameState } from '../js/gameState.js';
import { calculateOfflineReward, MAX_OFFLINE_SECONDS } from '../js/offlineCalc.js';

describe('offlineCalc', () => {
  let state;

  beforeEach(() => {
    state = createGameState();
  });

  test('calculates reward based on axe level and offline seconds', () => {
    state.axeLevel = 2;
    const now = Date.now();
    const lastSave = now - 10_000; // 离线 10 秒

    const reward = calculateOfflineReward(state, lastSave, now);
    expect(reward.wood).toBe(20); // 10 * 2
    expect(reward.elapsedSeconds).toBe(10);
    expect(reward.cappedSeconds).toBe(10);
  });

  test('caps reward at maximum offline time', () => {
    state.axeLevel = 2;
    const now = Date.now();
    const lastSave = now - (MAX_OFFLINE_SECONDS + 1000) * 1000;

    const reward = calculateOfflineReward(state, lastSave, now);
    expect(reward.cappedSeconds).toBe(MAX_OFFLINE_SECONDS);
    expect(reward.wood).toBe(MAX_OFFLINE_SECONDS * 2);
  });

  test('returns zero for future lastSaveTime', () => {
    const now = Date.now();
    const lastSave = now + 10_000;

    const reward = calculateOfflineReward(state, lastSave, now);
    expect(reward.wood).toBe(0);
    expect(reward.elapsedSeconds).toBe(0);
  });
});
