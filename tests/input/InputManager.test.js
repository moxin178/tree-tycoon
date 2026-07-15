import { InputManager } from '../../js/input/InputManager.js';

describe('InputManager', () => {
  test('converts screen to world coordinates', () => {
    const camera = { x: 100, y: 50, screenToWorld: (x, y) => ({ x: x + 100, y: y + 50 }) };
    const input = new InputManager(camera);
    const world = input.screenToWorld(50, 50);
    expect(world.x).toBe(150);
    expect(world.y).toBe(100);
  });
});
