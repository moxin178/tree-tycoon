import { Serializer } from '../../js/save/Serializer.js';
import { World } from '../../js/world/World.js';
import { Sawmill } from '../../js/buildings/Sawmill.js';
import { TileType } from '../../js/world/Tile.js';

describe('Serializer', () => {
  test('serializes and deserializes world', () => {
    const world = new World(5, 5);
    world.setTile(1, 1, TileType.ROAD);
    const data = Serializer.serializeWorld(world);
    const restored = Serializer.deserializeWorld(data);
    expect(restored.getTile(1, 1).type).toBe(TileType.ROAD);
  });

  test('serializes and deserializes building', () => {
    const sawmill = new Sawmill(2, 3);
    sawmill.upgrade();
    const data = Serializer.serializeBuilding(sawmill);
    const restored = Serializer.deserializeBuilding(data);
    expect(restored.type).toBe('sawmill');
    expect(restored.x).toBe(2);
    expect(restored.level).toBe(2);
  });

  test('preserves building inventory', () => {
    const sawmill = new Sawmill(0, 0);
    sawmill.addInput('wood', 5);
    sawmill.addOutput('planks', 3);
    const data = Serializer.serializeBuilding(sawmill);
    const restored = Serializer.deserializeBuilding(data);
    expect(restored.inputInventory.wood).toBe(5);
    expect(restored.outputInventory.planks).toBe(3);
  });
});
