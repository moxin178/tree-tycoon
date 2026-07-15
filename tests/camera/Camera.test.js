import { Camera } from '../../js/camera/Camera.js';

describe('Camera', () => {
  test('follows target while clamped to top-left bound', () => {
    const camera = new Camera(800, 600);
    camera.setBounds(960, 960);
    camera.update({ x: 100, y: 100 });
    expect(camera.x).toBe(0);
    expect(camera.y).toBe(0);
  });

  test('does not scroll past bounds', () => {
    const camera = new Camera(800, 600);
    camera.setBounds(960, 960);
    camera.update({ x: 1000, y: 1000 });
    expect(camera.x).toBeLessThanOrEqual(960 - 800);
    expect(camera.y).toBeLessThanOrEqual(960 - 600);
  });

  test('worldToScreen converts correctly', () => {
    const camera = new Camera(800, 600);
    camera.x = 100;
    camera.y = 50;
    const screen = camera.worldToScreen(150, 100);
    expect(screen.x).toBe(50);
    expect(screen.y).toBe(50);
  });
});
