import { Renderer } from '../../js/systems/Renderer.js';

describe('Renderer', () => {
  test('renderer can be instantiated', () => {
    const renderer = new Renderer();
    expect(renderer).toBeDefined();
  });
});
