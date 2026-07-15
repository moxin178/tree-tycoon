const BUILDING_NAMES = {
  sawmill: '锯木厂',
  furnitureFactory: '家具厂',
  warehouse: '仓库',
  parkingLot: '停车场',
  forestZone: '林区',
};

export class BuildingPanel {
  static render(building) {
    const name = BUILDING_NAMES[building.type] || building.type;
    return `
      <div class="building-panel">
        <h4>${name} 等级 ${building.level}</h4>
        <p>工人：${building.workers.length}/${building.getMaxWorkers()}</p>
        <button onclick="game.hireWorker('${building.id}')">雇佣工人</button>
        <button onclick="game.upgradeBuilding('${building.id}')">升级 (${this.getUpgradeCost(building)})</button>
      </div>
    `;
  }

  static getUpgradeCost(building) {
    return Math.floor(100 * Math.pow(1.5, building.level - 1));
  }
}
