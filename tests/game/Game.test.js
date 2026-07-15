import { Game } from '../../js/game/Game.js';

function createMockCanvas() {
  return {
    width: 800,
    height: 600,
    getContext: () => ({
      clearRect: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
    }),
    addEventListener: () => {},
  };
}

describe('Game', () => {
  test('game initializes with world and economy', () => {
    const canvas = createMockCanvas();
    const game = new Game(canvas);
    expect(game.world).toBeDefined();
    expect(game.economy).toBeDefined();
    expect(Array.isArray(game.buildings)).toBe(true);
  });

  test('game starts with 200 gold', () => {
    const canvas = createMockCanvas();
    const game = new Game(canvas);
    expect(game.economy.gold).toBe(200);
  });

  test('game adds boss entity', () => {
    const canvas = createMockCanvas();
    const game = new Game(canvas);
    expect(game.boss).toBeDefined();
    expect(game.entityManager.getById(game.boss.id)).toBe(game.boss);
  });
});
