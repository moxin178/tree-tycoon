import { Worker, WorkerQuality } from '../../js/entities/Worker.js';

describe('Worker', () => {
  test('worker has position and quality', () => {
    const w = new Worker(0, 0, WorkerQuality.COMMON);
    expect(w.x).toBe(0);
    expect(w.y).toBe(0);
    expect(w.quality).toBe(WorkerQuality.COMMON);
  });

  test('legendary worker is faster than common', () => {
    const common = new Worker(0, 0, WorkerQuality.COMMON);
    const legendary = new Worker(0, 0, WorkerQuality.LEGENDARY);
    expect(legendary.speed).toBeGreaterThan(common.speed);
  });

  test('upgradeQuality increases quality', () => {
    const w = new Worker(0, 0, WorkerQuality.COMMON);
    w.upgradeQuality();
    expect(w.quality).toBe(WorkerQuality.RARE);
  });
});
