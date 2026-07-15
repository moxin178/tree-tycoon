import { World } from '../world/World.js';
import { Tile } from '../world/Tile.js';
import { Sawmill } from '../buildings/Sawmill.js';
import { FurnitureFactory } from '../buildings/FurnitureFactory.js';
import { Warehouse } from '../buildings/Warehouse.js';
import { ParkingLot } from '../buildings/ParkingLot.js';
import { ForestZone } from '../buildings/ForestZone.js';

const BUILDING_MAP = {
  sawmill: Sawmill,
  furnitureFactory: FurnitureFactory,
  warehouse: Warehouse,
  parkingLot: ParkingLot,
  forestZone: ForestZone,
};

export class Serializer {
  static serializeWorld(world) {
    return {
      width: world.width,
      height: world.height,
      tiles: world.tiles.map(row =>
        row.map(tile => ({ type: tile.type, locked: tile.locked }))
      ),
    };
  }

  static deserializeWorld(data) {
    const world = new World(data.width, data.height);
    for (let y = 0; y < data.height; y++) {
      for (let x = 0; x < data.width; x++) {
        const tileData = data.tiles[y][x];
        world.tiles[y][x] = new Tile(tileData.type, tileData.locked);
      }
    }
    return world;
  }

  static serializeBuilding(building) {
    return {
      type: building.type,
      x: building.x,
      y: building.y,
      level: building.level,
      inputInventory: building.inputInventory,
      outputInventory: building.outputInventory,
      storage: building.storage,
      trees: building.trees,
      maxTrees: building.maxTrees,
      regenAccumulator: building.regenAccumulator,
      workers: building.workers.map(w => ({
        quality: w.quality,
        x: w.x,
        y: w.y,
      })),
    };
  }

  static deserializeBuilding(data) {
    const Class = BUILDING_MAP[data.type];
    if (!Class) return null;
    const building = new Class(data.x, data.y);
    building.level = data.level;
    building.inputInventory = data.inputInventory || building.inputInventory;
    building.outputInventory = data.outputInventory || building.outputInventory;

    if (data.storage && building.storage) {
      building.storage = data.storage;
    }
    if (typeof data.trees === 'number' && typeof building.trees === 'number') {
      building.trees = data.trees;
    }
    if (typeof data.maxTrees === 'number' && typeof building.maxTrees === 'number') {
      building.maxTrees = data.maxTrees;
    }
    if (typeof data.regenAccumulator === 'number' && typeof building.regenAccumulator === 'number') {
      building.regenAccumulator = data.regenAccumulator;
    }

    return building;
  }
}
