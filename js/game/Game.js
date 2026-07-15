import { World } from '../world/World.js';
import { MapGenerator } from '../world/MapGenerator.js';
import { TileType } from '../world/Tile.js';
import { Camera } from '../camera/Camera.js';
import { EntityManager } from '../systems/EntityManager.js';
import { Renderer } from '../systems/Renderer.js';
import { InputManager } from '../input/InputManager.js';
import { Economy } from '../systems/Economy.js';
import { TruckSystem } from '../systems/TruckSystem.js';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from './Config.js';
import { BuildingValidator } from '../buildings/BuildingValidator.js';
import { Sawmill } from '../buildings/Sawmill.js';
import { Warehouse } from '../buildings/Warehouse.js';
import { ParkingLot } from '../buildings/ParkingLot.js';
import { Worker } from '../entities/Worker.js';
import { Boss } from '../entities/Boss.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.world = new World();
    MapGenerator.generateInitialMap(this.world);

    this.camera = new Camera(canvas.width, canvas.height);
    this.camera.setBounds(MAP_WIDTH * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);

    this.economy = new Economy();
    this.economy.addGold(200); // Starting gold

    this.buildings = [];
    this.entityManager = new EntityManager();
    this.renderer = new Renderer();
    this.truckSystem = new TruckSystem();
    this.inputManager = new InputManager(this.camera, canvas);

    this.boss = new Boss(10 * TILE_SIZE, 10 * TILE_SIZE);
    this.entityManager.add(this.boss);

    this.lastTime = 0;
    this.running = false;

    this.inputManager.onClick((worldPos) => this.handleWorldClick(worldPos));
  }

  start() {
    this.running = true;
    this.loop(0);
  }

  stop() {
    this.running = false;
  }

  loop(timestamp) {
    if (!this.running) return;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    const context = {
      world: this.world,
      buildings: this.buildings,
      economy: this.economy,
      entityManager: this.entityManager,
    };

    this.camera.update(this.boss, dt);
    this.entityManager.update(dt, context);

    const parkingLot = this.buildings.find(b => b.type === 'parkingLot');
    if (parkingLot) {
      this.truckSystem.update(dt, parkingLot, this.economy);
    }
  }

  render() {
    this.renderer.render(
      this.ctx,
      this.world,
      this.camera,
      this.entityManager.getAll(),
      this.buildings
    );
  }

  handleWorldClick(worldPos) {
    // Placeholder: will be wired to UI in later tasks
    const tx = Math.floor(worldPos.x / TILE_SIZE);
    const ty = Math.floor(worldPos.y / TILE_SIZE);
    console.log('Clicked tile:', tx, ty);
  }

  buildBuilding(type, x, y) {
    const validation = BuildingValidator.canPlace(this.world, x, y);
    if (!validation.valid) return validation;

    let building;
    switch (type) {
      case 'sawmill':
        building = new Sawmill(x, y);
        break;
      case 'warehouse':
        building = new Warehouse(x, y);
        break;
      case 'parkingLot':
        building = new ParkingLot(x, y);
        break;
      default:
        return { valid: false, reason: '未知建筑类型' };
    }

    this.buildings.push(building);
    for (let dy = 0; dy < building.height; dy++) {
      for (let dx = 0; dx < building.width; dx++) {
        this.world.setTile(x + dx, y + dy, TileType.BUILDING);
      }
    }

    return { valid: true, building };
  }

  hireWorker(buildingId, quality = 'common') {
    const building = this.buildings.find(b => b.id === buildingId);
    if (!building) return { success: false, reason: '建筑不存在' };
    if (building.workers.length >= building.getMaxWorkers()) {
      return { success: false, reason: '工人已达上限' };
    }

    const worker = new Worker(building.x * TILE_SIZE, building.y * TILE_SIZE, quality);
    worker.assignedBuildingId = buildingId;
    building.workers.push(worker);
    this.entityManager.add(worker);

    return { success: true, worker };
  }
}
