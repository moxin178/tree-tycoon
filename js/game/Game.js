import { World } from '../world/World.js';
import { MapGenerator } from '../world/MapGenerator.js';
import { TileType } from '../world/Tile.js';
import { Camera } from '../camera/Camera.js';
import { EntityManager } from '../systems/EntityManager.js';
import { Renderer } from '../systems/Renderer.js';
import { InputManager } from '../input/InputManager.js';
import { Economy } from '../systems/Economy.js';
import { UIManager } from '../ui/UIManager.js';
import { BuildingPanel } from '../ui/BuildingPanel.js';
import { BuildMenu } from '../ui/BuildMenu.js';
import { Serializer } from '../save/Serializer.js';
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

    this.buildings = MapGenerator.createForestBuildings(this.world);
    this.entityManager = new EntityManager();
    this.renderer = new Renderer();
    this.truckSystem = new TruckSystem();
    this.inputManager = new InputManager(this.camera, canvas);
    this.uiManager = new UIManager(this);
    this.selectedBuildType = null;

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
    this.uiManager.updateResourceBar();

    for (const building of this.buildings) {
      if (building.type === 'forestZone' && building.update) {
        building.update(dt);
      }
    }

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
    const tx = Math.floor(worldPos.x / TILE_SIZE);
    const ty = Math.floor(worldPos.y / TILE_SIZE);

    const clickedBuilding = this.buildings.find(b =>
      tx >= b.x && tx < b.x + b.width &&
      ty >= b.y && ty < b.y + b.height
    );

    if (clickedBuilding) {
      this.uiManager.showPanel(
        clickedBuilding.type,
        BuildingPanel.render(clickedBuilding)
      );
      return;
    }

    if (this.selectedBuildType) {
      const result = this.buildBuilding(this.selectedBuildType, tx, ty);
      if (result.valid) {
        this.uiManager.showNotification('建造成功');
        this.selectedBuildType = null;
      } else {
        this.uiManager.showNotification(result.reason);
      }
      return;
    }

    // Move boss
    this.boss.moveTo(worldPos.x, worldPos.y);
  }

  selectBuildType(type) {
    this.selectedBuildType = type;
    this.uiManager.hidePanel();
    this.uiManager.showNotification(`已选择建造：${type}`);
  }

  upgradeBuilding(buildingId) {
    const building = this.buildings.find(b => b.id === buildingId);
    if (!building) return;
    const cost = BuildingPanel.getUpgradeCost(building);
    if (this.economy.spendGold(cost)) {
      building.upgrade();
      this.uiManager.showNotification(`${building.type} 升级到 Lv.${building.level}`);
    } else {
      this.uiManager.showNotification('金币不足');
    }
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

  getState() {
    return {
      saveVersion: 4,
      gold: this.economy.gold,
      diamonds: this.economy.diamonds,
      world: Serializer.serializeWorld(this.world),
      buildings: this.buildings.map(Serializer.serializeBuilding),
      boss: { x: this.boss.x, y: this.boss.y },
      camera: { x: this.camera.x, y: this.camera.y },
      lastSaveTime: Date.now(),
    };
  }

  loadState(state) {
    this.economy.gold = state.gold || 0;
    this.economy.diamonds = state.diamonds || 0;

    if (state.world) {
      this.world = Serializer.deserializeWorld(state.world);
    }

    if (state.buildings) {
      this.buildings = state.buildings.map(Serializer.deserializeBuilding).filter(Boolean);
    }

    if (state.boss) {
      this.boss.x = state.boss.x;
      this.boss.y = state.boss.y;
    }

    if (state.camera) {
      this.camera.x = state.camera.x;
      this.camera.y = state.camera.y;
    }
  }
}
