const MAX_OFFLINE_SECONDS = 8 * 60 * 60; // 最多 8 小时

function calculateOfflineReward(state, lastSaveTime, now = Date.now()) {
  const elapsedSeconds = Math.max(0, Math.floor((now - lastSaveTime) / 1000));
  const cappedSeconds = Math.min(elapsedSeconds, MAX_OFFLINE_SECONDS);

  // MVP 阶段：按斧头等级每秒获得等量原木
  const wood = cappedSeconds * state.axeLevel;

  return { wood, elapsedSeconds, cappedSeconds };
}

module.exports = { calculateOfflineReward, MAX_OFFLINE_SECONDS };
