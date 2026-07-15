import { Worker, WorkerQuality } from '../../js/entities/Worker.js';

describe('Worker', () => {
  test('worker has position and quality', () => {
    const w = new Worker(0, 0, WorkerQuality.COMMON);
    expect(w.x).toBe(0);
    expect(w.y).toBe(0);
    expect(w.quality).toBe(WorkerQuality.COMMON);
  });

  test('default quality is COMMON when no quality is passed', () => {
    const w = new Worker(0, 0);
    expect(w.quality).toBe(WorkerQuality.COMMON);
    expect(w.speed).toBe(1);
    expect(w.efficiency).toBe(1);
    expect(w.capacity).toBe(1);
  });

  test('invalid quality defaults to COMMON', () => {
    const w = new Worker(0, 0, 'invalid');
    expect(w.quality).toBe(WorkerQuality.COMMON);
    expect(w.speed).toBe(1);
    expect(w.efficiency).toBe(1);
    expect(w.capacity).toBe(1);
  });

  test('legendary worker is faster than common', () => {
    const common = new Worker(0, 0, WorkerQuality.COMMON);
    const legendary = new Worker(0, 0, WorkerQuality.LEGENDARY);
    expect(legendary.speed).toBeGreaterThan(common.speed);
  });

  test('upgradeQuality increases quality and stats', () => {
    const w = new Worker(0, 0, WorkerQuality.COMMON);
    const beforeSpeed = w.speed;
    const beforeEfficiency = w.efficiency;
    const beforeCapacity = w.capacity;
    w.upgradeQuality();
    expect(w.quality).toBe(WorkerQuality.RARE);
    expect(w.speed).toBeGreaterThan(beforeSpeed);
    expect(w.efficiency).toBeGreaterThan(beforeEfficiency);
    expect(w.capacity).toBeGreaterThan(beforeCapacity);
    expect(w.speed).toBe(1.2);
    expect(w.efficiency).toBe(1.3);
    expect(w.capacity).toBe(1.5);
  });

  test('upgradeQuality returns false and does not change quality when already LEGENDARY', () => {
    const w = new Worker(0, 0, WorkerQuality.LEGENDARY);
    const beforeQuality = w.quality;
    const beforeSpeed = w.speed;
    const beforeEfficiency = w.efficiency;
    const beforeCapacity = w.capacity;
    const result = w.upgradeQuality();
    expect(result).toBe(false);
    expect(w.quality).toBe(beforeQuality);
    expect(w.speed).toBe(beforeSpeed);
    expect(w.efficiency).toBe(beforeEfficiency);
    expect(w.capacity).toBe(beforeCapacity);
  });
});
